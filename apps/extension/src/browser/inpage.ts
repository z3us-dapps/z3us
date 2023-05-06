import { MessageAction, MessageResponse } from './messages/types'
import { INIT } from './inpage/events'
import { MessageClient } from './inpage/message-client'

const messageHandler = MessageClient()

declare global {
	interface Window {
		z3us: {
			version: string
		}
	}
}

if (!window.z3us) {
	const z3us = {
		version: process.env.APP_VERSION,
		ping: async (): Promise<MessageResponse> => messageHandler.sendMessage(MessageAction.PING),
	}

	window.z3us = z3us
	window.dispatchEvent(new CustomEvent(INIT, { detail: z3us }))
}

export {}
