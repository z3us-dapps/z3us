import { Message as RadixMessage, messageDiscriminator } from '@radixdlt/connector-extension/src/chrome/messages/_types'

import { Message, MessageAction, MessageHandlers } from '@src/browser/messages/types'

async function ping() {
	return true
}

async function onRadixMessage(message: Message) {
	const radixMsg = message.payload as RadixMessage

	console.debug(message)

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
			throw new Error('unhandledMessageDiscriminator')
	}
}

export default {
	[MessageAction.PING]: ping,
	[MessageAction.RADIX]: onRadixMessage,
} as MessageHandlers
