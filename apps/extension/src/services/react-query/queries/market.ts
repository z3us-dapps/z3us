import { useQuery } from 'react-query'
import { CoinGeckoService } from '@src/services/coingecko'

const service = new CoinGeckoService()

export const useMarketChart = (currency: string, asset: string, days: number = 14) =>
	useQuery(
		['useMarketChart', currency, asset, days],
		async (): Promise<number[][]> => service.getMarketChart(currency, asset, days),
		{
			enabled: !!currency && !!asset,
		},
	)

export const useSupportedCurrencies = () =>
	useQuery(['useSupportedCurrencies'], async (): Promise<string[]> => service.getSupportedCurrencies())
