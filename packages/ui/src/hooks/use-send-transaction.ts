import type { SendTransactionInput, WalletApi } from '@radixdlt/radix-dapp-toolkit'
import { ResultAsync } from 'neverthrow'
import { useCallback } from 'react'

import { useRdt } from './rdt/use-rdt'
import { useZdtState } from './zdt/use-zdt'

export const useSendTransaction: () => WalletApi['sendTransaction'] = () => {
	const rdt = useRdt()!
	const { isWallet, sendTransaction } = useZdtState()

	return useCallback<typeof rdt.walletApi.sendTransaction>(
		(input: SendTransactionInput) =>
			isWallet
				? ResultAsync.fromPromise(sendTransaction(input), (error: any) => ({ error: `${error?.message || error}` }))
				: rdt.walletApi.sendTransaction(input),
		[isWallet, rdt, sendTransaction],
	)
}
