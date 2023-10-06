import { useQueries, useQuery } from '@tanstack/react-query'

import { CoinGeckoService } from 'ui/src/services/coingecko'

const service = new CoinGeckoService()

export const getMarketChartQueryKey = (currency: string, asset: string, days: number | string = 14) => [
	'useMarketChart',
	currency,
	asset,
	days,
]

export const useMarketChart = (currency: string, asset: string, days: number | string = 14) =>
	useQuery(
		getMarketChartQueryKey(currency, asset, days),
		async (): Promise<number[][]> => service.getMarketChart(currency, asset, days),
		{
			enabled: !!currency && !!asset,
		},
	)

export const getSupportedCurrenciesQueryKey = () => ['useSupportedCurrencies']

export const useSupportedCurrencies = () =>
	useQuery(getSupportedCurrenciesQueryKey(), async (): Promise<string[]> => service.getSupportedCurrencies())

export const getXRDPriceOnDayQueryKey = (currency: string, date: Date) => [
	'useXRDPriceOnDay',
	currency,
	`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`,
]

export const useXRDPriceOnDay = (currency: string, date: Date) =>
	useQuery(
		getXRDPriceOnDayQueryKey(currency, date),
		async (): Promise<number | null> => service.getXRDPriceOnDay(date, currency),
		{
			refetchInterval: false,
			enabled: !!currency && !!date,
		},
	)

export const useXRDPrices = (currency: string, dates: Array<Date>) => {
	const queries = dates.map(date => ({
		queryKey: getXRDPriceOnDayQueryKey(currency, date),
		queryFn: async () => {
			try {
				return await service.getXRDPriceOnDay(date, currency)
			} catch (err: any) {
				return null
			}
		},
		enabled: !!currency && !!dates,
	}))
	return useQueries({ queries })
}
