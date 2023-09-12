import { messageDiscriminator } from '@radixdlt/connector-extension/src/chrome/messages/_types'
import { createMessage as createRadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/create-message'
import browser from 'webextension-polyfill'

import { PORT_NAME } from '@src/browser/messages/constants'
import type { Message } from '@src/browser/messages/types'
import { MessageAction, MessageSource } from '@src/browser/messages/types'

import { addMetadata } from '../helpers/add-metadata'
import { isConnectorEnabled } from '../radix'
import { chromeDAppClient, radixMessageHandler } from './radix'

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

	chromeDAppClient.messageListener(message =>
		isConnectorEnabled().then(enabled => {
			if (enabled) {
				const radixMsg = addMetadata(createRadixMessage.incomingDappMessage('dApp', message))
				radixMessageHandler.onMessage(radixMsg)

				switch (radixMsg.discriminator) {
					case messageDiscriminator.dAppRequest:
					case messageDiscriminator.ledgerResponse:
						// @TODO
						console.error(
							'⚡️Z3US⚡️: content-script chromeDAppClient.messageListener @TODO: handle radix message for none mobile wallets',
							radixMsg,
						)
						break
					default:
						break
				}
			}
		}),
	)

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
		if (message?.source === MessageSource.BACKGROUND && message?.action === MessageAction.PING) {
			return true
		}
		if ((await isConnectorEnabled()) !== true) return undefined
		return radixMessageHandler.onMessage(message)
	}

	return {
		onRuntimeMessage,
		forwardMessageToBackground,
	}
}
