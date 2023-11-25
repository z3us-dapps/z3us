import { useMemo } from 'react'

import { useToken as useAstrolescentToken, useTokens as useAstrolescentTokens } from './astrolescent'
import { useToken as useOciToken, useTokens as useOciTokens } from './oci'

export type Token = {
	address: string
	symbol: string
	name: string
	price: number
	change: number
	increase: number
}

export const useTokens = () => {
	const { data: astrolescentTokens, isLoading: isLoadingAstrolescent } = useAstrolescentTokens()
	const { data: ociTokens, isLoading: isLoadingOci } = useOciTokens()

	return useMemo(
		() => ({
			isLoading: isLoadingAstrolescent || isLoadingOci,
			data: {
				...(ociTokens || {}),
				...Object.values(ociTokens || {}).reduce((container, token) => {
					const tokenPriceNow = parseFloat(token?.price?.usd.now) || 0
					const tokenPrice24h = parseFloat(token?.price?.usd['24h']) || 0
					const change = tokenPriceNow !== 0 ? tokenPriceNow / tokenPrice24h / 100 : 0
					const increase = tokenPriceNow - tokenPrice24h

					return {
						...container,
						[token.address]: {
							address: token.address,
							name: token.name,
							symbol: token.symbol,
							price: tokenPriceNow,
							change: Number.isFinite(change) ? change : 0,
							increase,
						},
					} as Token
				}, {}),
				...Object.values(astrolescentTokens || {}).reduce((container, token) => {
					const tokenPrice24h = token.tokenPriceUSD + token.diff24HUSD
					const change = token.tokenPriceUSD !== 0 ? token.tokenPriceUSD / tokenPrice24h / 100 : 0

					return {
						...container,
						[token.address]: {
							address: token.address,
							name: token.address,
							symbol: token.address,

							price: token.tokenPriceUSD,
							change: Number.isFinite(change) ? change : 0,
							increase: token.diff24HUSD,
						},
					} as Token
				}, {}),
			},
		}),
		[astrolescentTokens, isLoadingAstrolescent, ociTokens, isLoadingOci],
	)
}

export const useToken = (address: string) => {
	const { data: astrolescentToken, isLoading: isLoadingAstrolescent } = useAstrolescentToken(address)
	const { data: ociToken, isLoading: isLoadingOci } = useOciToken(address)

	return useMemo(() => {
		const astrolescentTokenPrice24h = !astrolescentToken
			? 0
			: astrolescentToken.tokenPriceUSD + astrolescentToken.diff24HUSD
		const astrolescentChange =
			astrolescentToken && astrolescentToken.tokenPriceUSD !== 0
				? astrolescentToken.tokenPriceUSD / astrolescentTokenPrice24h / 100
				: 0
		const at = astrolescentToken
			? ({
					address: astrolescentToken.address,
					name: astrolescentToken.address,
					symbol: astrolescentToken.address,

					price: astrolescentToken.tokenPriceUSD,
					change: Number.isFinite(astrolescentChange) ? astrolescentChange : 0,
					increase: astrolescentToken?.diff24HUSD || 0,
			  } as Token)
			: null

		const ociTokenPriceNow = parseFloat(ociToken?.price?.usd.now) || 0
		const ociTokenPrice24h = parseFloat(ociToken?.price?.usd['24h']) || 0
		const ociChange = ociTokenPriceNow !== 0 ? ociTokenPriceNow / ociTokenPrice24h / 100 : 0

		const ot = ociToken
			? ({
					address: ociToken.address,
					name: ociToken.name,
					symbol: ociToken.symbol,
					price: ociTokenPriceNow,
					change: Number.isFinite(ociChange) ? ociChange : 0,
					increase: ociTokenPriceNow - ociTokenPrice24h,
			  } as Token)
			: null

		return {
			data: at || ot || null,
			isLoading: isLoadingAstrolescent || isLoadingOci,
		}
	}, [astrolescentToken, isLoadingAstrolescent, ociToken, isLoadingOci])
}
