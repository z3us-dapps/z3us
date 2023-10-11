import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

import { useGatewayClient } from './use-gateway-client'
import { useNetworkId } from './use-network-id'

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
		queryKey: ['useTransactions', networkId, ...addresses],
		queryFn: async ({ pageParam }) => {
			const responses = await Promise.all(
				addresses.map((address, idx) =>
					pageParam?.[idx] === null
						? { items: [], next_cursor: null }
						: stream.innerClient.streamTransactions({
								streamTransactionsRequest: { cursor: pageParam?.[idx], affected_global_entities_filter: [address] },
						  }),
				),
			)

			const aggregatedResult = responses.reduce(
				(accumulator, response) => {
					accumulator.items.push(...response.items)
					accumulator.next_cursors.push(response.next_cursor || null)
					return accumulator
				},
				{ items: [], next_cursors: [] },
			)

			return aggregatedResult
		},
		getNextPageParam: lastPage =>
			lastPage.next_cursors?.filter(cursor => cursor !== null).length > 0 ? lastPage.next_cursors : undefined,
		// getPreviousPageParam: firstPage => firstPage.previous_cursor,
		enabled: !!stream,
	})

	return data
}
