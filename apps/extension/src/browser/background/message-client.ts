import { BackgroundMessageHandler } from '@radixdlt/connector-extension/src/chrome/background/message-handler'
import { MessageClient as RadixMessageClient } from '@radixdlt/connector-extension/src/chrome/messages/message-client'
import { AppLogger } from '@radixdlt/connector-extension/src/utils/logger'
import browser, { Runtime } from 'webextension-polyfill'

import { ledgerTabWatcher } from '@src/browser/background/tabs'
import { PORT_NAME } from '@src/browser/messages/constants'
import { newReply } from '@src/browser/messages/message'
import messageHandlers from '@src/browser/messages/message-handlers'
import { Message, MessageSource, ResponseMessage } from '@src/browser/messages/types'

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
			ledgerTabWatcher: ledgerTabWatcher,
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
								sendReplyToInpage(message, {
									code: 500,
									error: error?.message || error,
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
								sendReplyToPopup(message, {
									code: 500,
									error: error?.message || error,
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
				default:
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

	return { onPort, onRadixMessage: radixMessageHandler.onMessage }
}
