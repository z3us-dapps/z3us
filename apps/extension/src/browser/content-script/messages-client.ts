import { ContentScriptMessageHandler } from '@radixdlt/connector-extension/src/chrome/content-script/message-handler'
import { MessageLifeCycleEvent } from '@radixdlt/connector-extension/src/chrome/dapp/_types'
import { ChromeDAppClient } from '@radixdlt/connector-extension/src/chrome/dapp/dapp-client'
import { addMetadata } from '@radixdlt/connector-extension/src/chrome/helpers/add-metadata'
import {
	ConfirmationMessageError,
	Message as RadixMessage,
} from '@radixdlt/connector-extension/src/chrome/messages/_types'
import { createMessage as createRadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/create-message'
import { MessageClient as RadixMessageClient } from '@radixdlt/connector-extension/src/chrome/messages/message-client'
import { logger } from '@radixdlt/connector-extension/src/utils/logger'
import { ResultAsync, errAsync, okAsync } from 'neverthrow'
import browser from 'webextension-polyfill'

import { PORT_NAME } from '@src/browser/messages/constants'
import { Message, MessageAction, MessageSource } from '@src/browser/messages/types'

const chromeDAppClient = ChromeDAppClient()

const sendMessageToDapp = (message: Record<string, any>): ResultAsync<undefined, ConfirmationMessageError['error']> => {
	const result = chromeDAppClient.sendMessage(message)
	return result.isErr() ? errAsync({ reason: 'unableToSendMessageToDapp' }) : okAsync(undefined)
}

const sendMessageEventToDapp = (
	interactionId: string,
	eventType: MessageLifeCycleEvent,
): ResultAsync<undefined, ConfirmationMessageError['error']> => {
	const result = chromeDAppClient.sendMessageEvent(interactionId, eventType)
	return result.isErr() ? errAsync({ reason: 'unableToSendMessageEventToDapp' }) : okAsync(undefined)
}

const messageHandler = RadixMessageClient(
	ContentScriptMessageHandler({
		sendMessageToDapp,
		sendMessageEventToDapp,
		logger: logger,
	}),
	'contentScript',
	{ logger },
)

export type MessageClientType = ReturnType<typeof MessageClient>

export const MessageClient = () => {
	console.info(`⚡️Z3US⚡️: content-script message client initialized.`)
	let port = browser.runtime.connect({ name: PORT_NAME })
	port.onDisconnect.addListener(() => {
		// eslint-disable-next-line no-console
		if (port.error) console.error(`Disconnected due to an error: ${port.error.message}`)
		port = browser.runtime.connect({ name: PORT_NAME })
	})

	port.onMessage.addListener((message: Message) => {
		if (message?.target !== MessageSource.INPAGE) {
			return
		}
		window.postMessage(message)
	})

	const forwardMessageToBackground = (event: MessageEvent<Message>) => {
		if (event.source !== window) {
			return
		}
		const message = event.data
		if (message.target !== MessageSource.BACKGROUND) {
			return
		}
		port.postMessage(message)
	}

	const onRuntimeMessage = async (message: Message | RadixMessage) => {
		if ('action' in message && message.action === MessageAction.PING) {
			return true
		}
		return messageHandler.onMessage(message as RadixMessage)
	}

	const onRadixEvent = (event: CustomEvent<any>) => {
		if (!APP_RADIX) return

		messageHandler.onMessage(createRadixMessage.incomingDappMessage('dApp', addMetadata(event.detail)))
	}

	return {
		onRuntimeMessage,
		onRadixEvent,
		forwardMessageToBackground,
	}
}
