import { useMemo } from 'react'

import type { Token as AstrolescentToken } from '../../services/astrolescent'
import type { Token as OciToken } from '../../services/oci'
import { useToken as useAstrolescentToken, useTokens as useAstrolescentTokens } from './astrolescent'
import { useToken as useOciToken, useTokens as useOciTokens } from './oci'

export type Token = {
	address: string
	symbol: string
	name: string
	price: {
		xrd: {
			now: number
			['24h']: number
			change: number
			increase: number
		}
		usd: {
			now: number
			['24h']: number
			change: number
			increase: number
		}
	}
}

function transformAstrolescentToken(token: AstrolescentToken): Token {
	const xrdPrice24h = Math.abs(token.diff24H)
	const changeXRD = (token.tokenPriceXRD + token.diff24H) / token.diff24H

	const usdPrice24h = Math.abs(token.diff24HUSD)
	const usdChange = (token.tokenPriceUSD + token.diff24HUSD) / token.diff24HUSD

	return {
		address: token.address,
		name: token.name,
		symbol: token.symbol,
		price: {
			xrd: {
				now: token.tokenPriceXRD,
				'24h': xrdPrice24h,
				change: changeXRD,
				increase: token.diff24H,
			},
			usd: {
				now: token.tokenPriceUSD,
				'24h': usdPrice24h,
				change: usdChange,
				increase: token.diff24HUSD,
			},
		},
	}
}

function transformOciToken(token: OciToken): Token {
	const tokenPriceNow = parseFloat(token.price?.xrd.now) || 0
	const tokenPrice24h = parseFloat(token.price?.xrd['24h']) || 0
	const xrdChange = (tokenPriceNow - tokenPrice24h) / tokenPrice24h
	const xrdIncrease = tokenPriceNow - tokenPrice24h

	const tokenPriceNowUsd = parseFloat(token.price?.usd.now) || 0
	const tokenPrice24hUsd = parseFloat(token.price?.usd['24h']) || 0
	const usdChange = (tokenPriceNowUsd - tokenPrice24hUsd) / tokenPrice24hUsd
	const usdIncrease = tokenPriceNowUsd - tokenPrice24hUsd

	return {
		address: token.address,
		name: token.name,
		symbol: token.symbol,
		price: {
			xrd: {
				now: tokenPriceNow,
				'24h': tokenPrice24h,
				change: xrdChange,
				increase: xrdIncrease,
			},
			usd: {
				now: tokenPriceNowUsd,
				'24h': tokenPrice24hUsd,
				change: usdChange,
				increase: usdIncrease,
			},
		},
	}
}

export const useTokens = () => {
	const { data: astrolescentTokens, isLoading: isLoadingAstrolescent } = useAstrolescentTokens()
	const { data: ociTokens, isLoading: isLoadingOci } = useOciTokens()

	return useMemo(() => {
		const data = Object.values(ociTokens || {}).reduce(
			(container, token) => ({ ...container, [token.address]: transformOciToken(token) }),
			{},
		)

		return {
			isLoading: isLoadingAstrolescent || isLoadingOci,
			data: Object.values(astrolescentTokens || {}).reduce(
				(container, token) => ({ ...container, [token.address]: transformAstrolescentToken(token) }),
				data,
			),
		}
	}, [astrolescentTokens, isLoadingAstrolescent, ociTokens, isLoadingOci])
}

export const useToken = (address: string) => {
	const { data: astrolescentToken, isLoading: isLoadingAstrolescent } = useAstrolescentToken(address)
	const { data: ociToken, isLoading: isLoadingOci } = useOciToken(address)

	return useMemo(() => {
		const at = astrolescentToken ? transformAstrolescentToken(astrolescentToken) : null
		const ot = ociToken ? transformOciToken(ociToken) : null
		return {
			data: at || ot,
			isLoading: isLoadingOci,
		}
	}, [astrolescentToken, isLoadingAstrolescent, ociToken, isLoadingOci])
}
