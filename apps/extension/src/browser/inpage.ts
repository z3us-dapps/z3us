import '@src/helpers/polyfills'
import { MessageClient } from '@src/browser/inpage/message-client'
import { Event } from '@src/browser/inpage/types'
import type { ResponseMessage } from '@src/browser/messages/types'
import { config } from '@src/config'

import { MessageAction } from './background/types'

declare global {
	interface Window {
		z3us: {
			version: string
			ping: () => Promise<ResponseMessage>
		}
	}
}

if (!window.z3us) {
	const messageHandler = MessageClient()

	window.addEventListener('message', messageHandler.onMessage, false)

	const z3us = {
		version: config.version,
		ping: async (): Promise<ResponseMessage> => messageHandler.sendMessage(MessageAction.BACKGROUND_PING),
	}

	window.z3us = z3us
	window.dispatchEvent(new CustomEvent(Event.INIT, { detail: z3us }))
}

export default {}
