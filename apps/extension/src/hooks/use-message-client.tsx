import { MessageAction } from '@src/browser/messages/types'
import { MessageClient } from '@src/browser/popup/message-client'

const client = MessageClient()

export const useMessageClient = () => ({
	ping: async () => {
		await client.sendMessage(MessageAction.PING, null)
	},
})
