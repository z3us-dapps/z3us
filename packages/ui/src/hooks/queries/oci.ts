/* eslint-disable no-case-declarations */
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
			const now = new Date()
			switch (timeFrame) {
				case TimeFrames.WEEK:
					const weekAgo = new Date()
					weekAgo.setDate(weekAgo.getDate() - 1)
					return oci.getUdfHistory(
						address,
						'240',
						Math.round(weekAgo.getTime() / 1000),
						Math.round(now.getTime() / 1000),
					)
				case TimeFrames.MONTH:
					const monthAgo = new Date()
					monthAgo.setMonth(monthAgo.getMonth() - 1)
					return oci.getUdfHistory(
						address,
						'720',
						Math.round(monthAgo.getTime() / 1000),
						Math.round(now.getTime() / 1000),
					)
				case TimeFrames.THREE_MONTHS:
					const threeMonthsAgo = new Date()
					threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)
					return oci.getUdfHistory(
						address,
						'1D',
						Math.round(threeMonthsAgo.getTime() / 1000),
						Math.round(now.getTime() / 1000),
					)
				case TimeFrames.SIX_MONTHS:
					const sixMonthsAgo = new Date()
					sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
					return oci.getUdfHistory(
						address,
						'3D',
						Math.round(sixMonthsAgo.getTime() / 1000),
						Math.round(now.getTime() / 1000),
					)
				case TimeFrames.YEAR:
					const yearAgo = new Date()
					yearAgo.setUTCFullYear(yearAgo.getUTCFullYear() - 1)
					return oci.getUdfHistory(address, 'W', Math.round(yearAgo.getTime() / 1000), Math.round(now.getTime() / 1000))
				case TimeFrames.FIVE_YEARS:
					const fiveYearsAgo = new Date()
					fiveYearsAgo.setUTCFullYear(yearAgo.getUTCFullYear() - 5)
					return oci.getUdfHistory(
						address,
						'M',
						Math.round(fiveYearsAgo.getTime() / 1000),
						Math.round(now.getTime() / 1000),
					)
				default:
					throw new Error(`Invalid time frame: ${timeFrame}`)
			}
		},
		{
			enabled: !!address && !!timeFrame,
		},
	)
