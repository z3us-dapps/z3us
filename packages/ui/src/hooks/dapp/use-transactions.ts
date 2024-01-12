import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

import { useGatewayClient } from './use-gateway-client'
import { useNetworkId } from './use-network'

export const useTransactionStatus = (intent_hash: string) => {
	const networkId = useNetworkId()
	const { state, transaction } = useGatewayClient()!

	return useQuery({
		queryKey: ['useTransactionStatus', networkId, intent_hash],
		queryFn: () =>
			transaction.innerClient.transactionStatus({
				transactionStatusRequest: { intent_hash },
			}),
		enabled: !!state && !!intent_hash,
	})
}

export const useTransaction = (intent_hash: string) => {
	const networkId = useNetworkId()
	const { state, transaction } = useGatewayClient()!

	return useQuery({
		queryKey: ['useTransaction', networkId, intent_hash],
		queryFn: () =>
			transaction.innerClient.transactionCommittedDetails({
				transactionCommittedDetailsRequest: {
					intent_hash,
					opt_ins: {
						raw_hex: true,
						receipt_fee_summary: true,
						receipt_fee_source: true,
						receipt_fee_destination: true,
						receipt_costing_parameters: true,
						receipt_events: true,
						affected_global_entities: true,
						balance_changes: true,
					},
				},
			}),
		enabled: !!state && !!intent_hash,
	})
}

export const useTransactions = (addresses: string[]) => {
	const networkId = useNetworkId()
	const { stream } = useGatewayClient()!

	const data = useInfiniteQuery({
		queryKey: ['useTransactions', networkId, addresses],
		queryFn: async ({ pageParam }) => {
			const responses = await Promise.all(
				addresses.map((address, idx) =>
					pageParam?.[idx].next_cursor === null
						? { items: [], next_cursor: null, ledger_state: null }
						: stream.innerClient.streamTransactions({
								streamTransactionsRequest: {
									opt_ins: {
										balance_changes: true,
									},
									affected_global_entities_filter: [address],
									limit_per_page: 5,
									cursor: pageParam?.[idx].next_cursor || null,
									at_ledger_state: pageParam?.[idx].next_cursor ? pageParam?.[idx].ledger_state : null,
								},
						  }),
				),
			)

			const aggregatedResult = responses.reduce(
				(accumulator, response) => {
					accumulator.items.push(...response.items)
					accumulator.pageParams.push({
						next_cursor: response.next_cursor,
						ledger_state: response.ledger_state,
					})
					return accumulator
				},
				{ items: [], pageParams: [] },
			)

			return aggregatedResult
		},
		getNextPageParam: lastPage =>
			lastPage.pageParams?.filter(({ next_cursor }) => next_cursor !== null).length > 0
				? lastPage.pageParams
				: undefined,
		enabled: !!stream,
	})

	return data
}
