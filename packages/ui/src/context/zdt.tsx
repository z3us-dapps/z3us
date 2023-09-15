import type { Account, Persona, SendTransactionInput, TransactionStatus } from '@radixdlt/radix-dapp-toolkit'
import type { Context } from 'react'
import { createContext } from 'react'

export type State = {
	isWallet: boolean
	isUnlocked: boolean
	personas: Persona[]
	accounts: Account[]
	lock: () => Promise<void>
	unlock: (password: string) => Promise<void>
	sendTransaction: (input: SendTransactionInput) => Promise<{
		transactionIntentHash: string
		status: TransactionStatus
	}>
}

export const defaultState: State = {
	isWallet: false,
	isUnlocked: false,
	personas: [],
	accounts: [],
	unlock: async () => {},
	lock: async () => {},
	sendTransaction: async () => {
		throw Error('Incorrect method used!')
	},
}

export const ZdtContext: Context<State> = createContext<State>(defaultState)
