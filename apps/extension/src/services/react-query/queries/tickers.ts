import { useQuery, useQueries } from 'react-query'
import { Ticker } from '@src/types'
import { CoinGeckoService } from '@src/services/coingecko'
// import { BitFinexService } from '@src/services/bitfinex'

export const USD = 'USD'

const service = new CoinGeckoService()

export const useUSDTicker = (asset: string) =>
	useQuery(['useUSDTicker', asset], async (): Promise<Ticker> => service.getTicker(USD, asset), {
		enabled: !!asset,
	})

export const useUSDTickers = (assets: string[]) => {
	const queries = assets.map(asset => ({
		queryKey: ['useUSDTicker', asset],
		queryFn: async () => {
			try {
				return await service.getTicker(USD, asset)
			} catch (error: any) {
				return null
			}
			return null
		},
	}))
	return useQueries(queries)
}
