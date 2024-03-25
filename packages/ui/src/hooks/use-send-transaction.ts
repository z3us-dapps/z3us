import type { SendTransactionInput, TransactionStatus } from '@radixdlt/radix-dapp-toolkit'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

import { useNetworkId } from './dapp/use-network'
import { useRdt } from './rdt/use-rdt'
import { useSharedStore } from './use-store'

export type SendTransactionResult = {
	transactionIntentHash: string
	status: TransactionStatus
}

export type SendTransaction = (input: SendTransactionInput) => Promise<SendTransactionResult>

export const useSendTransaction: () => SendTransaction = () => {
	const rdt = useRdt()!
	const queryClient = useQueryClient()
	const networkId = useNetworkId()
	const { keystore } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
	}))

	return useCallback(
		(input: SendTransactionInput): Promise<SendTransactionResult> =>
			new Promise((resolve, reject) => {
				rdt.walletApi.sendTransaction(input).then(res => {
					if (res.isErr()) {
						reject(res.error)
					} else {
						resolve(res.value)
						queryClient.invalidateQueries(['useBalances', networkId])
						queryClient.invalidateQueries(['useAccountValues', networkId])
						queryClient.invalidateQueries(['useAccountNftVaults', networkId])
						queryClient.invalidateQueries(['useTransactions', networkId])
					}
				})
			}),
		[keystore, rdt],
	)
}
