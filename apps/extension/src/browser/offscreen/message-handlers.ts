import { Message as RadixMessage, messageDiscriminator } from '@radixdlt/connector-extension/src/chrome/messages/_types'
import { createMessage as createRadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/create-message'

import { Message, MessageAction, MessageHandlers } from '@src/browser/messages/types'

async function onRadixMessage(message: Message) {
	const radixMsg = message.payload as RadixMessage

	console.error('offscreen handler onRadixMessage', message)

	switch (radixMsg.discriminator) {
		case messageDiscriminator.getConnectionPassword:
			break
		case messageDiscriminator.setConnectionPassword:
			break
		case messageDiscriminator.dAppRequest:
			break
		case messageDiscriminator.ledgerResponse:
			break
		case messageDiscriminator.walletToLedger:
			break
		case messageDiscriminator.walletResponse:
			break
		case messageDiscriminator.toContentScript:
			break
		case messageDiscriminator.walletMessage:
			break
		case messageDiscriminator.detectWalletLink:
			break
		case messageDiscriminator.confirmation:
			break
		case messageDiscriminator.incomingDappMessage:
			break
		case messageDiscriminator.incomingWalletMessage:
			break
		case messageDiscriminator.sendMessageEventToDapp:
			break
		case messageDiscriminator.sendMessageToTab: {
			if (message.fromTabId) {
				await this.browser.tabs.sendMessage(message.fromTabId, { ...radixMsg.data, source: 'background' })
			}
			break
		}
		default:
			break
	}
	return createRadixMessage.confirmationError(radixMsg.source, radixMsg.messageId, {
		reason: 'unhandledMessageDiscriminator',
	})
}

export default {
	[MessageAction.RADIX]: onRadixMessage,
} as MessageHandlers
