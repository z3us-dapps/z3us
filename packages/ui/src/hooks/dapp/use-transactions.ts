import { useInfiniteQuery } from '@tanstack/react-query'

import { useGatewayClient } from './use-gateway-client'

export const useTransactions = () => {
	const { stream } = useGatewayClient()!

	const data = useInfiniteQuery({
		queryKey: ['useTransactions'],
		queryFn: ({ pageParam }) =>
			stream.innerClient.streamTransactions({
				streamTransactionsRequest: { cursor: pageParam },
			}),
		getNextPageParam: lastPage => lastPage.next_cursor,
		getPreviousPageParam: firstPage => firstPage.previous_cursor,
		keepPreviousData: true,
		enabled: !!stream,
	})

	return data
}
