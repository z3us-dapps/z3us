import { useMemo } from 'react'

import type { Token as AstrolescentToken } from '../../services/astrolescent'
import type { Token as OciToken } from '../../services/oci'
import { useToken as useAstrolescentToken, useTokens as useAstrolescentTokens } from './astrolescent'
import { useToken as useOciToken, useTokens as useOciTokens } from './oci'

export type Token = {
	address: string
	symbol: string
	name: string
	price: number
	price24h: number
	change: number
	increase: number
}

function transformAstrolescentToken(token: AstrolescentToken): Token {
	const tokenPrice24h = token.tokenPriceXRD - token.diff24H
	const change = token.tokenPriceXRD / tokenPrice24h / 100

	return {
		address: token.address,
		name: token.name,
		symbol: token.symbol,
		price: token.tokenPriceXRD,
		price24h: tokenPrice24h,
		change: Number.isFinite(change) ? change : 0,
		increase: token.diff24H,
	}
}

function transformOciToken(token: OciToken): Token {
	const tokenPriceNow = parseFloat(token.price?.xrd.now) || 0
	const tokenPrice24h = parseFloat(token.price?.xrd['24h']) || 0
	const change = tokenPriceNow / tokenPrice24h / 100
	const increase = tokenPriceNow - tokenPrice24h

	return {
		address: token.address,
		name: token.name,
		symbol: token.symbol,
		price: tokenPriceNow,
		price24h: tokenPrice24h,
		change: Number.isFinite(change) ? change : 0,
		increase,
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
