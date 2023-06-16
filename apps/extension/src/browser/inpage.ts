import '@src/helpers/polyfills'

import { INIT } from '@src/browser/inpage/events'
import { MessageClient } from '@src/browser/inpage/message-client'
import type { ResponseMessage } from '@src/browser/messages/types';
import { MessageAction } from '@src/browser/messages/types'
import { config } from '@src/config'

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
		ping: async (): Promise<ResponseMessage> => messageHandler.sendMessage(MessageAction.PING),
	}

	window.z3us = z3us
	window.dispatchEvent(new CustomEvent(INIT, { detail: z3us }))
}

export default {}
