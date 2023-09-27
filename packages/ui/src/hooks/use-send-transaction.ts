import type { SendTransactionInput, WalletApi } from '@radixdlt/radix-dapp-toolkit'
import { ResultAsync } from 'neverthrow'
import { useCallback } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { KeystoreType } from '../store/types'
import { useRdt } from './rdt/use-rdt'
import { useSharedStore } from './use-store'
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
	const { sendTransaction } = useZdtState()
	const { keystore } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
	}))

	return useCallback<typeof rdt.walletApi.sendTransaction>(
		(input: SendTransactionInput) =>
			keystore.type !== KeystoreType.RADIX_WALLET
				? ResultAsync.fromPromise(sendTransaction(input), (error: any) => {
						console.error(error)
						return {
							error: error?.message || intl.formatMessage(messages.error),
						}
				  })
				: rdt.walletApi.sendTransaction(input),
		[keystore, rdt, sendTransaction],
	)
}
