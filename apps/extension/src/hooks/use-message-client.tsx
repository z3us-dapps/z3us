import { MessageClient } from '@src/browser/app/message-client'
import { MessageAction } from '@src/browser/messages/types'

const client = MessageClient()

export const useMessageClient = () => ({
	port: client.port,
	ping: async () => {
		await client.sendMessage(MessageAction.PING, null)
	},
})
