import type { FungibleResourcesCollectionItemVaultAggregated } from '@radixdlt/radix-dapp-toolkit'
import { decimal } from '@radixdlt/radix-engine-toolkit'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { findMetadataValue } from 'ui/src/services/metadata'

import { useEntitiesDetails } from './use-entity-details'
import { useNetworkId } from './use-network-id'

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
	const networkId = useNetworkId()
	const { data: accounts, isLoading: isLoadingAccounts } = useEntitiesDetails(addresses)
	const { data: pools, isLoading: isLoadingPools } = useAccountPools(accounts)

	const poolResources = useMemo(() => pools?.map(pool => pool.details.state.pool_unit_resource_address) || [], [pools])

	const { data: poolUnits, isLoading: isLoadingPoolUnits } = useEntitiesDetails(poolResources)

	const isLoading = isLoadingPools || isLoadingAccounts || isLoadingPoolUnits
	const enabled = !isLoading && addresses.length > 0

	return useQuery({
		queryKey: ['usePools', networkId, addresses],
		enabled,
		queryFn: () =>
			pools?.reduce((map, pool) => {
				const poolUnitsSupply =
					poolUnits?.reduce((m, unit) => {
						m[unit.address] = unit.details.total_supply
						return m
					}, {}) || {}

				const resourceAmounts = pool.fungible_resources.items.reduce(
					(m, { resource_address, vaults }: FungibleResourcesCollectionItemVaultAggregated) => {
						m[resource_address] = vaults.items
							.reduce((sum, { amount: vaultAmount }) => sum.add(decimal(vaultAmount).value), decimal(0).value)
							.add(m[resource_address] || 0)

						return m
					},
					{},
				)

				pool.resourceAmounts = resourceAmounts
				pool.poolUnitTotalSupply = poolUnitsSupply[pool.details.state.pool_unit_resource_address]
				map[pool.address] = pool
				return map
			}, {}) || {},
	})
}
