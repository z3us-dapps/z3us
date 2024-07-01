import type {
	Message as RadixMessage,
	Messages as RadixMessages,
} from '@radixdlt/connector-extension/src/chrome/messages/_types'
import { createMessage as createRadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/create-message'
import browser from 'webextension-polyfill'

export type MessageClientType = ReturnType<typeof MessageClient>

export const MessageClient = () => {
	const responseHandlers: {
		[key: string]: any
	} = {}

	const sendMessage = async (message: RadixMessages['walletToLedger']) => {
		const promise = new Promise<RadixMessage>(resolve => {
			responseHandlers[message.data.interactionId] = resolve
		})

		await browser.runtime.sendMessage(message)
		await browser.runtime.sendMessage(createRadixMessage.focusLedgerTab())

		return promise
	}

	const onMessage = (message: RadixMessage): void => {
		if (message?.discriminator === 'ledgerResponse') {
			try {
				const handler = responseHandlers[message.data.interactionId]
				if (handler) {
					handler(message)
				}
			} finally {
				delete responseHandlers[message.data.interactionId]
			}
		}
	}

	return {
		onMessage,
		sendMessage,
	}
}
