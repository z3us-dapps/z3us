import { RadixNetworkConfigById } from '@radixdlt/babylon-gateway-api-sdk'
import { LedgerTabWatcher } from '@radixdlt/connector-extension/src/chrome/background/ledger-tab-watcher'
import { notificationDispatcher } from '@radixdlt/connector-extension/src/chrome/background/notification-dispatcher'
import { chromeLocalStore } from '@radixdlt/connector-extension/src/chrome/helpers/chrome-local-store'
import { closePopup as closePopupFn } from '@radixdlt/connector-extension/src/chrome/helpers/close-popup'
import { ensureTab } from '@radixdlt/connector-extension/src/chrome/helpers/ensure-tab'
import { focusTabByUrl } from '@radixdlt/connector-extension/src/chrome/helpers/focus-tab'
import {
	getConnections as getConnectionsFn,
	hasConnections,
} from '@radixdlt/connector-extension/src/chrome/helpers/get-connections'
import { openParingPopup as openParingPopupFn } from '@radixdlt/connector-extension/src/chrome/helpers/open-pairing-popup'
import type {
	Message,
	MessageHandlerOutput,
	SendMessageWithConfirmation,
} from '@radixdlt/connector-extension/src/chrome/messages/_types'
import { messageDiscriminator, messageSource } from '@radixdlt/connector-extension/src/chrome/messages/_types'
import { getSessionRouterData } from '@radixdlt/connector-extension/src/chrome/offscreen/session-router'
import { getExtensionOptions } from '@radixdlt/connector-extension/src/options'
import type { Connections } from '@radixdlt/connector-extension/src/pairing/state/connections'
import { ConnectionsClient } from '@radixdlt/connector-extension/src/pairing/state/connections'
import type { AppLogger } from '@radixdlt/connector-extension/src/utils/logger'
import type { Account, WalletInteraction } from '@radixdlt/radix-dapp-toolkit'
import { ResultAsync, errAsync, okAsync } from 'neverthrow'

import { config } from '@src/config'
// import { createGatewayModule } from '@radixdlt/connector-extension/src/chrome/background/create-gateway-module'
// types fix here instead of above import
import { createGatewayModule } from '@src/radix/create-gateway-module'

