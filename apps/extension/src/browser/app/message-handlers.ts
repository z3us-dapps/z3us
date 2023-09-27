import type { MessageHandlers } from '@src/browser/messages/types'

import { MessageAction } from './types'

async function ping() {
	return true
}

export type MessageTypes = {
	[MessageAction.APP_PING]: undefined
}

export default {
	[MessageAction.APP_PING]: ping,
} as MessageHandlers
