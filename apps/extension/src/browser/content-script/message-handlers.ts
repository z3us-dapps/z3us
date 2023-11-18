import type { MessageHandlers } from '@src/browser/messages/types'

import { MessageAction } from './types'

async function ping() {
	return true
}

export type MessageTypes = {
	[MessageAction.CONTENT_SCRIPT_PING]: undefined
}

export default {
	[MessageAction.CONTENT_SCRIPT_PING]: ping,
} as MessageHandlers
