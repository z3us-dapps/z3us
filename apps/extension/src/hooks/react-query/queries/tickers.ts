import { useQuery, useQueries } from 'react-query'
import { Ticker } from '@src/types'
import oci, { TokensResponse as OCITokensResponse } from '@src/services/oci'
import { CoinGeckoService } from '@src/services/coingecko'
// import { BitFinexService } from '@src/services/bitfinex'

const service = new CoinGeckoService()

const getOCITicker = async (tokens: OCITokensResponse, currency: string, asset: string) => {
	if (tokens && tokens.length > 0) {
		const token = tokens.find(_token => _token.ticker === asset.toUpperCase())
		if (token) {
			return {
				asset,
				currency,
				change: +token.price.usd / +token.price.usd_24h,
				last_price: +token.price.usd,
				volume: +token.volume.usd_24h,
			} as Ticker
		}
	}
	return null
}

export const useOCITokens = () =>
	useQuery(['useOCITicker'], async (): Promise<OCITokensResponse> => {
		try {
			return await oci.getTokens()
		} catch (error: any) {
			return []
		}
	})

export const useTicker = (currency: string, asset: string) => {
	const { data: ociTokens, isLoading } = useOCITokens()
	return useQuery(
		['useTicker', currency, asset],
		async (): Promise<Ticker> => {
			try {
				return await service.getTicker(currency, asset)
			} catch (error: any) {
				if (currency.toUpperCase() === 'USD') {
					return await getOCITicker(ociTokens, currency, asset)
				}
				return null
			}
		},
		{
			enabled: !isLoading && !!currency && !!asset,
		},
	)
}

export const useTickers = (currency: string, assets: string[]) => {
	const { data: ociTokens, isLoading } = useOCITokens()
	const queries = assets.map(asset => ({
		queryKey: ['useTicker', currency, asset],
		queryFn: async () => {
			if (!currency || !asset) return null
			try {
				return await service.getTicker(currency, asset)
			} catch (error: any) {
				if (currency.toUpperCase() === 'USD') {
					return await getOCITicker(ociTokens, currency, asset)
				}
				return null
			}
		},
		enabled: !isLoading,
	}))
	return useQueries(queries)
}
