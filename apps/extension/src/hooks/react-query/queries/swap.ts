import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import caviar from '@src/services/caviar'
import oci, { PoolName as OCIPoolName } from '@src/services/oci'
import doge, { PoolName as DogeCubePoolName } from '@src/services/dogecubex'
import astrolescent, { PoolName as AstrolescentPoolName } from '@src/services/astrolescent'
import dsor, { PoolName as DSORPoolName } from '@src/services/dsor'
import { Pool, PoolType } from '@src/types'
import { XRD_RRI, swapServices } from '@src/config'

const poolQueryOptions = {
	staleTime: 60 * 1000,
	refetchInterval: 60 * 1000,
}

export const useCaviarPools = () =>
	useQuery(['useCaviarPools'], caviar.getPools, { ...poolQueryOptions, enabled: swapServices[PoolType.CAVIAR].enabled })

export const useOCIPools = () =>
	useQuery(['useOCIPools'], oci.getPools, { ...poolQueryOptions, enabled: swapServices[PoolType.OCI].enabled })

export const useDogeCubeXPools = () =>
	useQuery(['useDogeCubeXPools'], doge.getPools, {
		...poolQueryOptions,
		enabled: swapServices[PoolType.DOGECUBEX].enabled,
	})

export const useAstrolescentTokens = () =>
	useQuery(['useAstrolescentTokens'], astrolescent.getTokens, {
		...poolQueryOptions,
		enabled: swapServices[PoolType.ASTROLESCENT].enabled,
	})

export const useDSORTokens = () =>
	useQuery(['useDSORTokens'], dsor.getTokens, {
		...poolQueryOptions,
		enabled: swapServices[PoolType.DSOR].enabled,
	})

type PoolTokensState = { [rri: string]: { [rri: string]: unknown } }

export const usePoolTokens = (): PoolTokensState => {
	const { isSuccess: ociIsSuccess, data: caviarPools } = useCaviarPools()
	const { isSuccess: dogeIsSuccess, data: ociPools } = useOCIPools()
	const { isSuccess: dsorIsSuccess, data: dogePools } = useDogeCubeXPools()
	const { isSuccess: astrolescentIsSuccess, data: astrolescentTokens } = useAstrolescentTokens()
	const { isSuccess: caviarIsSuccess, data: dsorTokens } = useDSORTokens()

	const [state, setState] = useState<PoolTokensState>({})

	useEffect(() => {
		const uniqueTokens = {}

		if (caviarPools) {
			caviarPools.forEach(p =>
				Object.keys(p.balances).forEach(rri => {
					uniqueTokens[rri] = { ...p.balances, ...(uniqueTokens[rri] || {}) }
				}),
			)
		}
		if (ociPools) {
			ociPools.forEach(p => {
				uniqueTokens[p.token_a.rri] = { [p.token_b.rri]: null, ...(uniqueTokens[p.token_a.rri] || {}) }
				uniqueTokens[p.token_b.rri] = { [p.token_a.rri]: null, ...(uniqueTokens[p.token_b.rri] || {}) }
			})
		}
		if (dogePools) {
			dogePools.forEach(p => {
				uniqueTokens[p.token.rri] = { [XRD_RRI]: null, ...(uniqueTokens[p.token.rri] || {}) }
				uniqueTokens[XRD_RRI] = { [p.token.rri]: null, ...(uniqueTokens[XRD_RRI] || {}) }
			})
		}
		if (astrolescentTokens) {
			astrolescentTokens.forEach(token => {
				uniqueTokens[token.rri] = { [XRD_RRI]: null, ...(uniqueTokens[token.rri] || {}) }
				uniqueTokens[XRD_RRI] = { [token.rri]: null, ...(uniqueTokens[XRD_RRI] || {}) }
			})
		}
		if (dsorTokens) {
			dsorTokens?.tokens.forEach(token => {
				uniqueTokens[token.rri] = { [XRD_RRI]: null, ...(uniqueTokens[token.rri] || {}) }
				uniqueTokens[XRD_RRI] = { [token.rri]: null, ...(uniqueTokens[XRD_RRI] || {}) }
			})
		}

		setState(uniqueTokens)
	}, [ociIsSuccess, dogeIsSuccess, dsorIsSuccess, astrolescentIsSuccess, caviarIsSuccess])

	return state
}

