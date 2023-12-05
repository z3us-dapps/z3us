import type { SendTransactionInput, TransactionStatus } from '@radixdlt/radix-dapp-toolkit'
import { useCallback } from 'react'

import { useRdt } from './rdt/use-rdt'
import { useSharedStore } from './use-store'

export type SendTransactionResult = {
	transactionIntentHash: string
	status: TransactionStatus
}

export type SendTransaction = (input: SendTransactionInput) => Promise<SendTransactionResult>

export const useSendTransaction: () => SendTransaction = () => {
	const rdt = useRdt()!
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
					}
				})
			}),
		[keystore, rdt],
	)
}
