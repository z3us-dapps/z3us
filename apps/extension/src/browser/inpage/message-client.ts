import { dAppEvent } from '@radixdlt/connector-extension/src/chrome/dapp/_types'

import { Message, MessageAction, MessageResponse, MessageSource } from '@src/browser/messages/types'
import { generateId } from '@src/utils/generate-id'

export type MessageClientType = ReturnType<typeof MessageClient>

export const MessageClient = () => {
	console.log(`Z3US: inpage message client initialized.`)
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
		if (message.action === MessageAction.RADIX) {
			window.dispatchEvent(new CustomEvent(dAppEvent.receive, { detail: message.payload }))
		} else {
			window.dispatchEvent(new CustomEvent(`z3us.${message.action}`, { detail: message.payload }))
		}
		const handler = messageHandlers[message.messageId]
		if (handler) {
			handler(message)
		}
	}

	const sendMessage = async (action: string, payload: any = {}) => {
		const messageId = `${action}-${generateId()}`
		const promise = new Promise<MessageResponse>(resolve => {
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
			const response = await promise
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
		onMessage,
		sendMessage,
	}
}
