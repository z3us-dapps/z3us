import browser from 'webextension-polyfill'

import { PORT_NAME } from '@src/browser/messages/constants'
import timeout from '@src/browser/messages/timeout'
import type { Message, ResponseMessage } from '@src/browser/messages/types'
import { MessageSource } from '@src/browser/messages/types'

export type MessageClientType = ReturnType<typeof MessageClient>

export const MessageClient = () => {
	let port = browser.runtime.connect({ name: PORT_NAME })
	port.onDisconnect.addListener(() => {
		console.error(`onDisconnect: ${port}`)
		// eslint-disable-next-line no-console
		if (port.error) console.error(`Disconnected due to an error: ${port.error.message}`)
		port = browser.runtime.connect({ name: PORT_NAME })
	})

	const messageHandlers: {
		[key: string]: any
	} = {}

	port.onMessage.addListener((message: Message) => {
		if (message?.target !== MessageSource.POPUP) {
			return
		}
		if (!message.messageId) {
			return
		}
		const handler = messageHandlers[message.messageId]
		if (handler) {
			handler(message)
		}
	})

	const sendMessage = async (action: string, payload: any = {}) => {
		console.error(`sendMessage: ${port}`)
		const messageId = `${action}-${crypto.randomUUID()}`
		const promise = new Promise<ResponseMessage['payload']>(resolve => {
			messageHandlers[messageId] = (message: Message) => {
				if (message.target !== MessageSource.POPUP) {
					return
				}
				if (!message.messageId || message.messageId !== messageId) {
					return
				}
				resolve(message.payload)
			}
		})

		port.postMessage({
			messageId,
			target: MessageSource.BACKGROUND,
			source: MessageSource.POPUP,
			action,
			payload,
		} as Message)

		try {
			const response = await timeout(promise)
			if (response?.error) {
				throw response.error
			}
			if (response?.code && response.code !== 200) {
				throw new Error(`Unknown error (code ${response.code})`)
			}
			return response
		} finally {
			delete messageHandlers[messageId]
		}
	}

	return {
		sendMessage,
	}
}
