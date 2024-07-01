import type {
	Message as RadixMessage,
	Messages as RadixMessages,
} from '@radixdlt/connector-extension/src/chrome/messages/_types'
import { createMessage as createRadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/create-message'
import browser from 'webextension-polyfill'

import { MessageAction as BackgroundMessageAction } from '@src/browser/background/types'
import { PORT_NAME } from '@src/browser/messages/constants'
import { newMessage } from '@src/browser/messages/message'
import { MessageSource } from '@src/browser/messages/types'

export type MessageClientType = ReturnType<typeof MessageClient>

export const MessageClient = () => {
	const responseHandlers: {
		[key: string]: any
	} = {}

	let port = browser.runtime.connect({ name: PORT_NAME })

	const onPortDisconnect = () => {
		// eslint-disable-next-line no-console
		if (port.error) console.error(`[LEDGER]: Disconnected due to an error: ${port.error.message}`)
		port = browser.runtime.connect({ name: PORT_NAME })
		port.onDisconnect.addListener(onPortDisconnect)
	}

	port.onDisconnect.addListener(onPortDisconnect)

	const sendMessage = async (message: RadixMessages['walletToLedger']) => {
		const promise = new Promise<RadixMessage>(resolve => {
			responseHandlers[message.data.interactionId] = resolve
		})

		await browser.runtime.sendMessage(message)
		await browser.runtime.sendMessage(createRadixMessage.focusLedgerTab())

		port.postMessage(
			newMessage(
				BackgroundMessageAction.BACKGROUND_RADIX,
				MessageSource.RADIX,
				MessageSource.BACKGROUND,
				createRadixMessage.focusLedgerTab(),
			),
		)

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
