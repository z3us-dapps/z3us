import type { ContentScriptMessageHandlerOptions } from '@radixdlt/connector-extension/src/chrome/content-script/message-handler'
import { ContentScriptMessageHandler } from '@radixdlt/connector-extension/src/chrome/content-script/message-handler'
import { dAppEvent } from '@radixdlt/connector-extension/src/chrome/dapp/_types'
import {
	ChromeDAppClient,
	type ChromeDAppClient as ChromeDAppClientType,
} from '@radixdlt/connector-extension/src/chrome/dapp/dapp-client'
import type { Message as RadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/_types'
import { MessageClient as RadixMessageClient } from '@radixdlt/connector-extension/src/chrome/messages/message-client'
import type { SendMessage } from '@radixdlt/connector-extension/src/chrome/messages/send-message'
import { logger as utilsLogger } from '@radixdlt/connector-extension/src/utils/logger'
import { ResultAsync, errAsync, ok, okAsync } from 'neverthrow'
import browser from 'webextension-polyfill'

export const logger = utilsLogger.getSubLogger({ name: 'content-script' })

export const chromeDAppClient: ChromeDAppClientType = ChromeDAppClient(logger)
chromeDAppClient.sendMessage = (message: Record<string, any>) => {
	const clonedDetail = (globalThis as any).cloneInto
		? (globalThis as any).cloneInto(message, document.defaultView)
		: message
	window.dispatchEvent(
		new CustomEvent(dAppEvent.receive, {
			detail: clonedDetail,
		}),
	)
	return ok(true)
}

export const sendRadixMessageToDapp: ContentScriptMessageHandlerOptions['sendMessageToDapp'] = message => {
	const result = chromeDAppClient.sendMessage(message)
	return result.isErr() ? errAsync({ reason: 'unableToSendMessageToDapp' }) : okAsync(undefined)
}

export const sendRadixMessageEventToDapp: ContentScriptMessageHandlerOptions['sendMessageEventToDapp'] = (
	data,
	eventType,
) => {
	if (window.location.origin !== data.metadata?.origin) return okAsync(undefined)
	const result = chromeDAppClient.sendMessageEvent(data.interactionId, eventType)
	return result.isErr() ? errAsync({ reason: 'unableToSendMessageEventToDapp' }) : okAsync(undefined)
}

export const sendRadixMessage = (message: RadixMessage, tabId?: number) => {
	const canSendMessageToTab = message.source === 'background' && tabId

	if (canSendMessageToTab) {
		return ResultAsync.fromPromise(browser.tabs.get(tabId), err => err as Error)
			.mapErr(error => ({
				reason: 'tabNotFound',
				message: 'could not find tab, user may have closed it',
				jsError: error,
			}))
			.andThen(() =>
				ResultAsync.fromPromise(browser.tabs.sendMessage(tabId, message), err => err as Error).mapErr(error => ({
					reason: 'couldNotSendMessageToTab',
					jsError: error,
				})),
			)
	}

	return ResultAsync.fromPromise(browser.runtime.sendMessage(message), error => error as Error).mapErr(error => ({
		reason: 'couldNotSendMessage',
		jsError: error,
	}))
}

export const radixMessageHandler = RadixMessageClient(
	ContentScriptMessageHandler({
		sendMessageToDapp: sendRadixMessageToDapp,
		sendMessageEventToDapp: sendRadixMessageEventToDapp,
		logger,
	}),
	'contentScript',
	{ logger, sendMessage: sendRadixMessage as SendMessage },
)
