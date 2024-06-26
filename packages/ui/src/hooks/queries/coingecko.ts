import { useQuery } from '@tanstack/react-query'

import { CoinGeckoService } from 'ui/src/services/coingecko'
import { TimeFrames } from 'ui/src/types'
import { formatDate } from 'ui/src/utils/date'

const service = new CoinGeckoService()

export const getMarketChartQueryKey = (currency: string, asset: string, days: number | string = 14) => [
	'useMarketChart',
	currency,
	asset,
	days,
]

export const useMarketChart = (currency: string, asset: string, timeFrame: TimeFrames) =>
	useQuery(
		getMarketChartQueryKey(currency, asset, timeFrame),
		async (): Promise<number[][]> => {
			switch (timeFrame) {
				case TimeFrames.WEEK:
					return service.getMarketChart(currency, asset, 7)
				case TimeFrames.MONTH:
					return service.getMarketChart(currency, asset, 30)
				case TimeFrames.THREE_MONTHS:
					return service.getMarketChart(currency, asset, 90)
				case TimeFrames.SIX_MONTHS:
					return service.getMarketChart(currency, asset, 180)
				case TimeFrames.YEAR:
					return service.getMarketChart(currency, asset, 256)
				case TimeFrames.FIVE_YEARS:
					return service.getMarketChart(currency, asset, 1825)
				default:
					return []
			}
		},
		{
			enabled: !!currency && !!asset && !!timeFrame,
		},
	)

export const getSupportedCurrenciesQueryKey = () => ['useSupportedCurrencies']

export const useSupportedCurrencies = () =>
	useQuery(getSupportedCurrenciesQueryKey(), async (): Promise<string[]> => service.getSupportedCurrencies())

export const coinPriceOnDayQuery = (currency: string, date: Date) => ({
	queryKey: ['useXRDPriceOnDay', currency.toLowerCase(), formatDate(date)],
	queryFn: () => service.getCoinPriceOnDay(date, currency),
	staleTime: Infinity,
})

export const currentCoinPriceQuery = (currency: string) => ({
	queryKey: ['useXRDCurrentPrice', currency.toLowerCase()],
	queryFn: () => service.getCoinData(currency),
	staleTime: 1000 * 60 * 5, // 5 minutes
})

export const useXRDPriceOnDay = (currency: string, date: Date) => useQuery(coinPriceOnDayQuery(currency, date))

export const useXRDCurrentPrice = (currency: string) => useQuery(currentCoinPriceQuery(currency))
