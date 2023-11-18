import { useQuery } from '@tanstack/react-query'

import type { Token, UdfHistory } from 'ui/src/services/oci'
import oci from 'ui/src/services/oci'
import { TimeFrames } from 'ui/src/types'

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

export const useUsfConfig = () => useQuery(['oci', 'useUsfConfig'], oci.getUdfConfig)

export const useUsfHistory = (address: string, timeFrame: TimeFrames) =>
	useQuery(
		['oci', 'useUsfHistory', address, timeFrame],
		async (): Promise<UdfHistory> => {
			const from = new Date()
			const now = new Date()
			switch (timeFrame) {
				case TimeFrames.WEEK:
					from.setDate(from.getDate() - 1)
					break
				case TimeFrames.MONTH:
					from.setMonth(from.getMonth() - 1)
					break
				case TimeFrames.THREE_MONTHS:
					from.setMonth(from.getMonth() - 3)
					break
				case TimeFrames.SIX_MONTHS:
					from.setMonth(from.getMonth() - 6)
					break
				case TimeFrames.YEAR:
					from.setUTCFullYear(from.getUTCFullYear() - 1)
					break
				case TimeFrames.FIVE_YEARS:
					from.setUTCFullYear(from.getUTCFullYear() - 5)
					break
				default:
					from.setMonth(from.getMonth() - 3)
			}

			return oci.getUdfHistory(address, '1D', Math.round(from.getTime() / 1000), Math.round(now.getTime() / 1000))
		},
		{
			enabled: !!address && !!timeFrame,
		},
	)
