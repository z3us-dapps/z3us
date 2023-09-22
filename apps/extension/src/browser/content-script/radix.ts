import type { ContentScriptMessageHandlerOptions } from '@radixdlt/connector-extension/src/chrome/content-script/message-handler'
import { ContentScriptMessageHandler } from '@radixdlt/connector-extension/src/chrome/content-script/message-handler'
import {
	ChromeDAppClient,
	type ChromeDAppClient as ChromeDAppClientType,
} from '@radixdlt/connector-extension/src/chrome/dapp/dapp-client'
import { getTabById } from '@radixdlt/connector-extension/src/chrome/helpers/get-tab-by-id'
import { sendMessageToTab as chromeSendMessageToTab } from '@radixdlt/connector-extension/src/chrome/helpers/send-message-to-tab'
import type { Message as RadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/_types'
import { MessageClient as RadixMessageClient } from '@radixdlt/connector-extension/src/chrome/messages/message-client'
import type { SendMessage } from '@radixdlt/connector-extension/src/chrome/messages/send-message'
import { logger } from '@radixdlt/connector-extension/src/utils/logger'
import { ResultAsync, errAsync, okAsync } from 'neverthrow'
import browser from 'webextension-polyfill'

import { config } from '@src/config'

export const chromeDAppClient: ChromeDAppClientType = ChromeDAppClient()

export const sendRadixMessageToDapp: ContentScriptMessageHandlerOptions['sendMessageToDapp'] = message => {
	const result = chromeDAppClient.sendMessage(message)
	return result.isErr() ? errAsync({ reason: 'unableToSendMessageToDapp' }) : okAsync(undefined)
}

export const sendRadixMessageEventToDapp: ContentScriptMessageHandlerOptions['sendMessageEventToDapp'] = (
	interactionId,
	eventType,
) => {
	const result = chromeDAppClient.sendMessageEvent(interactionId, eventType)
	return result.isErr() ? errAsync({ reason: 'unableToSendMessageEventToDapp' }) : okAsync(undefined)
}

export const chromeSendRadixMessage = (message: RadixMessage) =>
	ResultAsync.fromPromise(
		APP_RADIX ? browser.runtime.sendMessage(message) : browser.runtime.sendMessage(config.radix.extension.id, message),
		error => error as Error,
	)

export const sendRadixMessage: SendMessage = (message, tabId) => {
	const canSendMessageToTab = message.source === 'background' && tabId

	if (canSendMessageToTab) {
		return getTabById(tabId)
			.mapErr(error => ({
				reason: 'tabNotFound',
				message: 'could not find tab, user may have closed it',
				jsError: error,
			}))
			.andThen(() =>
				chromeSendMessageToTab(tabId, message).mapErr(error => ({
					reason: 'couldNotSendMessageToTab',
					jsError: error,
				})),
			)
	}

	return chromeSendRadixMessage(message).mapErr(error => ({
		reason: 'couldNotSendMessage',
		jsError: error,
	}))
}

export const radixMessageHandler: any = RadixMessageClient(
	ContentScriptMessageHandler({
		sendMessageToDapp: sendRadixMessageToDapp,
		sendMessageEventToDapp: sendRadixMessageEventToDapp,
		logger,
	}),
	'contentScript',
	{ logger, sendMessage: sendRadixMessage },
)
