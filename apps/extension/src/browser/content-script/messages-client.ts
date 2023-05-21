import { Message as RadixMessage, messageDiscriminator } from '@radixdlt/connector-extension/src/chrome/messages/_types'
import { createMessage as createRadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/create-message'
import browser from 'webextension-polyfill'

import { PORT_NAME } from '@src/browser/messages/constants'
import { Message, MessageAction, MessageSource } from '@src/browser/messages/types'

export type MessageClientType = ReturnType<typeof MessageClient>

export const MessageClient = () => {
	console.log(`Z3US: content-script message client initialized.`)
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

	const forwardInpageMessageToBackground = (event: MessageEvent<Message>) => {
		if (event.source !== window) {
			return
		}
		const message = event.data
		if (message.target !== MessageSource.BACKGROUND) {
			return
		}
		port.postMessage(message)
	}

	const handlePing = (message: Message | RadixMessage) => {
		if ('discriminator' in message && message.discriminator in messageDiscriminator) {
			console.error('content-script onRadixMessage', message)
			return undefined // ignore messaged meant for offscreen
		}
		return Promise.resolve(true)
	}

	const forwardRadixEventToBackground = (event: CustomEvent<any>) => {
		port.postMessage({
			messageId: `${MessageAction.RADIX}-${crypto.randomUUID()}`,
			target: MessageSource.BACKGROUND,
			source: MessageSource.INPAGE,
			action: MessageAction.RADIX,
			payload: createRadixMessage.incomingDappMessage('dApp', event.detail),
		} as Message)
	}

	return {
		handlePing,
		forwardInpageMessageToBackground,
		forwardRadixEventToBackground,
	}
}
