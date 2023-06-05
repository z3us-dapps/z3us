import { addMetadata } from '@radixdlt/connector-extension/src/chrome/helpers/add-metadata'
import { Message as RadixMessage, messageDiscriminator } from '@radixdlt/connector-extension/src/chrome/messages/_types'
import { createMessage as createRadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/create-message'
import browser from 'webextension-polyfill'

import { Message, MessageAction, MessageHandlers } from '@src/browser/messages/types'
import { BrowserStorageService } from '@src/storage/browser'

const sendMessageToOffscreen = async (msg: any, tabId?: number) => browser.runtime.sendMessage(msg, tabId)

const sendMessageToTab = async (tabId: number, msg: any) => browser.tabs.sendMessage(tabId, msg)

const storage = new BrowserStorageService(browser.storage)

const connectionPasswordStrageKey = 'connectionPassword'

async function ping() {
	return true
}

async function onRadixMessage(message: Message) {
	if (!APP_RADIX) return

	const radixMsg = message.payload as RadixMessage

	console.error('onRadixMessage', message)

	// @TODO: implement background handlers
	// getConnectionPassword
	// detectWalletLink
	// sendMessageToTab
	// convertPopupToTab
	// walletToLedger

	// content script handler ?
	// sendMessageEventToDapp
	// walletResponse
	// incomingDappMessage

	// offscreen handlers
	// walletMessage
	// setConnectionPassword
	// dAppRequest
	// incomingWalletMessage
	// ledgerResponse

	switch (radixMsg.discriminator) {
		case messageDiscriminator.getConnectionPassword:
			return {
				sendConfirmation: true,
				data: { connectionPassword: await storage.getItem(connectionPasswordStrageKey) },
			}
		case messageDiscriminator.incomingDappMessage:
			// @TODO: instead of sending message run detect wallet link logic
			// await sendMessageToOffscreen(createRadixMessage.detectWalletLink('contentScript'), message.fromTabId)
			await sendMessageToTab(message.fromTabId, {
				interactionId: radixMsg.data.interactionId,
				eventType: 'receivedByExtension',
			})
			await sendMessageToOffscreen(
				createRadixMessage.dAppRequest('contentScript', addMetadata(radixMsg.data)),
				message.fromTabId,
			)
			return {
				sendConfirmation: false,
			}
		case messageDiscriminator.walletToLedger:
			// @TODO: open ledger popup
			await sendMessageToTab(message.fromTabId, radixMsg.data)
			return { sendConfirmation: true }
		case messageDiscriminator.detectWalletLink:
			// @TODO close or open connection popup (check if password set or not)
			return {
				sendConfirmation: true,
				data: { isLinked: !!(await storage.getItem(connectionPasswordStrageKey)) },
			}
		case messageDiscriminator.convertPopupToTab:
			// @TODO open in a new tab, maybe ignore this ?
			return { sendConfirmation: false }
		case messageDiscriminator.sendMessageToTab:
			await sendMessageToTab(message.fromTabId, { ...radixMsg.data, source: 'background' })
			return {
				sendConfirmation: true,
			}
		case messageDiscriminator.walletResponse:
			await sendMessageToTab(message.fromTabId, radixMsg.data)
			return {
				sendConfirmation: true,
			}
		case messageDiscriminator.sendMessageEventToDapp:
			await sendMessageToTab(message.fromTabId, {
				interactionId: radixMsg.interactionId,
				eventType: radixMsg.messageEvent,
			})
			return {
				sendConfirmation: true,
			}
		default:
			break
	}
	return createRadixMessage.confirmationError(radixMsg.source, radixMsg.messageId, {
		reason: 'unhandledMessageDiscriminator',
	})
}

export default {
	[MessageAction.PING]: ping,
	[MessageAction.RADIX]: onRadixMessage,
} as MessageHandlers
