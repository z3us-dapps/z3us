import type { Runtime } from 'webextension-polyfill'

import type { MessageClientType } from './message-client'

export const getConnectHandler = (messageHandler: MessageClientType) => async (port: Runtime.Port) => {
	messageHandler.onPort(port)
}

export const getRadixMessageHandler =
	(messageHandler: MessageClientType) => (message: any, sender: Runtime.MessageSender) =>
		messageHandler.onRadixMessage(message, sender.tab?.id)
