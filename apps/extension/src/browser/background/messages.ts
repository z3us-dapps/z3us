import { Runtime } from 'webextension-polyfill'

import { MessageClientType } from './message-client'

export const handleConnect = (messageHandler: MessageClientType) => async (port: Runtime.Port) => {
	messageHandler.onPort(port)
}

export const handleOffscreenMessage =
	(messageHandler: MessageClientType) => (message: any, sender: Runtime.MessageSender) => {
		messageHandler.onRadixMessage(message, sender.tab?.id)
	}
