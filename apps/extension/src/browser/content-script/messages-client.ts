/* eslint-disable no-console */
import type { Message as RadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/_types'
import { createMessage as createRadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/create-message'
import type { ExtensionInteraction, WalletInteractionWithOrigin } from '@radixdlt/radix-connect-schemas'
import browser from 'webextension-polyfill'

import { openAppPopup } from '@src/browser/app/popup'
import { MessageAction as BackgroundMessageAction } from '@src/browser/background/types'
import { PORT_NAME } from '@src/browser/messages/constants'
import { newMessage } from '@src/browser/messages/message'
import type { Message, ResponseMessage } from '@src/browser/messages/types'
import { MessageSource } from '@src/browser/messages/types'

import timeout, { reason } from '../messages/timeout'
import { chromeDAppClient, logger, radixMessageHandler, sendRadixMessage } from './radix'
import { isHandledByRadix } from './radix-connector'
import { checkConnectButtonStatus } from './storage'
import { MessageAction } from './types'

export type MessageClientType = ReturnType<typeof MessageClient>

export const MessageClient = () => {
	console.info(`⚡️Z3US⚡️: content-script message client initialized.`)

	const responseHandlers: {
		[key: string]: any
	} = {}

	let port = browser.runtime.connect({ name: PORT_NAME })

	const onPortMessage = (message: ResponseMessage) => {
		const { messageId, target, error } = message

		const handler = responseHandlers[messageId]
		if (handler) {
			handler(message)
		}

		if (error) {
			console.error(`⚡️Z3US⚡️: content-script message client response error`, error)
		} else {
			switch (target) {
				case MessageSource.BACKGROUND:
				case MessageSource.POPUP:
					break
				case MessageSource.RADIX:
					if (message.payload !== null && message.payload !== undefined) radixMessageHandler.onMessage(message.payload)
					break
				default:
					window.postMessage(message)
					break
			}
		}
	}

	const onPortDisconnect = () => {
		if (port.error) console.error(`Disconnected due to an error: ${port.error.message}`)
		port = browser.runtime.connect({ name: PORT_NAME })
		port.onDisconnect.addListener(onPortDisconnect)
		port.onMessage.addListener(onPortMessage)
	}

	port.onDisconnect.addListener(onPortDisconnect)
	port.onMessage.addListener(onPortMessage)

	const sendMessage = async (radixMsg: RadixMessage) => {
		const msg = newMessage(
			BackgroundMessageAction.BACKGROUND_RADIX,
			MessageSource.RADIX,
			MessageSource.BACKGROUND,
			radixMsg,
		)
		const promise = new Promise<ResponseMessage>(resolve => {
			responseHandlers[msg.messageId] = resolve
		})

		port.postMessage(msg)

		try {
			let response = await timeout(promise)
			if (response?.error && response?.error === reason) {
				// if timeout, might be because port reconnected, retry once
				response = await timeout(promise)
			}
			if (response?.error) {
				throw new Error(response.error)
			}
			return response.payload
		} finally {
			delete responseHandlers[msg.messageId]
		}
	}

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
				return undefined
			case MessageSource.INPAGE:
				switch (action) {
					case MessageAction.CONTENT_SCRIPT_PING:
						return Promise.resolve(true)
					default:
						window.postMessage(message)
						return undefined
				}
			case MessageSource.RADIX:
				sendRadixMessage(message.payload, message.fromTabId)
				return undefined
			default:
				radixMessageHandler.onMessage(message)
				return undefined
		}
	}

	const handleWalletInteraction = async (walletInteraction: WalletInteractionWithOrigin) => {
		const radixMsg = createRadixMessage.dAppRequest('contentScript', walletInteraction)
		const enabled = await isHandledByRadix()
		if (enabled) {
			await browser.runtime.sendMessage(radixMsg)
		} else {
			await sendMessage(radixMsg)
		}
	}

	const handleExtensionInteraction = async (extensionInteraction: ExtensionInteraction) => {
		switch (extensionInteraction.discriminator) {
			case 'openPopup':
				if (await isHandledByRadix()) {
					await browser.runtime.sendMessage(createRadixMessage.openParingPopup())
				} else {
					await openAppPopup('#/keystore/new')
				}
				break
			case 'extensionStatus':
				await checkConnectButtonStatus()
				break
			default:
				logger.error({
					reason: 'InvalidExtensionRequest',
					interaction: extensionInteraction,
				})
				break
		}
	}

	chromeDAppClient.messageListener(handleWalletInteraction, handleExtensionInteraction)

	return {
		onRuntimeMessage,
		onWindowMessage,
	}
}
