import { useQuery } from 'react-query'
import { CoinGeckoService } from '@src/services/coingecko'
// import { BitFinexService } from '@src/services/bitfinex'

export const USD = 'USD'

const service = new CoinGeckoService()

export const useMarketChart = (asset: string) =>
	useQuery(['useMarketChart', asset], async (): Promise<number[][]> => service.getMarketChart(USD, asset), {
		enabled: !!asset,
	})
