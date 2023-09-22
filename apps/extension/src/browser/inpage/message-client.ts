import { generateId } from 'ui/src/utils/generate-id'

import timeout, { reason } from '@src/browser/messages/timeout'
import type { Message, ResponseMessage } from '@src/browser/messages/types'
import { MessageSource } from '@src/browser/messages/types'

export type MessageClientType = ReturnType<typeof MessageClient>

export const MessageClient = () => {
	console.info(`⚡️Z3US⚡️: inpage message client initialized.`)
	const messageHandlers: {
		[key: string]: any
	} = {}

	const onMessage = (event: MessageEvent<Message>) => {
		if (event.source !== window) {
			return
		}
		const message = event.data
		if (message?.target !== MessageSource.INPAGE) {
			return
		}
		if (!message.messageId) {
			return
		}

		window.dispatchEvent(new CustomEvent(`z3us.${message.action}`, { detail: message.payload }))

		const handler = messageHandlers[message.messageId]
		if (handler) {
			handler(message)
		}
	}

	const sendMessage = async (action: string, payload: any = {}) => {
		const messageId = `${action}-${generateId()}`
		const promise = new Promise<ResponseMessage['payload']>(resolve => {
			messageHandlers[messageId] = (message: Message) => {
				if (message.target !== MessageSource.INPAGE) {
					return
				}
				if (!message.messageId || message.messageId !== messageId) {
					return
				}
				resolve(message.payload)
			}
		})

		window.postMessage(
			{ messageId, target: MessageSource.BACKGROUND, source: MessageSource.INPAGE, action, payload } as Message,
			'*',
		)

		try {
			let response = await timeout(promise)
			if (response?.error && response?.error === reason) {
				// if timeout, might be because port reconnected, retry once
				response = await timeout(promise)
			}
			if (response?.error) {
				throw new Error(response.error)
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
		onMessage,
		sendMessage,
	}
}
