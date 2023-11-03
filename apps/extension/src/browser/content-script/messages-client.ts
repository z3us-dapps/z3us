/* eslint-disable no-console */
import { createMessage as createRadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/create-message'
import type { ExtensionInteraction, WalletInteractionWithOrigin } from '@radixdlt/radix-connect-schemas'
import browser from 'webextension-polyfill'

import { openAppPopup } from '@src/browser/app/popup'
import { MessageAction as BackgroundMessageAction } from '@src/browser/background/types'
import { PORT_NAME } from '@src/browser/messages/constants'
import { newMessage } from '@src/browser/messages/message'
import type { Message, ResponseMessage } from '@src/browser/messages/types'
import { MessageSource } from '@src/browser/messages/types'
import { getConnectionPassword } from '@src/browser/vault/storage'

import { chromeDAppClient, logger, radixMessageHandler, sendRadixMessage, sendRadixMessageToDapp } from './radix'
import { isHandledByRadix } from './radix-connector'
import { MessageAction } from './types'

export type MessageClientType = ReturnType<typeof MessageClient>

export const MessageClient = () => {
	console.info(`⚡️Z3US⚡️: content-script message client initialized.`)

	let port = browser.runtime.connect({ name: PORT_NAME })
	port.onDisconnect.addListener(() => {
		if (port.error) console.error(`Disconnected due to an error: ${port.error.message}`)
		port = browser.runtime.connect({ name: PORT_NAME })
	})

	port.onMessage.addListener((message: ResponseMessage) => {
		const { target, error } = message
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
		isHandledByRadix().then(enabled =>
			enabled
				? browser.runtime.sendMessage(radixMsg)
				: port.postMessage(
						newMessage(
							BackgroundMessageAction.BACKGROUND_RADIX,
							MessageSource.RADIX,
							MessageSource.BACKGROUND,
							radixMsg,
						),
				  ),
		)
	}

	const handleExtensionInteraction = async (extensionInteraction: ExtensionInteraction) => {
		switch (extensionInteraction.discriminator) {
			case 'openPopup':
				if (await isHandledByRadix()) {
					await browser.runtime.sendMessage(createRadixMessage.openParingPopup())
				} else {
					await openAppPopup('#/keystore/new/radix')
				}
				break
			case 'extensionStatus':
				if (await isHandledByRadix()) {
					await getConnectionPassword().then(connectionPassword => {
						sendRadixMessageToDapp(createRadixMessage.extensionStatus(!!connectionPassword))
					})
				} else {
					sendRadixMessageToDapp(createRadixMessage.extensionStatus(true))
				}
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
