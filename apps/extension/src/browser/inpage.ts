import '@src/helpers/polyfills'
import { INIT } from '@src/browser/inpage/events'
import { MessageClient } from '@src/browser/inpage/message-client'
import { MessageAction, ResponseMessage } from '@src/browser/messages/types'
import { config } from '@src/config'

const messageHandler = MessageClient()

window.addEventListener('message', messageHandler.onMessage, false)

declare global {
	interface Window {
		z3us: {
			version: string
		}
	}
}

if (!window.z3us) {
	const z3us = {
		version: config.version,
		ping: async (): Promise<ResponseMessage> => messageHandler.sendMessage(MessageAction.PING),
	}

	window.z3us = z3us
	window.dispatchEvent(new CustomEvent(INIT, { detail: z3us }))
}

export {}