export const usePools = (fromRRI: string, toRRI: string): Pool[] => {
	const { isSuccess: ociIsSuccess, data: ociPools } = useOCIPools()
	const { isSuccess: dogeIsSuccess, data: dogePools } = useDogeCubeXPools()
	const { isSuccess: dsorIsSuccess, data: dsorTokens } = useDSORTokens()
	const { isSuccess: astrolescentIsSuccess, data: astrolescentTokens } = useAstrolescentTokens()
	const { isSuccess: caviarIsSuccess, data: caviarPools } = useCaviarPools()

	const [state, setState] = useState<Pool[]>([])

	useEffect(() => {
		if (!fromRRI || !toRRI) {
			setState([])
		}

		const pools: Pool[] = []
		if (ociPools) {
			const ociPool = ociPools.find(
				p =>
					(p.token_a.rri === fromRRI && p.token_b.rri === toRRI) ||
					(p.token_b.rri === fromRRI && p.token_a.rri === toRRI),
			)
			if (ociPool) {
				pools.push(
					new Pool({
						...swapServices[PoolType.OCI],
						name: OCIPoolName,
						wallet: ociPool.wallet_address,
					}),
				)
			}
		}
		if (dogePools && (fromRRI === XRD_RRI || toRRI === XRD_RRI)) {
			if (fromRRI === XRD_RRI) {
				const dogePool = dogePools.find(p => p.token.rri === toRRI)
				if (dogePool) {
					pools.push(
						new Pool({
							...swapServices[PoolType.DOGECUBEX],
							image: dogePool.heroImageUrl || swapServices[PoolType.DOGECUBEX].image,
							name: DogeCubePoolName,
							wallet: dogePool.account,
						}),
					)
				}
			} else if (toRRI === XRD_RRI) {
				const dogePool = dogePools.find(p => p.token.rri === fromRRI)
				if (dogePool) {
					pools.push(
						new Pool({
							...swapServices[PoolType.DOGECUBEX],
							image: dogePool.heroImageUrl || swapServices[PoolType.DOGECUBEX].image,
							name: DogeCubePoolName,
							wallet: dogePool.account,
						}),
					)
				}
			}
		}
		if (caviarPools) {
			caviarPools.forEach(p => {
				if (p.balances[fromRRI] && p.balances[toRRI]) {
					pools.push(
						new Pool({
							...swapServices[PoolType.CAVIAR],
							name: p.name,
							wallet: p.wallet,
							balances: p.balances,
						}),
					)
				}
			})
		}
		if (dsorTokens) {
			const fromToken = dsorTokens?.tokens.find(token => token.rri === fromRRI)
			const toToken = dsorTokens?.tokens.find(token => token.rri === toRRI)
			if (fromToken && toToken) {
				pools.push(
					new Pool({
						...swapServices[PoolType.DSOR],
						name: DSORPoolName,
					}),
				)
			}
		}
		if (astrolescentTokens && (fromRRI === XRD_RRI || toRRI === XRD_RRI)) {
			if (fromRRI === XRD_RRI) {
				const astrolescentPool = astrolescentTokens.find(token => token.rri === toRRI)
				if (astrolescentPool) {
					pools.push(
						new Pool({
							...swapServices[PoolType.ASTROLESCENT],
							name: AstrolescentPoolName,
						}),
					)
				}
			} else if (toRRI === XRD_RRI) {
				const astrolescentPool = astrolescentTokens.find(token => token.rri === fromRRI)
				if (astrolescentPool) {
					pools.push(
						new Pool({
							...swapServices[PoolType.ASTROLESCENT],
							name: AstrolescentPoolName,
						}),
					)
				}
			}
		}

		setState(pools)
	}, [fromRRI, toRRI, ociIsSuccess, dogeIsSuccess, dsorIsSuccess, astrolescentIsSuccess, caviarIsSuccess])

	return state
}
