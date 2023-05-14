import { dAppEvent } from '@radixdlt/connector-extension/src/chrome/dapp/_types'
import { Message as RadixMessage, messageDiscriminator } from '@radixdlt/connector-extension/src/chrome/messages/_types'
import { createMessage as createRadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/create-message'
import browser from 'webextension-polyfill'

import { PORT_NAME } from '@src/browser/messages/constants'
import { Message, MessageAction, MessageSource } from '@src/browser/messages/types'

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

const listener = (event: MessageEvent<Message>) => {
	if (event.source !== window) {
		return
	}
	const message = event.data
	if (message.target !== MessageSource.BACKGROUND) {
		return
	}
	port.postMessage(message)
}

window.addEventListener('message', listener, false)

window.addEventListener(dAppEvent.send, (event: CustomEvent<any>) => {
	port.postMessage({
		messageId: `${MessageAction.RADIX}-${crypto.randomUUID()}`,
		target: MessageSource.BACKGROUND,
		source: MessageSource.INPAGE,
		action: MessageAction.RADIX,
		payload: createRadixMessage.incomingDappMessage('dApp', event.detail),
	} as Message)
})

// returns true in any case to prevent reinjecting of the script
browser.runtime.onMessage.addListener((message: Message | RadixMessage) => {
	console.error(message)

	if ('action' in message && message.action in MessageAction) {
		port.postMessage(message)
	} else if ('discriminator' in message && message.discriminator in messageDiscriminator) {
		// @TODO
		console.debug(message)
	}
})
