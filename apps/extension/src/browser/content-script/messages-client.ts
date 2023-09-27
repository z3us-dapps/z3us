import { createMessage as createRadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/create-message'
import browser from 'webextension-polyfill'

import { MessageAction as BackgroundMessageAction } from '@src/browser/background/types'
import { PORT_NAME } from '@src/browser/messages/constants'
import { newMessage } from '@src/browser/messages/message'
import type { Message, ResponseMessage } from '@src/browser/messages/types'
import { MessageSource } from '@src/browser/messages/types'
import { addMetadata } from '@src/browser/metadata/add'

import { chromeDAppClient, radixMessageHandler, sendRadixMessage } from './radix'
import { isHandledByRadix } from './radix-connector'
import { MessageAction } from './types'

export type MessageClientType = ReturnType<typeof MessageClient>

export const MessageClient = () => {
	console.info(`⚡️Z3US⚡️: content-script message client initialized.`)

	let port = browser.runtime.connect({ name: PORT_NAME })
	port.onDisconnect.addListener(() => {
		// eslint-disable-next-line no-console
		if (port.error) console.error(`Disconnected due to an error: ${port.error.message}`)
		port = browser.runtime.connect({ name: PORT_NAME })
	})

	port.onMessage.addListener((message: ResponseMessage | Message) => {
		window.postMessage(message)
	})

	const onWindowMessage = (event: MessageEvent<Message>) => {
		if (event.source !== window) {
			return
		}
		const message = (event.data || {}) as Message
		if (message.target !== MessageSource.BACKGROUND) {
			return
		}
		port.postMessage(message)
	}

	const onRuntimeMessage = (message: any) => {
		const { action, target } = (message || {}) as Message
		switch (target) {
			case MessageSource.BACKGROUND:
			case MessageSource.POPUP:
				return // ignore
			case MessageSource.INPAGE:
				switch (action) {
					case MessageAction.CONTENT_SCRIPT_PING:
						return Promise.resolve(true)
					default:
						window.postMessage(message)
				}
			case MessageSource.RADIX:
				sendRadixMessage(message.payload, message.fromTabId)
			default:
				radixMessageHandler.onMessage(message)
		}
	}

	chromeDAppClient.messageListener(message => {
		const radixMsg = addMetadata(createRadixMessage.incomingDappMessage('dApp', message))
		isHandledByRadix().then(enabled =>
			enabled
				? radixMessageHandler.onMessage(radixMsg)
				: port.postMessage(
						newMessage(
							BackgroundMessageAction.BACKGROUND_RADIX,
							MessageSource.RADIX,
							MessageSource.BACKGROUND,
							radixMsg,
						),
				  ),
		)
	})

	return {
		onRuntimeMessage,
		onWindowMessage,
	}
}
