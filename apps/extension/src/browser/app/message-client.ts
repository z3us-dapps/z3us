import type { Runtime } from 'webextension-polyfill'
import browser from 'webextension-polyfill'

import type { MessageTypes as BackgroundMessageTypes } from '@src/browser/background/message-handlers'
import type { MessageAction as BackgroundMessageAction } from '@src/browser/background/types'
import { PORT_NAME } from '@src/browser/messages/constants'
import { newMessage } from '@src/browser/messages/message'
import timeout, { reason } from '@src/browser/messages/timeout'
import type { Message, ResponseMessage } from '@src/browser/messages/types'
import { MessageSource } from '@src/browser/messages/types'

import messageHandlers from './message-handlers'

export type MessageClientType = ReturnType<typeof MessageClient>

export const MessageClient = () => {
	const responseHandlers: {
		[key: string]: any
	} = {}

	let port = browser.runtime.connect({ name: PORT_NAME })

	const onPortMessage = (message: ResponseMessage) => {
		if (!message?.messageId) {
			return
		}
		const handler = responseHandlers[message.messageId]
		if (handler) {
			handler(message)
		}
	}

	const onPortDisconnect = () => {
		// eslint-disable-next-line no-console
		if (port.error) console.error(`[APP]: Disconnected due to an error: ${port.error.message}`)
		port = browser.runtime.connect({ name: PORT_NAME })
		port.onDisconnect.addListener(onPortDisconnect)
		port.onMessage.addListener(onPortMessage)
	}

	port.onDisconnect.addListener(onPortDisconnect)
	port.onMessage.addListener(onPortMessage)

	const sendMessage = async (
		action: BackgroundMessageAction,
		payload: BackgroundMessageTypes[keyof BackgroundMessageTypes],
	) => {
		const msg = newMessage(action, MessageSource.POPUP, MessageSource.BACKGROUND, payload)
		const promise = new Promise<ResponseMessage>(resolve => {
			responseHandlers[msg.messageId] = resolve
		})

		port.postMessage(msg)

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
			delete responseHandlers[msg.messageId]
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
		message.senderUrl = message.senderUrl || sender?.url

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
