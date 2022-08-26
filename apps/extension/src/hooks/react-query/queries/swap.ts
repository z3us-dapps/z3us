import { useQuery } from 'react-query'
import caviar from '@src/services/caviar'
import astrolescent, { PoolName as AstrolescentPoolName } from '@src/services/astrolescent'
import oci, { PoolName as OCIPoolName } from '@src/services/oci'
import doge, { PoolName as DogeCubePoolName } from '@src/services/dogecubex'
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

export const usePoolTokens = (): { [rri: string]: { [rri: string]: null } } => {
	const { data: ociPools } = useOCIPools()
	const { data: caviarPools } = useCaviarPools()
	const { data: dogePools } = useDogeCubeXPools()
	const { data: astrolescentTokens } = useAstrolescentTokens()

	const uniqueTokens = {}

	if (ociPools) {
		ociPools.forEach(p => {
			uniqueTokens[p.token_a.rri] = { [p.token_b.rri]: null, ...(uniqueTokens[p.token_a.rri] || {}) }
			uniqueTokens[p.token_b.rri] = { [p.token_a.rri]: null, ...(uniqueTokens[p.token_b.rri] || {}) }
		})
	}
	if (caviarPools) {
		caviarPools.forEach(p =>
			Object.keys(p.balances).forEach(rri => {
				uniqueTokens[rri] = { ...p.balances, ...(uniqueTokens[rri] || {}) }
			}),
		)
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

	return uniqueTokens
}

export const usePools = (fromRRI: string, toRRI: string): Pool[] => {
	const { data: ociPools } = useOCIPools()
	const { data: caviarPools } = useCaviarPools()
	const { data: dogePools } = useDogeCubeXPools()
	const { data: astrolescentTokens } = useAstrolescentTokens()

	if (!fromRRI || !toRRI) {
		return []
	}

	const pools: Pool[] = []
	if (ociPools) {
		const ociPool = ociPools.find(
			p =>
				(p.token_a.rri === fromRRI && p.token_b.rri === toRRI) ||
				(p.token_b.rri === fromRRI && p.token_a.rri === toRRI),
		)
		if (ociPool) {
			pools.push({
				...swapServices[PoolType.OCI],
				name: OCIPoolName,
				wallet: ociPool.wallet_address,
			})
		}
	}
	if (caviarPools) {
		caviarPools.forEach(p => {
			if (p.balances[fromRRI] && p.balances[toRRI]) {
				pools.push({
					...swapServices[PoolType.CAVIAR],
					name: p.name,
					wallet: p.wallet,
					balances: p.balances,
				})
			}
		})
	}
	if (dogePools && (fromRRI === XRD_RRI || toRRI === XRD_RRI)) {
		if (fromRRI === XRD_RRI) {
			const dogePool = dogePools.find(p => p.token.rri === toRRI)
			if (dogePool) {
				pools.push({
					...swapServices[PoolType.DOGECUBEX],
					image: dogePool.heroImageUrl || swapServices[PoolType.DOGECUBEX].image,
					name: DogeCubePoolName,
					wallet: dogePool.account,
				})
			}
		} else if (toRRI === XRD_RRI) {
			const dogePool = dogePools.find(p => p.token.rri === fromRRI)
			if (dogePool) {
				pools.push({
					...swapServices[PoolType.DOGECUBEX],
					image: dogePool.heroImageUrl || swapServices[PoolType.DOGECUBEX].image,
					name: DogeCubePoolName,
					wallet: dogePool.account,
				})
			}
		}
	}
	if (astrolescentTokens && (fromRRI === XRD_RRI || toRRI === XRD_RRI)) {
		if (fromRRI === XRD_RRI) {
			const astrolescentPool = astrolescentTokens.find(token => token.rri === toRRI)
			if (astrolescentPool) {
				pools.push({
					...swapServices[PoolType.ASTROLESCENT],
					name: AstrolescentPoolName,
					wallet: 'astrolescent',
				})
			}
		} else if (toRRI === XRD_RRI) {
			const astrolescentPool = astrolescentTokens.find(token => token.rri === fromRRI)
			if (astrolescentPool) {
				pools.push({
					...swapServices[PoolType.ASTROLESCENT],
					name: AstrolescentPoolName,
					wallet: 'astrolescent',
				})
			}
		}
	}

	return pools
}
