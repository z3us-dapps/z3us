import { BackgroundMessageHandler } from '@radixdlt/connector-extension/src/chrome/background/message-handler'
import { Message as RadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/_types'
import { MessageClient as RadixMessageClient } from '@radixdlt/connector-extension/src/chrome/messages/message-client'
import { AppLogger } from '@radixdlt/connector-extension/src/utils/logger'

import { ledgerTabWatcher } from '@src/browser//background/tabs'
import { Message, MessageAction, MessageHandlers } from '@src/browser/messages/types'

const backgroundLogger = {
	debug: (...args: string[]) => console.log(JSON.stringify(args, null, 2)),
} as AppLogger

const backgroundMessageHandler = RadixMessageClient(
	BackgroundMessageHandler({
		logger: backgroundLogger,
		ledgerTabWatcher: ledgerTabWatcher,
	}),
	'background',
	{ logger: backgroundLogger },
)

async function ping() {
	return true
}

async function onRadixMessage(message: Message) {
	return backgroundMessageHandler.onMessage(message.payload as RadixMessage, message.fromTabId)
}

export default {
	[MessageAction.PING]: ping,
	[MessageAction.RADIX]: onRadixMessage,
} as MessageHandlers
