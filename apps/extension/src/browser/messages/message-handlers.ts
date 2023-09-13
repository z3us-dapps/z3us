import {
	type Message as RadixMessage,
	messageDiscriminator,
	messageSource as radixMessageSource,
} from '@radixdlt/connector-extension/src/chrome/messages/_types'
import { createMessage as createRadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/create-message'
import { Convert } from '@radixdlt/radix-engine-toolkit'
import { sharedStore } from 'packages/ui/src/store'
import type { Keystore } from 'packages/ui/src/store/types'
import { KeystoreType } from 'packages/ui/src/store/types'

import { openAppPopup } from '@src/browser/app/popup'
import type { Message, MessageHandlers } from '@src/browser/messages/types'
import { MessageAction } from '@src/browser/messages/types'
import { Vault } from '@src/browser/vault/vault'
import { getPublicKey as cryptoGetPublicKey, getPrivateKey } from '@src/crypto/key_pair'
import type { Data } from '@src/types/vault'

const vault = new Vault(globalThis.crypto)

async function ping() {
	return true
}

async function lockVault() {
	vault.lock()
}

export interface UnlockVaultMessage {
	password: string
}

async function unlockVault(message: Message): Promise<void> {
	const { password } = message.payload as UnlockVaultMessage
	vault.unlock(password)
}

export interface StoreInVaultMessage {
	keystore: Keystore
	data: Data
	password: string
}

async function storeInVault(message: Message): Promise<void> {
	const { keystore, data, password } = message.payload as StoreInVaultMessage
	vault.save(keystore, data, password)
}

export interface RemoveFromVaultMessage {
	password: string
}

async function removeFromVault(message: Message) {
	const { password } = message.payload as RemoveFromVaultMessage
	return vault.remove(password)
}

export interface SignMessage {
	index: number
	password: string
	toSign: string
}

async function sign(message: Message) {
	const { index, password, toSign } = message.payload as SignMessage
	const walletData = await vault.unlock(password)
	if (!walletData) {
		return null
	}
	const privateKey = getPrivateKey(walletData.data, index)
	return privateKey.signToSignature(Convert.HexString.toUint8Array(toSign))
}

export interface GetPublicKeyMessage {
	index: number
}

async function getPublicKey(message: Message) {
	const { index } = message.payload as GetPublicKeyMessage
	const walletData = await vault.get()
	if (!walletData) {
		return null
	}
	const publicKey = cryptoGetPublicKey(walletData.data, index)
	return publicKey
}

async function handleRadixMessage(message: Message) {
	await sharedStore.persist.rehydrate()
	const sharedState = sharedStore.getState()

	const keystore = sharedState.keystores.find(k => k.id === sharedState.selectedKeystoreId)
	if (!keystore) throw Error(`Missing keystore: ${sharedState.selectedKeystoreId}`)
	if (keystore.type === KeystoreType.RADIX_WALLET) return null

	const radixMsg = message.payload as RadixMessage

	// @TODO
	console.error(`⚡️Z3US⚡️: background handleRadixMessage: ${radixMsg?.discriminator}`, radixMsg)

	switch (radixMsg?.discriminator) {
		case messageDiscriminator.incomingDappMessage: {
			switch (radixMsg?.data?.discriminator) {
				case messageDiscriminator.extensionStatus:
					return createRadixMessage.extensionStatus(true)
				case messageDiscriminator.openParingPopup:
					try {
						await openAppPopup()
						return null
					} catch (error) {
						console.error(error)
						return createRadixMessage.confirmationError(radixMessageSource.contentScript, radixMsg.messageId, {
							reason: 'unableToOpenParingPopup',
						})
					}
				default:
					try {
						const { interactionId, items } = radixMsg.data
						await chrome.runtime.sendMessage(
							createRadixMessage.sendMessageEventToDapp(
								radixMessageSource.contentScript,
								'receivedByExtension',
								interactionId,
							),
						)
						await chrome.runtime.sendMessage(
							createRadixMessage.sendMessageEventToDapp(
								radixMessageSource.offScreen,
								'receivedByWallet',
								interactionId,
							),
						)

						// https://github.com/radixdlt/wallet-sdk/blob/c4a8433a2b2357c4d28dcf36fe2810f0d5fe158e/lib/__tests__/wallet-sdk.spec.ts#L93
						console.error('items', interactionId, items) // @TODO: handle specifically using popup or such
						// below are example payloads we need to return

						await chrome.runtime.sendMessage(
							createRadixMessage.walletResponse(radixMessageSource.offScreen, {
								discriminator: 'success',
								items: {
									discriminator: 'authorizedRequest',
									auth: {
										discriminator: 'loginWithoutChallenge',
										persona: {
											identityAddress: 'account_tdx_b_1qlu8fdyj77jpmu2mqe4rgh3738jcva4nfd2y2vp675zqgdg72y',
											label: '2nd persona',
										},
									},
									ongoingAccounts: {
										accounts: [
											{
												address: 'account_tdx_b_1qaz0nxslmr9nssmy463rd57hl7q0xsadaal0gy7cwsuqwecaws',
												label: 'Jakub Another Accoun',
												appearanceId: 1,
											},
											{
												address: 'account_tdx_b_1q7te4nk60fy2wt7d0wh8l2dhlp5c0n75phcnrwa8uglsrf6sjr',
												label: '3rd Account',
												appearanceId: 2,
											},
										],
									},
								},
								interactionId,
							}),
						)

						return null
					} catch (error) {
						console.error(error)
						return createRadixMessage.confirmationError(radixMessageSource.contentScript, radixMsg.messageId, {
							reason: 'failedToDetectWalletLink',
						})
					}
			}
		}
		default:
			return createRadixMessage.confirmationError(radixMessageSource.contentScript, radixMsg.messageId, {
				reason: 'unhandledMessageDiscriminator',
			})
	}
}

export type MessageTypes = {
	[MessageAction.PING]: undefined

	[MessageAction.VAULT_LOCK]: undefined
	[MessageAction.VAULT_UNLOCK]: UnlockVaultMessage
	[MessageAction.VAULT_SAVE]: StoreInVaultMessage
	[MessageAction.VAULT_REMOVE]: RemoveFromVaultMessage

	[MessageAction.SIGN]: SignMessage
	[MessageAction.GET_PUBLIC_KEY]: GetPublicKeyMessage

	[MessageAction.RADIX]: RadixMessage
}

export default {
	[MessageAction.PING]: ping,

	[MessageAction.VAULT_LOCK]: lockVault,
	[MessageAction.VAULT_UNLOCK]: unlockVault,
	[MessageAction.VAULT_SAVE]: storeInVault,
	[MessageAction.VAULT_REMOVE]: removeFromVault,

	[MessageAction.SIGN]: sign,
	[MessageAction.GET_PUBLIC_KEY]: getPublicKey,

	[MessageAction.RADIX]: handleRadixMessage,
} as MessageHandlers
