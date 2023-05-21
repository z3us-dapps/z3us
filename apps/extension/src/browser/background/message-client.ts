import browser, { Runtime } from 'webextension-polyfill'

import { PORT_NAME } from '@src/browser/messages/constants'
import { newMessage } from '@src/browser/messages/message'
import { Message, MessageAction, MessageHandlers, MessageSource } from '@src/browser/messages/types'

const popupURL = new URL(browser.runtime.getURL(''))

export type MessageClientType = ReturnType<typeof MessageClient>

export const MessageClient = (
	fromPopupHandlers: MessageHandlers,
	fromInpageHandlers: MessageHandlers,
	fromOffscreenHandlers: MessageHandlers,
) => {
	console.log(`Z3US: background message client initialized.`)
	const onPort = (port: Runtime.Port) => {
		if (!port) throw new Error('Invalid port')
		if (port.name !== PORT_NAME) return
		if (!port.sender?.url) throw new Error('Missing sender url')
		if (new URL(port.sender.url).hostname === popupURL.hostname) throw new Error('Invalid popup url')

		const timer = setTimeout(
			async () => {
				clearTimeout(timer)
				port.disconnect()
			},
			250e3,
			port,
		)

		const sendReplyToPopup = async (messageId: string, action: MessageAction, request: any, payload: any) =>
			port.postMessage({
				target: MessageSource.POPUP,
				source: MessageSource.BACKGROUND,
				messageId,
				action,
				request,
				payload,
			} as Message)

		const sendReplyToInpage = async (messageId: string, action: MessageAction, request: any, payload: any) =>
			port.postMessage({
				target: MessageSource.INPAGE,
				source: MessageSource.BACKGROUND,
				messageId,
				action,
				request,
				payload,
			} as Message)

		// const sendReplyToOffscreen = async (payload: any, fromTabId?: string) =>
		// 	browser.runtime.sendMessage(payload, fromTabId)

		port.onMessage.addListener(async (message: Message) => {
			if (message.target !== MessageSource.BACKGROUND) {
				return
			}

			const { messageId, action, payload, source } = message

			switch (source) {
				case MessageSource.OFFSCREEN:
					throw new Error(`Invalid port message source ${source}`)
					break
				case MessageSource.INPAGE:
					if (new URL(port.sender.url).hostname === popupURL.hostname) {
						sendReplyToInpage(messageId, action, payload, { code: 400, error: 'Invalid message source from popup' })
					} else {
						const handler = fromInpageHandlers[action]
						if (handler) {
							try {
								const response = await handler({ ...message, fromTabId: port.sender?.tab?.id })
								sendReplyToInpage(messageId, action, payload, response)
							} catch (error) {
								sendReplyToInpage(messageId, action, payload, { code: 500, error: error?.message || error })
							}
						} else {
							sendReplyToInpage(messageId, action, payload, { code: 400, error: 'Bad request' })
						}
					}
					break
				case MessageSource.POPUP:
					if (new URL(port.sender.url).hostname !== popupURL.hostname) {
						sendReplyToPopup(messageId, action, payload, { code: 403, error: 'Forbidden sender' })
					} else {
						const handler = fromPopupHandlers[action]
						if (handler) {
							try {
								const response = await handler(message)
								sendReplyToPopup(messageId, action, payload, response)
							} catch (error) {
								sendReplyToPopup(messageId, action, payload, { code: 500, error: error?.message || error })
							}
						} else {
							sendReplyToPopup(messageId, action, payload, { code: 400, error: 'Bad request' })
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

	const onRadixMessage = async (payload: any, fromTabId?: number) => {
		console.error('background onRadixMessage', fromTabId, payload)
		const handler = fromOffscreenHandlers[MessageAction.RADIX]
		if (!handler) {
			throw new Error('Missing radix message handler')
		}
		const message = newMessage(MessageAction.RADIX, MessageSource.INPAGE, MessageSource.BACKGROUND, payload, fromTabId)
		const response = await handler(message)
		return response?.payload
	}

	return { onPort, onRadixMessage }
}
