import type { Message as RadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/_types'
import { createMessage as createRadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/create-message'
import browser from 'webextension-polyfill'

export type MessageClientType = ReturnType<typeof MessageClient>

export const MessageClient = () => {
	const responseHandlers: {
		[key: string]: any
	} = {}

	const sendMessage = async (message: RadixMessage) => {
		const promise = new Promise<RadixMessage>(resolve => {
			responseHandlers[message.messageId] = resolve
		})

		await browser.runtime.sendMessage(message)
		await browser.runtime.sendMessage(createRadixMessage.focusLedgerTab())

		return promise
	}

	const onMessage = (message: RadixMessage): void => {
		if (message?.discriminator === 'ledgerResponse') {
			try {
				const handler = responseHandlers[message.messageId]
				if (handler) {
					handler(message)
				}
			} finally {
				delete responseHandlers[message.messageId]
			}
		}
	}

	return {
		onMessage,
		sendMessage,
	}
}
