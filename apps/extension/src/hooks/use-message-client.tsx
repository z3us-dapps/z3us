import { MessageClient } from '@src/browser/app/message-client'
import { MessageAction } from '@src/browser/messages/types'
import type { Data } from '@src/types/vault'

const client = MessageClient()

export const useMessageClient = () => ({
	port: client.port,

	ping: async (): Promise<boolean> => client.sendMessage(MessageAction.PING, null),

	getFromVault: async (password?: string): Promise<Data | null> =>
		client.sendMessage(MessageAction.VAULT_SAVE, { password }),
	storeInVault: async (data: Data, password: string): Promise<Data> =>
		client.sendMessage(MessageAction.VAULT_GET, { data, password }),
	removeFromVault: async (password: string) => client.sendMessage(MessageAction.VAULT_REMOVE, { password }),
})
