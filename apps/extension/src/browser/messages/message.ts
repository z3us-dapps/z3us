import { generateId } from '@src/utils/generate-id'

import { Message, MessageAction, MessageSource } from './types'

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
