import { useQuery, useQueries } from 'react-query'
import { BitFinexService } from '@src/services/bitfinex'
import { Ticker } from '@src/types'

export const USD = 'USD'

const service = new BitFinexService()

export const useUSDTicker = (asset: string) =>
	useQuery(['useUSDTicker', asset], async (): Promise<Ticker> => service.getTicker(USD, asset), {
		enabled: !!asset,
	})

export const useUSDTickers = (assets: string[]) => {
	const queries = assets.map(asset => ({
		queryKey: ['useUSDTicker', asset],
		queryFn: async () => {
			try {
				const ticker = await service.getTicker(USD, asset)
				return ticker
			} catch (err: any) {
				return null
			}
			return null
		},
	}))
	return useQueries(queries)
}
