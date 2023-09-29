import { generateId } from 'ui/src/utils/generate-id'

import type { Message, MessageAction, MessageSource, ResponseMessage, ResponseMessageData, Z3USEvent } from './types'

export const newMessage = (
	action: MessageAction,
	source: MessageSource,
	target: MessageSource,
	payload?: any,
	fromTabId?: number,
): Message => ({
	messageId: `${action}-${generateId()}`,
	target,
	source,
	action,
	payload,
	fromTabId,
})

export const newReply = (source: MessageSource, data: ResponseMessageData, message: Message): ResponseMessage => ({
	...data,
	messageId: message.messageId,
	fromTabId: message.fromTabId,
	action: message.action,
	target: message.source,
	source,
})

export const eventFromMessage = (message: Message | ResponseMessage): Z3USEvent =>
	new CustomEvent(`z3us.${message.action}`, {
		detail: { data: message.payload, error: (message as ResponseMessage).error },
	})
