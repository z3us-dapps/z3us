import { useQuery, useQueries } from 'react-query'
import { Ticker } from '@src/types'
import oci, { TokensResponse as OCITokensResponse } from '@src/services/oci'
// import dsor, { TokensResponse as DSORTokensResponse } from '@src/services/dsor'
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
				change: (+token.price.usd / +token.price.usd_24h) || 0,
				last_price: +token.price.usd || 0,
				volume: +token.volume.usd_24h || 0,
			} as Ticker
		}
	}
	return null
}

export const useOCITicker = () =>
	useQuery(['useOCITicker'], async (): Promise<OCITokensResponse> => {
		try {
			return await oci.getTokens()
		} catch (error: any) {
			return []
		}
	})

// const getDSORTicker = async (response: DSORTokensResponse, currency: string, asset: string) => {
// 	const { tokens } = response
// 	if (tokens && tokens.length > 0) {
// 		const token = tokens.find(_token => _token.symbol.toUpperCase() === asset.toUpperCase())
// 		if (token) {
// 			console.log(currency, asset, token.price_usd, token.volume_24.total, token.price_usd / token.volume_24.total)
// 			return {
// 				asset,
// 				currency,
// 				change: token.price_usd / token.price_24.total || 0,
// 				last_price: token.price_usd,
// 				volume: token.volume_24.total,
// 			} as Ticker
// 		}
// 	}
// 	return null
// }

// export const useDSORTicker = () =>
// 	useQuery(['useDSORTicker'], async (): Promise<DSORTokensResponse> => {
// 		try {
// 			return await dsor.getTokens()
// 		} catch (error: any) {
// 			return { tokens: [] }
// 		}
// 	})

export const useTicker = (currency: string, asset: string) => {
	// const { data: dsorTokens, isLoading } = useDSORTicker()
	const { data: ociTickers, isLoading } = useOCITicker()
	return useQuery(
		['useTicker', currency, asset],
		async (): Promise<Ticker> => {
			try {
				return await service.getTicker(currency, asset)
			} catch (error: any) {
				if (currency.toUpperCase() === 'USD') {
					return await getOCITicker(ociTickers, currency, asset)
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
	// const { data: dsorTokens, isLoading } = useDSORTicker()
	const { data: ociTickers, isLoading } = useOCITicker()
	const queries = assets.map(asset => ({
		queryKey: ['useTicker', currency, asset],
		queryFn: async () => {
			if (!currency || !asset) return null
			try {
				return await service.getTicker(currency, asset)
			} catch (error: any) {
				if (currency.toUpperCase() === 'USD') {
					return await getOCITicker(ociTickers, currency, asset)
				}
				return null
			}
		},
		enabled: !isLoading,
	}))
	return useQueries(queries)
}
