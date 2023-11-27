import type { FungibleResourcesCollectionItemVaultAggregated } from '@radixdlt/radix-dapp-toolkit'
import { useMemo } from 'react'

import { findMetadataValue } from 'ui/src/services/metadata'

import { useEntitiesDetails } from './use-entity-details'

const collectResourcePools = (container: string[], item: FungibleResourcesCollectionItemVaultAggregated): string[] => {
	const metadata = item.explicit_metadata?.items
	const pool = findMetadataValue('pool', metadata)
	if (pool) container.push(pool)
	return container
}

const useAccountPools = accounts => {
	const poolAddresses = useMemo(() => {
		if (!accounts) return []
		return accounts
			.map(({ fungible_resources }) => fungible_resources.items.reduce(collectResourcePools, []))
			.reduce((a, b) => a.concat(b), [])
			.filter((value, index, array) => array.indexOf(value) === index)
	}, [accounts])
	return useEntitiesDetails(poolAddresses)
}

export const usePools = (addresses: string[]) => {
	const { data: accounts, isLoading: isLoadingAccounts } = useEntitiesDetails(addresses)
	const { data: pools, isLoading: isLoadingPools } = useAccountPools(accounts)

	const poolsMap = useMemo(
		() =>
			pools?.reduce((map, pool) => {
				map[pool.address] = pool
				return map
			}, {}) || {},
		[pools],
	)
	return { data: poolsMap, isLoading: isLoadingPools || isLoadingAccounts }
}
