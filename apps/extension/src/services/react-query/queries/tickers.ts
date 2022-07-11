import { useQuery, useQueries } from 'react-query'
import { Ticker } from '@src/types'
import { CoinGeckoService } from '@src/services/coingecko'
// import { BitFinexService } from '@src/services/bitfinex'

const service = new CoinGeckoService()

export const useTicker = (currency: string, asset: string) =>
	useQuery(['useTicker', currency, asset], async (): Promise<Ticker> => service.getTicker(currency, asset), {
		enabled: !!currency && !!asset,
	})

export const useTickers = (currency: string, assets: string[]) => {
	const queries = assets.map(asset => ({
		queryKey: ['useTicker', currency, asset],
		queryFn: async () => {
			if (!currency || !asset) return null
			try {
				return await service.getTicker(currency, asset)
			} catch (error: any) {
				return null
			}
		},
	}))
	return useQueries(queries)
}
