import '@src/helpers/polyfills'

import { MessageAction as BackgroundMessageAction } from '@src/browser/background/types'
import { MessageClient } from '@src/browser/inpage/message-client'
import { Event , MessageAction as InPageMessageAction } from '@src/browser/inpage/types'
import type { ResponseMessage } from '@src/browser/messages/types'
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

		ping: async (): Promise<ResponseMessage> => messageHandler.sendMessage(BackgroundMessageAction.BACKGROUND_PING),

		onWalletChange: (fn: EventListenerOrEventListenerObject) =>
			window.addEventListener(`z3us.${InPageMessageAction.INPAGE_KEYSTORE_CHANGE}`, fn),
	}

	window.z3us = z3us
	window.dispatchEvent(new CustomEvent(Event.INIT, { detail: z3us }))
}

export default {}
