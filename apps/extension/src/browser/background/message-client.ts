import { BackgroundMessageHandler } from '@radixdlt/connector-extension/src/chrome/background/message-handler'
import type { Message as RadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/_types'
import { MessageClient as RadixMessageClient } from '@radixdlt/connector-extension/src/chrome/messages/message-client'
import type { AppLogger } from '@radixdlt/connector-extension/src/utils/logger'
import type { Runtime } from 'webextension-polyfill'
import browser from 'webextension-polyfill'

import { ledgerTabWatcher } from '@src/browser/background/tabs'
import { PORT_NAME } from '@src/browser/messages/constants'
import type { Message, ResponseMessage } from '@src/browser/messages/types'
import { MessageSource } from '@src/browser/messages/types'

import messageHandlers from './message-handlers'

const popupURL = new URL(browser.runtime.getURL(''))

const backgroundLogger = {
	debug: (...args: string[]) => console.log(JSON.stringify(args, null, 2)),
} as AppLogger

export type MessageClientType = ReturnType<typeof MessageClient>

export const MessageClient = () => {
	console.info(`⚡️Z3US⚡️: background message client initialized.`)

	const radixMessageHandler = RadixMessageClient(
		BackgroundMessageHandler({
			logger: backgroundLogger,
			ledgerTabWatcher,
		}),
		'background',
		{ logger: backgroundLogger },
	)

	const onPort = (port: Runtime.Port) => {
		if (!port) throw new Error('Invalid port')
		if (port.name !== PORT_NAME) return
		if (!port.sender?.url) throw new Error('Missing sender url')

		port.onMessage.addListener(async (message: Message) => {
			try {
				const { messageId, target, action, source } = (message || {}) as Message
				if (!messageId) {
					throw new Error(`Invalid message`)
				}
				if (target !== MessageSource.BACKGROUND) {
					throw new Error(`Invalid target: ${target}`)
				}

				message.fromTabId = message.fromTabId || port.sender?.tab?.id

				switch (source) {
					case MessageSource.INPAGE:
						if (new URL(port.sender.url).hostname === popupURL.hostname) {
							throw new Error('Forbidden sender')
						}
						break
					case MessageSource.POPUP:
						if (new URL(port.sender.url).hostname !== popupURL.hostname) {
							throw new Error('Forbidden sender')
						}
						break
					case MessageSource.RADIX:
						break
					default:
						throw new Error('Invalid source')
				}

				const handler = messageHandlers[action]
				if (handler) {
					const response = await handler(message)
					port.postMessage({ ...message, payload: response } as ResponseMessage)
				} else {
					throw new Error('Bad request')
				}
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error(`⚡️Z3US⚡️: background message client failed to handle message`, error)
				port.postMessage({ ...message, error: error?.message || 'Internal error' } as ResponseMessage)
			}
		})

		port.onDisconnect.addListener(() => {
			if (port.error) {
				// eslint-disable-next-line no-console
				console.error(`Disconnected due to an error: ${port.error.message}`)
			}
		})
	}

	const onRadixMessage = (message: RadixMessage, tabId?: number) => {
		if (APP_RADIX) radixMessageHandler.onMessage(message, tabId)
	}

	const onMessage = (message: any, sender: Runtime.MessageSender) => {
		const { target } = (message || {}) as Message
		switch (target) {
			case MessageSource.INPAGE:
			case MessageSource.RADIX:
			case MessageSource.POPUP:
			case MessageSource.BACKGROUND:
				return // ignore
			default:
				onRadixMessage(message, sender.tab?.id)
		}
	}

	return { onPort, onMessage, onRadixMessage }
}
