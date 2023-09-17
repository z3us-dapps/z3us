import type { Account, Persona } from '@radixdlt/radix-dapp-toolkit'
import { Convert, LTSRadixEngineToolkit, type PublicKey } from '@radixdlt/radix-engine-toolkit'
import { useSharedStore } from 'packages/ui/src/hooks/use-store'
import type { AddressBook, AddressIndexes, Keystore } from 'packages/ui/src/store/types'
import { useEffect, useMemo, useState } from 'react'

import { MessageClient } from '@src/browser/app/message-client'
import type { MessageTypes } from '@src/browser/messages/message-handlers'
import { MessageAction } from '@src/browser/messages/types'
import type { Data } from '@src/types/vault'

const client = MessageClient()

export const useMessageClient = () => {
	const { reloadTrigger } = useSharedStore(state => ({
		reloadTrigger: state.reloadSharedStoreAction,
	}))

	const updateCursor = result => {
		reloadTrigger()
		return result
	}

	return useMemo(
		() => ({
			ping: async (): Promise<boolean> => client.sendMessage(MessageAction.PING).then(updateCursor),

			lockVault: async (): Promise<void> => client.sendMessage(MessageAction.VAULT_LOCK).then(updateCursor),
			unlockVault: async (password: string): Promise<void> =>
				client
					.sendMessage(MessageAction.VAULT_UNLOCK, { password } as MessageTypes[MessageAction.VAULT_UNLOCK])
					.then(updateCursor),
			storeInVault: async (keystore: Keystore, data: Data, password: string): Promise<void> =>
				client
					.sendMessage(MessageAction.VAULT_SAVE, {
						keystore,
						data,
						password,
					} as MessageTypes[MessageAction.VAULT_SAVE])
					.then(updateCursor),
			removeFromVault: async (password: string) =>
				client
					.sendMessage(MessageAction.VAULT_REMOVE, { password } as MessageTypes[MessageAction.VAULT_REMOVE])
					.then(updateCursor),
			isVaultUnlocked: async (): Promise<boolean> => client.sendMessage(MessageAction.VAULT_IS_UNLOCKED),

			sign: async (password: string, data: string, index: number = 0): Promise<PublicKey | null> =>
				client
					.sendMessage(MessageAction.SIGN, {
						index,
						password,
						toSign: Convert.Uint8Array.toHexString(Buffer.from(data, 'utf-8')),
					} as MessageTypes[MessageAction.SIGN])
					.then(updateCursor),
			signHash: async (password: string, data: string, index: number = 0): Promise<PublicKey | null> =>
				client
					.sendMessage(MessageAction.SIGN, {
						index,
						password,
						toSign: Convert.Uint8Array.toHexString(LTSRadixEngineToolkit.Utils.hash(Buffer.from(data, 'utf-8'))),
					} as MessageTypes[MessageAction.SIGN])
					.then(updateCursor),

			getPublicKey: async (index: number = 0): Promise<PublicKey | null> =>
				client
					.sendMessage(MessageAction.GET_PUBLIC_KEY, { index } as MessageTypes[MessageAction.GET_PUBLIC_KEY])
					.then(updateCursor),

			getPersonas: async (networkId: number, indexes: AddressIndexes): Promise<Array<Persona>> =>
				client
					.sendMessage(MessageAction.GET_PERSONAS, { networkId, indexes } as MessageTypes[MessageAction.GET_PERSONAS])
					.then(updateCursor),
			getAccounts: async (
				networkId: number,
				indexes: AddressIndexes,
				addressBook: AddressBook,
			): Promise<Array<Account>> =>
				client
					.sendMessage(MessageAction.GET_ACCOUNTS, {
						networkId,
						indexes,
						addressBook,
					} as MessageTypes[MessageAction.GET_ACCOUNTS])
					.then(updateCursor),

			handleRadixMessage: async (message: MessageTypes[MessageAction.RADIX]): Promise<PublicKey | null> =>
				client.sendMessage(MessageAction.RADIX, message as MessageTypes[MessageAction.RADIX]).then(updateCursor),
		}),
		[],
	)
}
