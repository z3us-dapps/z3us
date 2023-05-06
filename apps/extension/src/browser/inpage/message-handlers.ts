import browser from 'webextension-polyfill'

import { newMessage } from '../messages/message'
import { Message, MessageAction, MessageHandlers, MessageSource } from '../messages/types'

async function ping() {
	return true
}

async function onRadixMessage(message: Message) {
	console.debug(message)
	const forwardMsg = newMessage(message.action, message.source, MessageSource.POPUP, message.payload, message.fromTabId)
	browser.runtime.sendMessage(forwardMsg)
}

export default {
	[MessageAction.PING]: ping,
	[MessageAction.RADIX]: onRadixMessage,
} as MessageHandlers
