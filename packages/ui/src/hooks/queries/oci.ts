import { useQuery } from '@tanstack/react-query'

import type { Token } from 'ui/src/services/oci'
import oci from 'ui/src/services/oci'

export const useToken = (symbol: string) =>
	useQuery(['oci', 'useToken', symbol], async (): Promise<Token> => {
		try {
			return await oci.getToken(symbol)
		} catch (error: any) {
			return null
		}
	})

const getFetchTokensQueryFn = async (cursor: number = 0, container: Token[] = []): Promise<Token[]> => {
	try {
		const { data, next_cursor: nextCursor } = await oci.getTokens(cursor)
		if (nextCursor !== 0) {
			return await getFetchTokensQueryFn(nextCursor, [...container, ...data])
		}
		return data
	} catch (error: any) {
		return []
	}
}

export const useTokens = () =>
	useQuery(['oci', 'useTokens'], async (): Promise<{ [key: string]: Token }> => {
		try {
			const allTokens = await getFetchTokensQueryFn()
			return allTokens.reduce((container, token) => ({ ...container, [token.symbol.toLowerCase()]: token }), {})
		} catch (error: any) {
			return {}
		}
	})
