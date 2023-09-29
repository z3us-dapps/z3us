import type { Message, MessageHandlers } from '@src/browser/messages/types'

import { Z3USEvent } from '../inpage/types'
import { MessageAction } from './types'

async function ping() {
	return true
}

export interface CancelInteractionMessage {
	interactionId: string
}

async function cancelInteraction(message: Message) {
	window.dispatchEvent(
		new CustomEvent(`z3us.${MessageAction.APP_INTERACTION_CANCEL}`, {
			detail: { data: message.payload },
		}) satisfies Z3USEvent,
	)
}

export type MessageTypes = {
	[MessageAction.APP_PING]: undefined
	[MessageAction.APP_INTERACTION_CANCEL]: CancelInteractionMessage
}

export default {
	[MessageAction.APP_PING]: ping,
	[MessageAction.APP_INTERACTION_CANCEL]: cancelInteraction,
} as MessageHandlers
