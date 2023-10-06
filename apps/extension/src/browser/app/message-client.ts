import type { Runtime } from 'webextension-polyfill'
import browser from 'webextension-polyfill'

import { PORT_NAME } from '@src/browser/messages/constants'
import timeout, { reason } from '@src/browser/messages/timeout'
import type { Message, ResponseMessage } from '@src/browser/messages/types'
import { MessageSource } from '@src/browser/messages/types'

import messageHandlers from './message-handlers'

export type MessageClientType = ReturnType<typeof MessageClient>

export const MessageClient = () => {
	let port = browser.runtime.connect({ name: PORT_NAME })
	port.onDisconnect.addListener(() => {
		// eslint-disable-next-line no-console
		if (port.error) console.error(`Disconnected due to an error: ${port.error.message}`)
		port = browser.runtime.connect({ name: PORT_NAME })
	})

	const responseHandlers: {
		[key: string]: any
	} = {}

	port.onMessage.addListener((message: ResponseMessage) => {
		if (!message?.messageId) {
			return
		}
		const handler = responseHandlers[message.messageId]
		if (handler) {
			handler(message)
		}
	})

	const sendMessage = async (action: string, payload: any = {}) => {
		const messageId = `${action}-${crypto.randomUUID()}`
		const promise = new Promise<ResponseMessage>(resolve => {
			responseHandlers[messageId] = resolve
		})

		port.postMessage({
			messageId,
			target: MessageSource.BACKGROUND,
			source: MessageSource.POPUP,
			action,
			payload,
		} as Message)

		try {
			let response = await timeout(promise)
			if (response?.error && response?.error === reason) {
				// if timeout, might be because port reconnected, retry once
				response = await timeout(promise)
			}
			if (response?.error) {
				throw new Error(response.error)
			}
			return response.payload
		} finally {
			delete responseHandlers[messageId]
		}
	}

	const onMessage = (message: any, sender: Runtime.MessageSender) => {
		const { messageId, target, action } = (message || {}) as Message
		if (!messageId) {
			return undefined
		}
		if (target !== MessageSource.POPUP) {
			return undefined
		}

		message.fromTabId = message.fromTabId || sender?.tab?.id

		const handler = messageHandlers[action]
		if (handler) {
			return handler(message)
		}
		return undefined
	}

	return {
		onMessage,
		sendMessage,
	}
}
