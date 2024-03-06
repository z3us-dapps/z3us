import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import type { SwapResponse } from 'ui/src/services/astrolescent'
import astrolescent from 'ui/src/services/astrolescent'

export const useSwapPreview = (account: string, from: string, to: string, side: 'send' | 'receive', amount: number) =>
	useQuery(
		['astrolescent', 'useSwapPreview', from, to, side, amount],
		async (): Promise<SwapResponse> => astrolescent.getSwap(account, from, to, side, amount.toString()),
		{
			enabled: !!from && !!to && amount > 0,
			staleTime: 30 * 1000,
			refetchInterval: 30 * 1000,
			retry: false,
			keepPreviousData: false,
		},
	)

export const tokensQuery = {
	queryKey: ['astrolescent', 'useTokens'],
	queryFn: astrolescent.getTokens,
	staleTime: 3 * 24 * 60 * 60 * 1000, // cache for 3 day
	refetchInterval: 15 * 60 * 1000, // automatically refetch every minute
}

export const useTokens = () => useQuery(tokensQuery)

export const useToken = (address: string) => {
	const { data, isLoading } = useTokens()

	return useMemo(() => ({ data: data?.[address] || null, isLoading }), [data, isLoading])
}
