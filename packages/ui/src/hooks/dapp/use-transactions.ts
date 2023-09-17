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
		queryFn: ({ pageParam }) =>
			stream.innerClient.streamTransactions({
				streamTransactionsRequest: { cursor: pageParam, affected_global_entities_filter: addresses },
			}),
		getNextPageParam: lastPage => lastPage.next_cursor,
		// getPreviousPageParam: firstPage => firstPage.previous_cursor,
		enabled: !!stream,
	})

	return data
}
