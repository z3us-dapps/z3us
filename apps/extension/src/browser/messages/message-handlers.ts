import type { MessageHandlers } from '@src/browser/messages/types';
import { MessageAction } from '@src/browser/messages/types'

async function ping() {
	return true
}

export default {
	[MessageAction.PING]: ping,
} as MessageHandlers
