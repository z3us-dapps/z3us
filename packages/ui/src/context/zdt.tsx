import type {
	Account as RadixAccount,
	Persona as RadixPersona,
	SendTransactionInput,
	TransactionStatus,
} from '@radixdlt/radix-dapp-toolkit'
import type { Context } from 'react'
import { createContext } from 'react'

import type { Account, Persona } from 'ui/src/store/types'

export type State = {
	isWallet: boolean
	isUnlocked: boolean
	personas: RadixPersona[]
	accounts: RadixAccount[]
	sendTransaction: (input: SendTransactionInput) => Promise<{
		transactionIntentHash: string
		status: TransactionStatus
	}>
	lock: () => Promise<void>
	unlock: (password: string) => Promise<void>
	getSecret: (password: string) => Promise<string>
	buildNewPersonKeyParts: () => Promise<Partial<Persona>>
	buildNewAccountKeyParts: (legacy: boolean) => Promise<Partial<Account>>
}

export const defaultState: State = {
	isWallet: false,
	isUnlocked: false,
	personas: [],
	accounts: [],
	unlock: async () => {},
	lock: async () => {},
	getSecret: async () => {
		throw Error('Can not get secret without wallet!')
	},
	sendTransaction: async () => {
		throw Error('Incorrect method used!')
	},
	buildNewPersonKeyParts: async () => {
		throw Error('Can not derive persona keys without wallet!')
	},
	buildNewAccountKeyParts: async () => {
		throw Error('Can not derive account keys without wallet!')
	},
}

export const ZdtContext: Context<State> = createContext<State>(defaultState)
