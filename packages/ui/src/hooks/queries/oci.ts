import { useQuery } from '@tanstack/react-query'

import type { Token } from 'ui/src/services/oci'
import oci from 'ui/src/services/oci'

export const useToken = (address: string) =>
	useQuery(
		['oci', 'useToken', address],
		async (): Promise<Token> => {
			try {
				return await oci.getToken(address)
			} catch (error: any) {
				return null
			}
		},
		{ enabled: !!address },
	)

const getFetchTokensQueryFn = async (cursor: number = 0, container: Token[] = []): Promise<Token[]> => {
	try {
		const { data, next_cursor: nextCursor } = await oci.getTokens(cursor)
		const tokens = container.concat(data)
		if (nextCursor !== 0) {
			return await getFetchTokensQueryFn(nextCursor, tokens)
		}
		return tokens
	} catch (error: any) {
		return []
	}
}

export const useTokens = () =>
	useQuery(['oci', 'useTokens'], async (): Promise<{ [key: string]: Token }> => {
		try {
			const allTokens = await getFetchTokensQueryFn()
			return allTokens.reduce((container, token) => ({ ...container, [token.address]: token }), {})
		} catch (error: any) {
			return {}
		}
	})
