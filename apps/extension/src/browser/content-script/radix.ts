import { ContentScriptMessageHandler } from '@radixdlt/connector-extension/src/chrome/content-script/message-handler'
import type { MessageLifeCycleEvent } from '@radixdlt/connector-extension/src/chrome/dapp/_types'
import { ChromeDAppClient } from '@radixdlt/connector-extension/src/chrome/dapp/dapp-client'
import { getTabById } from '@radixdlt/connector-extension/src/chrome/helpers/get-tab-by-id'
import { sendMessageToTab as chromeSendMessageToTab } from '@radixdlt/connector-extension/src/chrome/helpers/send-message-to-tab'
import type {
	ConfirmationMessageError,
	Message as RadixMessage,
} from '@radixdlt/connector-extension/src/chrome/messages/_types'
import { MessageClient as RadixMessageClient } from '@radixdlt/connector-extension/src/chrome/messages/message-client'
import { logger } from '@radixdlt/connector-extension/src/utils/logger'
import { ResultAsync, errAsync, okAsync } from 'neverthrow'

export const chromeDAppClient = ChromeDAppClient()

export const sendMessageToDapp = (
	message: Record<string, any>,
): ResultAsync<undefined, ConfirmationMessageError['error']> => {
	const result = chromeDAppClient.sendMessage(message)
	return result.isErr() ? errAsync({ reason: 'unableToSendMessageToDapp' }) : okAsync(undefined)
}

export const sendMessageEventToDapp = (
	interactionId: string,
	eventType: MessageLifeCycleEvent,
): ResultAsync<undefined, ConfirmationMessageError['error']> => {
	const result = chromeDAppClient.sendMessageEvent(interactionId, eventType)
	return result.isErr() ? errAsync({ reason: 'unableToSendMessageEventToDapp' }) : okAsync(undefined)
}

export const chromeSendMessage = (message: RadixMessage) =>
	ResultAsync.fromPromise(
		APP_RADIX
			? chrome.runtime.sendMessage(message)
			: chrome.runtime.sendMessage('knnddnciondgghmgcmjjebigcehhkeoi', message),
		error => error as Error,
	)

export const sendMessage = (
	message: RadixMessage,
	tabId?: number,
): ResultAsync<undefined, ConfirmationMessageError['error']> => {
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

	return chromeSendMessage(message).mapErr(error => ({
		reason: 'couldNotSendMessage',
		jsError: error,
	}))
}

export const radixMessageHandler = RadixMessageClient(
	ContentScriptMessageHandler({
		sendMessageToDapp,
		sendMessageEventToDapp,
		logger,
	}),
	'contentScript',
	{ logger, sendMessage },
)
