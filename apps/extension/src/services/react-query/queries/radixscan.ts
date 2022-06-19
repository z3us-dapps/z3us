import { useQuery } from 'react-query'
import { KnownTokens, VisibleTokens } from '@src/types'
import { RadixScanService } from '@src/services/radixscan'
import tokens from './tokens.json'

const service = new RadixScanService()

const makeTokenData = (_tokens: KnownTokens): VisibleTokens => {
	if (!_tokens) {
		return {}
	}

	const tokenRris = _tokens.RRI
	const tokenSymbols = _tokens.Symbol
	const tokenNames = _tokens.Name

	const vs = {}
	tokenRris.forEach((rri, index: number) => {
		vs[rri] = {
			rri,
			name: tokenNames[index],
			symbol: tokenSymbols[index],
		}
	})
	return vs
}

export const useKnownTokens = () =>
	useQuery(
		['useKnownTokens'],
		async (): Promise<VisibleTokens> => {
			try {
				const resp = await service.getKnownTokens()
				return makeTokenData(resp)
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error(error)
				return makeTokenData(tokens)
			}
		},
		{
			staleTime: 60 * 1000,
			refetchInterval: 60 * 1000,
		},
	)
