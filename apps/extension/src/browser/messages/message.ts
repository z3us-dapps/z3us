import { generateId } from '@src/utils/generate-id'

import { Message, MessageAction, ResponseMessage, MessageSource } from './types'

export const newMessage = (
	action: MessageAction,
	source: MessageSource,
	target: MessageSource,
	payload: any,
	fromTabId?: number,
): Message => ({
	messageId: `${action}-${generateId()}`,
	target,
	source,
	action,
	payload,
	fromTabId,
})

export const newReply = (
	message: Message,
	source: MessageSource,
	target: MessageSource,
	payload: any,
): ResponseMessage => ({
	...message,
	request: message.payload,
	target,
	source,
	payload,
})