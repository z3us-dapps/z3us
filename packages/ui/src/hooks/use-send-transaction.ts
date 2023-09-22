import type { SendTransactionInput, WalletApi } from '@radixdlt/radix-dapp-toolkit'
import { ResultAsync } from 'neverthrow'
import { useCallback } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { useRdt } from './rdt/use-rdt'
import { useZdtState } from './zdt/use-zdt'

const messages = defineMessages({
	error: {
		id: 'hooks.send-transaction.error',
		defaultMessage: 'Failed to submit transaction, please try again.',
	},
})

export const useSendTransaction: () => WalletApi['sendTransaction'] = () => {
	const intl = useIntl()
	const rdt = useRdt()!
	const { isWallet, sendTransaction } = useZdtState()

	return useCallback<typeof rdt.walletApi.sendTransaction>(
		(input: SendTransactionInput) =>
			isWallet
				? ResultAsync.fromPromise(sendTransaction(input), (error: any) => ({
						error: error?.message || intl.formatMessage(messages.error),
				  }))
				: rdt.walletApi.sendTransaction(input),
		[isWallet, rdt, sendTransaction],
	)
}
