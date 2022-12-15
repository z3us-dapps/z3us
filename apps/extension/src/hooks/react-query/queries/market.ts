import { useQueries, useQuery } from 'react-query'
import { CoinGeckoService } from '@src/services/coingecko'

const service = new CoinGeckoService()

export const useMarketChart = (currency: string, asset: string, days: number | string = 14) =>
	useQuery(
		['useMarketChart', currency, asset, days],
		async (): Promise<number[][]> => service.getMarketChart(currency, asset, days),
		{
			enabled: !!currency && !!asset,
		},
	)

export const useSupportedCurrencies = () =>
	useQuery(['useSupportedCurrencies'], async (): Promise<string[]> => service.getSupportedCurrencies())

export const useXRDPriceOnDay = (currency: string, date: Date) =>
	useQuery(
		['useXRDPriceOnDay', currency, `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`],
		async (): Promise<number | null> => service.getXRDPriceOnDay(date, currency),
		{
			staleTime: Infinity,
			refetchInterval: false,
			enabled: !!currency && !!date,
		},
	)

export const useXRDPrices = (currency: string, dates: Array<Date>) => {
	const queries = dates.map(date => ({
		queryKey: ['useXRDPriceOnDay', currency, `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`],
		queryFn: async () => {
			try {
				const token = await service.getXRDPriceOnDay(date, currency)
				return token
			} catch (err: any) {
				return null
			}
		},
		enabled: !!currency && !!dates,
		staleTime: Infinity,
	}))
	return useQueries(queries)
}
