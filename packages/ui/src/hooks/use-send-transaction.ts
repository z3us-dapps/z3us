import type { SendTransactionInput, WalletApi } from '@radixdlt/radix-dapp-toolkit'
import { useCallback } from 'react'

import { useRdt } from './rdt/use-rdt'
import { useSharedStore } from './use-store'

export const useSendTransaction: () => WalletApi['sendTransaction'] = () => {
	const rdt = useRdt()!
	const { keystore } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
	}))

	return useCallback<typeof rdt.walletApi.sendTransaction>(
		(input: SendTransactionInput) => rdt.walletApi.sendTransaction(input),
		[keystore, rdt],
	)
}
