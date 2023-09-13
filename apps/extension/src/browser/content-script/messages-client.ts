import { createMessage as createRadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/create-message'
import browser from 'webextension-polyfill'

import { PORT_NAME } from '@src/browser/messages/constants'
import type { Message } from '@src/browser/messages/types'
import { MessageAction, MessageSource } from '@src/browser/messages/types'

import { addMetadata } from '../helpers/add-metadata'
import { newMessage } from '../messages/message'
import { chromeDAppClient, radixMessageHandler } from './radix'
import { isHandledByRadix } from './radix-connector'

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

	chromeDAppClient.messageListener(message => {
		const radixMsg = addMetadata(createRadixMessage.incomingDappMessage('dApp', message))

		// if connector enabled forward message to radix handler otherwise we handle message in background (none mobile wallet)
		isHandledByRadix().then(enabled =>
			enabled
				? radixMessageHandler.onMessage(radixMsg)
				: port.postMessage(newMessage(MessageAction.RADIX, MessageSource.INPAGE, MessageSource.BACKGROUND, radixMsg)),
		)
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

	const onRuntimeMessage = async (message: any) => {
		const { source, action } = (message || {}) as Message
		if (source === MessageSource.BACKGROUND && action === MessageAction.PING) {
			return true
		}

		// if connector enabled forward message to radix handler otherwise we handle message in background (none mobile wallet)
		return isHandledByRadix().then(enabled =>
			enabled
				? radixMessageHandler.onMessage(message)
				: port.postMessage(
						newMessage(MessageAction.RADIX, MessageSource.BACKGROUND, MessageSource.BACKGROUND, message),
				  ),
		)
	}

	return {
		onRuntimeMessage,
		forwardMessageToBackground,
	}
}
