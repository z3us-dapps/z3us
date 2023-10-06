/* eslint-disable no-console */
import { generateId } from 'ui/src/utils/generate-id'

import { eventFromMessage } from '@src/browser/messages/message'
import timeout, { reason } from '@src/browser/messages/timeout'
import type { Message, ResponseMessage } from '@src/browser/messages/types'
import { MessageSource } from '@src/browser/messages/types'

export type MessageClientType = ReturnType<typeof MessageClient>

export const MessageClient = () => {
	console.info(`⚡️Z3US⚡️: inpage message client initialized.`)

	const responseHandlers: {
		[key: string]: any
	} = {}

	const onMessage = (event: MessageEvent<Message | ResponseMessage>) => {
		if (event.source !== window) {
			return
		}
		const message = event.data
		if (!message?.messageId) {
			return
		}

		const handler = responseHandlers[message.messageId]
		if (handler) {
			handler(message)
		} else if (message?.target === MessageSource.INPAGE) {
			window.dispatchEvent(eventFromMessage(message))
		}
	}

	const sendMessage = async (action: string, payload: any = {}) => {
		const messageId = `${action}-${generateId()}`
		const promise = new Promise<ResponseMessage>(resolve => {
			responseHandlers[messageId] = resolve
		})

		window.postMessage(
			{ messageId, target: MessageSource.BACKGROUND, source: MessageSource.INPAGE, action, payload } as Message,
			'*',
		)

		try {
			let response = await timeout<ResponseMessage>(promise)
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

	return {
		onMessage,
		sendMessage,
	}
}