export const BackgroundMessageHandler =
	({
		logger,
		ledgerTabWatcher = LedgerTabWatcher(),
		getConnections = getConnectionsFn,
		closePopup = closePopupFn,
		openParingPopup = openParingPopupFn,
	}: Partial<{
		logger?: AppLogger
		ledgerTabWatcher: ReturnType<typeof LedgerTabWatcher>
		getConnections: () => ResultAsync<Connections, never>
		closePopup: () => ResultAsync<any, Error>
		openParingPopup: () => ResultAsync<any, Error>
	}>) =>
	(message: Message, sendMessageWithConfirmation: SendMessageWithConfirmation): MessageHandlerOutput => {
		const walletInteractionHandler = (data: WalletInteraction) => {
			hasConnections().map((has: boolean) => {
				if (has) {
					notificationDispatcher.request(data as WalletInteraction)
				}
				return has
			})

			return okAsync({ sendConfirmation: false })
		}

		switch (message?.discriminator) {
			case messageDiscriminator.getExtensionOptions:
				return getExtensionOptions().map(options => ({
					sendConfirmation: true,
					data: { options },
				}))
			case messageDiscriminator.getConnections:
				return getConnections().map(data => ({
					sendConfirmation: true,
					data,
				}))

			case messageDiscriminator.openParingPopup:
				return openParingPopup()
					.mapErr(() => ({
						reason: 'failedToOpenParingPopup',
					}))
					.map(() => ({
						sendConfirmation: false,
					}))

			case messageDiscriminator.detectWalletLink:
				return hasConnections()
					.andThen(has => (has ? closePopup().map(() => has) : openParingPopup().map(() => has)))
					.map(isLinked => ({
						sendConfirmation: true,
						data: { isLinked },
					}))
					.mapErr(error => ({
						reason: 'failedToDetectWalletLink',
						jsError: error,
					}))

			case messageDiscriminator.sendMessageToTab: {
				return sendMessageWithConfirmation({ ...message.data, source: 'background' }, message.tabId).map(() => ({
					sendConfirmation: true,
				}))
			}

			case messageDiscriminator.closeLedgerTab: {
				return ledgerTabWatcher
					.getCurrentlyWatched()
					.andThen(currentlyWatched => {
						if (!currentlyWatched || !currentlyWatched.tabId) {
							return okAsync({ sendConfirmation: true })
						}

						const { tabId } = currentlyWatched
						return ledgerTabWatcher.restoreInitial().andThen(() =>
							ResultAsync.fromPromise(chrome.tabs.remove(tabId), () => ({
								reason: 'failedToCloseLedgerTab',
							})).map(() => ({
								sendConfirmation: false,
							})),
						)
					})
					.mapErr(() => ({ reason: 'failedToCloseLedgerTab' }))
			}

			case messageDiscriminator.focusLedgerTab: {
				return focusTabByUrl(config.popup.pages.ledger)
					.map(() => ({
						sendConfirmation: false,
					}))
					.mapErr(() => ({ reason: 'failedToFocusLedgerTab' }))
			}

			case messageDiscriminator.walletResponse: {
				const sessionId = message.data?.metadata?.sessionId
				const walletPublicKey = message.data?.metadata?.walletPublicKey

				if (sessionId && walletPublicKey && message.data?.discriminator && message.data.discriminator !== 'failure') {
					chromeLocalStore.getSingleItem('sessionRouter').map(data => {
						if (!data) {
							return chromeLocalStore.setSingleItem('sessionRouter', {
								[sessionId]: walletPublicKey,
							})
						}

						if (data[sessionId] && data[sessionId] !== walletPublicKey) {
							logger?.warn(
								`sessionRouter has walletPublicKey ${data[sessionId]} for ${sessionId} but we've just had a response from ${walletPublicKey}`,
							)
						} else if (!data[sessionId]) {
							return chromeLocalStore.setSingleItem('sessionRouter', {
								...data,
								[sessionId]: walletPublicKey,
							})
						}

						return data
					})
				}

				const canBePolled = (msg: any) =>
					msg.data?.items?.discriminator === 'transaction' &&
					msg.data?.items?.send?.transactionIntentHash &&
					msg.data?.metadata?.networkId &&
					RadixNetworkConfigById[msg.data?.metadata?.networkId]?.gatewayUrl

				const getPollParams = (msg: any) => ({
					txIntentHash: msg.data.items.send.transactionIntentHash,
					networkId: msg.data?.metadata?.networkId,
				})

				if (canBePolled(message)) {
					const { txIntentHash, networkId } = getPollParams(message)
					logger?.debug('🔁 Polling', { txIntentHash, networkId })
					const gateway = createGatewayModule(networkId)

					gateway.pollTransactionStatus(txIntentHash).map(result => {
						notificationDispatcher.transaction(networkId, txIntentHash, result.status)
						return result
					})
				}
				return okAsync({ sendConfirmation: false })
			}

			case messageDiscriminator.getSessionRouterData: {
				return getSessionRouterData().map(data => ({
					sendConfirmation: true,
					data,
				}))
			}

			case messageDiscriminator.dAppRequest: {
				hasConnections().map(has => {
					if (has) {
						notificationDispatcher.request(message.data as WalletInteraction)
					}
					return has
				})

				return okAsync({ sendConfirmation: false })
			}

			case messageDiscriminator.walletInteraction: {
				return walletInteractionHandler(message.interaction.interaction)
			}

			case messageDiscriminator.walletToExtension:
				if (message.data?.discriminator === 'accountList') {
					const { accounts } = message.data
					return getConnections()
						.map(connections =>
							ConnectionsClient(connections).updateAccounts(message.walletPublicKey, accounts as Account[]),
						)
						.map(() => ({ sendConfirmation: false }))
						.mapErr(() => ({ reason: 'failedToUpdateAccounts' }))
				}

				return okAsync({ sendConfirmation: false })

			case messageDiscriminator.walletToLedger:
				return ledgerTabWatcher
					.restoreInitial()
					.andThen(() =>
						ensureTab(config.popup.pages.ledger)
							.andThen(tab =>
								ledgerTabWatcher.setWatchedTab(tab.id!, message.data, message.walletPublicKey).map(() => tab),
							)
							.andThen(tab => sendMessageWithConfirmation({ ...message, source: messageSource.background }, tab.id))
							.map(() => ({ sendConfirmation: false }))
							.mapErr(() => ({ reason: 'failedToOpenLedgerTab' })),
					)
					.mapErr(() => ({ reason: 'failedRestoringTabWatcher' }))

			default:
				return errAsync({
					reason: 'unhandledMessageDiscriminator',
				})
		}
	}
