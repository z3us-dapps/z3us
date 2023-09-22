import { BackgroundMessageHandler } from '@radixdlt/connector-extension/src/chrome/background/message-handler'
import type { Message as RadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/_types'
import { MessageClient as RadixMessageClient } from '@radixdlt/connector-extension/src/chrome/messages/message-client'
import type { AppLogger } from '@radixdlt/connector-extension/src/utils/logger'
import type { Runtime } from 'webextension-polyfill'
import browser from 'webextension-polyfill'

import { ledgerTabWatcher } from '@src/browser/background/tabs'
import { PORT_NAME } from '@src/browser/messages/constants'
import { newReply } from '@src/browser/messages/message'
import messageHandlers from '@src/browser/messages/message-handlers'
import type { Message, ResponseMessage } from '@src/browser/messages/types'
import { MessageAction, MessageSource } from '@src/browser/messages/types'

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

		const timer = setTimeout(
			async () => {
				clearTimeout(timer)
				port.disconnect()
			},
			250e3,
			port,
		)

		const sendReplyToPopup = async (msg: Message | ResponseMessage, response: any) =>
			port.postMessage(newReply(msg, MessageSource.BACKGROUND, MessageSource.POPUP, response))

		const sendReplyToInpage = async (msg: Message | ResponseMessage, response: any) =>
			port.postMessage(newReply(msg, MessageSource.BACKGROUND, MessageSource.INPAGE, response))

		const sendReplyToRadix = async (msg: Message | ResponseMessage, response: any) =>
			port.postMessage(newReply(msg, MessageSource.BACKGROUND, MessageSource.RADIX, response))

		port.onMessage.addListener(async (message: Message) => {
			if (message.target !== MessageSource.BACKGROUND) {
				return
			}
			message.fromTabId = message.fromTabId || port.sender?.tab?.id

			const { action, source } = message

			switch (source) {
				case MessageSource.INPAGE:
					if (new URL(port.sender.url).hostname === popupURL.hostname) {
						sendReplyToInpage(message, {
							code: 400,
							error: 'Forbidden sender',
						})
					} else {
						const handler = messageHandlers[action]
						if (handler) {
							try {
								const response = await handler(message)
								sendReplyToInpage(message, response)
							} catch (error) {
								// eslint-disable-next-line no-console
								console.error(
									`⚡️Z3US⚡️: background message client failed to handle ${source} message: ${action}.`,
									error,
								)
								sendReplyToInpage(message, {
									code: 500,
									error: error.message || `Failed ${source} message: ${action}`,
								})
							}
						} else {
							sendReplyToInpage(message, {
								code: 400,
								error: 'Bad request',
							})
						}
					}
					break
				case MessageSource.POPUP:
					if (new URL(port.sender.url).hostname !== popupURL.hostname) {
						sendReplyToPopup(message, {
							code: 403,
							error: 'Forbidden sender',
						})
					} else {
						const handler = messageHandlers[action]
						if (handler) {
							try {
								const response = await handler(message)
								sendReplyToPopup(message, response)
							} catch (error) {
								// eslint-disable-next-line no-console
								console.error(
									`⚡️Z3US⚡️: background message client failed to handle ${source} message: ${action}.`,
									error,
								)
								sendReplyToPopup(message, {
									code: 500,
									error: error.message || `Failed ${source} message: ${action}`,
								})
							}
						} else {
							sendReplyToPopup(message, {
								code: 400,
								error: 'Bad request',
							})
						}
					}
					break
				case MessageSource.RADIX:
					if (messageHandlers[MessageAction.RADIX]) {
						try {
							const response = await messageHandlers[MessageAction.RADIX](message)
							if (response) sendReplyToRadix(message, response)
						} catch (error) {
							// eslint-disable-next-line no-console
							console.error(
								`⚡️Z3US⚡️: background message client failed to handle ${source} message: ${action}.`,
								error,
							)
						}
					}
					break
				default:
					// eslint-disable-next-line no-console
					console.error(
						`⚡️Z3US⚡️: background message client failed to handle ${source} message: ${action}.`,
						'Invalid source',
					)
					break
			}
		})

		port.onDisconnect.addListener(() => {
			if (port.error) {
				// eslint-disable-next-line no-console
				console.error(`Disconnected due to an error: ${port.error.message}`)
			}
		})
	}

	const onRadixMessage = async (message: RadixMessage, tabId?: number) => {
		if (!APP_RADIX) return
		radixMessageHandler.onMessage(message, tabId)
	}

	return { onPort, onRadixMessage }
}
