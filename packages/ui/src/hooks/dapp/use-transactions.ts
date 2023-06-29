import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import type { SelectedAddresses } from '../../types/types'
import { useGatewayClient } from './use-gateway-client'
import { useRdtState } from './use-rdt-state'

export const useTransactionStatus = (intent_hash_hex: string) => {
	const { state, transaction } = useGatewayClient()!

	return useQuery({
		queryKey: ['useTransactionStatus', intent_hash_hex],
		queryFn: () =>
			transaction.innerClient.transactionStatus({
				transactionStatusRequest: { intent_hash_hex },
			}),
		enabled: !!state && !!intent_hash_hex,
	})
}

export const useTransaction = (intent_hash_hex: string) => {
	const { state, transaction } = useGatewayClient()!

	return useQuery({
		queryKey: ['useTransaction', intent_hash_hex],
		queryFn: () =>
			transaction.innerClient.transactionCommittedDetails({
				transactionCommittedDetailsRequest: { intent_hash_hex },
			}),
		enabled: !!state && !!intent_hash_hex,
	})
}

// const fakeTransaction: CommittedTransactionInfo & {isLoading: boolean} = {
// 	isLoading: true,
// 	transaction_status: 'CommittedSuccess',
// 	state_version: 19410318,
// 	payload_hash_hex: 'b93d4a3ad8a0da7b855f39d4701426ca2a7b1ac4e50c61d7feaeac9a071519ae',
// 	intent_hash_hex: '9821cfe746d5b1f661f245e8da274fdb73b58c8cbed79006f617eb39fe9c6860',
// 	confirmed_at: new Date('2023-06-26T08:57:47.622Z'),
// }

// const placeholderData: StreamTransactionsResponse = {
// 	ledger_state: {
// 		network: 'fake',
// 		state_version: 19415441,
// 		proposer_round_timestamp: '2023-06-26T10:03:27.022Z',
// 		epoch: 11081,
// 		round: 1186,
// 	},
// 	next_cursor: 'eyJ2IjoxOTQxMDIxNX0=',
// 	items: [fakeTransaction, fakeTransaction, fakeTransaction, fakeTransaction],
// }

export const useTransactions = (selected: SelectedAddresses = null) => {
	const { stream } = useGatewayClient()!
	const { accounts = [] } = useRdtState()!

	const keys = Object.keys(selected || {})

	const addresses = useMemo(
		() => accounts.map(({ address }) => address).filter(address => !selected || !!selected[address]),
		[keys],
	)

	const data = useInfiniteQuery({
		queryKey: ['useTransactions', ...keys],
		queryFn: ({ pageParam }) =>
			stream.innerClient.streamTransactions({
				streamTransactionsRequest: { cursor: pageParam, affected_global_entities_filter: addresses },
			}),
		getNextPageParam: lastPage => lastPage.next_cursor,
		getPreviousPageParam: firstPage => firstPage.previous_cursor,
		enabled: !!stream,
		// placeholderData,
	})

	return data
}
