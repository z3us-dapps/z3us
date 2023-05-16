import { MessageAction } from '@src/browser/messages/types'
import { MessageClient } from '@src/browser/popup/message-client'

const client = MessageClient()

export const useMessageClient = () => ({
	port: client.port,
	ping: async () => {
		await client.sendMessage(MessageAction.PING, null)
	},
	radix: async (payload) => {
		await client.sendMessage(MessageAction.RADIX, payload)
	},
})
