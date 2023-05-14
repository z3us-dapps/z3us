import { INIT } from '@src/browser/inpage/events'
import { MessageClient } from '@src/browser/inpage/message-client'
import { MessageAction, MessageResponse } from '@src/browser/messages/types'

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
