import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import type { SwapResponse, Token } from 'ui/src/services/astrolescent'
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
		},
	)

export const useTokens = () =>
	useQuery(['astrolescent', 'useTokens'], async (): Promise<{ [key: string]: Token }> => {
		try {
			const allTokens = await astrolescent.getTokens()
			return allTokens.reduce((container, token) => ({ ...container, [token.address]: token }), {})
		} catch (error: any) {
			return {}
		}
	})

export const useToken = (address: string) => {
	const { data, isLoading } = useTokens()

	return useMemo(() => ({ data: data?.[address] || null, isLoading }), [data, isLoading])
}
