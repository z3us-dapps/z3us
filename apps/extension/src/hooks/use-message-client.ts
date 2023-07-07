import { LTSRadixEngineToolkit, type PublicKey } from '@radixdlt/radix-engine-toolkit'
import type { Keystore } from 'packages/ui/src/store/types'

import { MessageClient } from '@src/browser/app/message-client'
import { MessageAction } from '@src/browser/messages/types'
import type { Data } from '@src/types/vault'

const client = MessageClient()

export const useMessageClient = () => ({
	port: client.port,

	ping: async (): Promise<boolean> => client.sendMessage(MessageAction.PING),

	unlockVault: async (password: string): Promise<void> => client.sendMessage(MessageAction.VAULT_UNLOCK, { password }),
	storeInVault: async (keystore: Keystore, data: Data, password: string): Promise<void> =>
		client.sendMessage(MessageAction.VAULT_SAVE, { keystore, data, password }),
	removeFromVault: async (password: string) => client.sendMessage(MessageAction.VAULT_REMOVE, { password }),

	getPublicKey: async (): Promise<PublicKey.PublicKey | null> => client.sendMessage(MessageAction.GET_PUBLIC_KEY),
	sign: async (password: string, data: string): Promise<PublicKey.PublicKey | null> =>
		client.sendMessage(MessageAction.SIGN, {
			password,
			hashToSign: LTSRadixEngineToolkit.Utils.hash(Buffer.from(data, 'hex')),
		}),
})
