import type { SendTransactionInput } from '@radixdlt/radix-dapp-toolkit'
import React from 'react'

export type ContextValues = {
	onSubmit: (input: SendTransactionInput) => void
}

export const Context = React.createContext<ContextValues>({
	onSubmit: () => {},
})
