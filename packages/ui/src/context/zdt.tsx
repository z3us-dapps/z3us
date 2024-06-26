import type { Account as RadixAccount, Persona as RadixPersona } from '@radixdlt/radix-dapp-toolkit'
import type { Context, ReactNode } from 'react'
import { createContext } from 'react'

import type { SendTransaction } from 'ui/src/hooks/use-send-transaction'
import type { Account, Persona } from 'ui/src/store/types'

export type State = {
	isWallet: boolean
	isUnlocked: boolean
	personas: RadixPersona[]
	accounts: RadixAccount[]
	lock: () => Promise<void>
	unlock: (password: string) => Promise<void>
	getSecret: (combinedKeystoreId: string, password: string) => Promise<string>
	removeSecret: (password: string) => Promise<void>
	confirm: (input: {
		title?: ReactNode
		content: ReactNode
		buttonTitle?: string
		buttonStyleVariant?: string
		ignorePassword?: boolean
	}) => Promise<string>
	sendTransaction: SendTransaction
	buildNewPersonKeyParts: (combinedKeystoreId: string) => Promise<Partial<Persona>>
	buildNewAccountKeyParts: (combinedKeystoreId: string, legacy: boolean) => Promise<Partial<Account>>
	openSidePanel: () => Promise<void>
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
	removeSecret: async () => {
		throw Error('Can not remove secret without wallet!')
	},
	confirm: async () => {
		throw Error('Can not confirm without wallet!')
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
	openSidePanel: async () => {
		throw Error('Can not open side panel!')
	},
}

export const ZdtContext: Context<State> = createContext<State>(defaultState)
