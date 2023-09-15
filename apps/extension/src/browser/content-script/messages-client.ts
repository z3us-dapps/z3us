import { getConnectionPassword } from '@radixdlt/connector-extension/src/chrome/helpers/get-connection-password'
import { createMessage as createRadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/create-message'
import browser from 'webextension-polyfill'

import { PORT_NAME } from '@src/browser/messages/constants'
import type { Message } from '@src/browser/messages/types'
import { MessageAction, MessageSource } from '@src/browser/messages/types'

import { addMetadata } from '../helpers/add-metadata'
import { newMessage } from '../messages/message'
import { chromeDAppClient, radixMessageHandler, sendRadixMessage, sendRadixMessageToDapp } from './radix'
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
		switch (message?.target) {
			case MessageSource.INPAGE:
				window.postMessage(message)
				break
			case MessageSource.RADIX:
				sendRadixMessage(message.payload, message.fromTabId)
				break
			default:
		}
	})

	chromeDAppClient.messageListener(message => {
		const radixMsg = addMetadata(createRadixMessage.incomingDappMessage('dApp', message))
		isHandledByRadix().then(enabled =>
			enabled
				? radixMessageHandler.onMessage(radixMsg)
				: port.postMessage(newMessage(MessageAction.RADIX, MessageSource.RADIX, MessageSource.BACKGROUND, radixMsg)),
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

		return radixMessageHandler.onMessage(message)
	}

	const checkConnectButtonStatus = () =>
		isHandledByRadix().then(enabled => {
			if (enabled) {
				getConnectionPassword().map(connectionPassword =>
					sendRadixMessageToDapp(createRadixMessage.extensionStatus(!!connectionPassword)),
				)
			} else {
				sendRadixMessageToDapp(createRadixMessage.extensionStatus(true))
			}
		})

	return {
		onRuntimeMessage,
		forwardMessageToBackground,
		checkConnectButtonStatus,
	}
}
