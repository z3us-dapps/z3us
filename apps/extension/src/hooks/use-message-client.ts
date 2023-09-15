import type { Account, Persona } from '@radixdlt/radix-dapp-toolkit'
import { Convert, LTSRadixEngineToolkit, type PublicKey } from '@radixdlt/radix-engine-toolkit'
import type { AddressBook, AddressIndexes, Keystore } from 'packages/ui/src/store/types'

import { MessageClient } from '@src/browser/app/message-client'
import type { MessageTypes } from '@src/browser/messages/message-handlers'
import { MessageAction } from '@src/browser/messages/types'
import type { Data } from '@src/types/vault'

const client = MessageClient()

export const useMessageClient = () => ({
	port: client.port,

	ping: async (): Promise<boolean> => client.sendMessage(MessageAction.PING),

	lockVault: async (): Promise<void> => client.sendMessage(MessageAction.VAULT_LOCK),
	unlockVault: async (password: string): Promise<void> =>
		client.sendMessage(MessageAction.VAULT_UNLOCK, { password } as MessageTypes[MessageAction.VAULT_UNLOCK]),
	storeInVault: async (keystore: Keystore, data: Data, password: string): Promise<void> =>
		client.sendMessage(MessageAction.VAULT_SAVE, {
			keystore,
			data,
			password,
		} as MessageTypes[MessageAction.VAULT_SAVE]),
	removeFromVault: async (password: string) =>
		client.sendMessage(MessageAction.VAULT_REMOVE, { password } as MessageTypes[MessageAction.VAULT_REMOVE]),

	sign: async (password: string, data: string, index: number = 0): Promise<PublicKey | null> =>
		client.sendMessage(MessageAction.SIGN, {
			index,
			password,
			toSign: Convert.Uint8Array.toHexString(Buffer.from(data, 'utf-8')),
		} as MessageTypes[MessageAction.SIGN]),
	signHash: async (password: string, data: string, index: number = 0): Promise<PublicKey | null> =>
		client.sendMessage(MessageAction.SIGN, {
			index,
			password,
			toSign: Convert.Uint8Array.toHexString(LTSRadixEngineToolkit.Utils.hash(Buffer.from(data, 'utf-8'))),
		} as MessageTypes[MessageAction.SIGN]),

	getPublicKey: async (index: number = 0): Promise<PublicKey | null> =>
		client.sendMessage(MessageAction.GET_PUBLIC_KEY, { index } as MessageTypes[MessageAction.GET_PUBLIC_KEY]),

	getPersonas: async (networkId: number, indexes: AddressIndexes): Promise<Array<Persona>> =>
		client.sendMessage(MessageAction.GET_PERSONAS, { networkId, indexes } as MessageTypes[MessageAction.GET_PERSONAS]),
	getAccounts: async (networkId: number, indexes: AddressIndexes, addressBook: AddressBook): Promise<Array<Account>> =>
		client.sendMessage(MessageAction.GET_ACCOUNTS, {
			networkId,
			indexes,
			addressBook,
		} as MessageTypes[MessageAction.GET_ACCOUNTS]),

	handleRadixMessage: async (message: MessageTypes[MessageAction.RADIX]): Promise<PublicKey | null> =>
		client.sendMessage(MessageAction.RADIX, message as MessageTypes[MessageAction.RADIX]),
})
