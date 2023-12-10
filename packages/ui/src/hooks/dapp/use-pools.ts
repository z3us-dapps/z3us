import type { FungibleResourcesCollectionItemVaultAggregated } from '@radixdlt/radix-dapp-toolkit'
import { decimal } from '@radixdlt/radix-engine-toolkit'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'

import { findMetadataValue } from 'ui/src/services/metadata'

import { useEntitiesDetails } from './use-entity-details'
import { useNetworkId } from './use-network'

const ZERO = decimal(0).value

const collectResourcePools = (container: string[], item: FungibleResourcesCollectionItemVaultAggregated): string[] => {
	const pool = findMetadataValue('pool', item.explicit_metadata?.items)
	if (pool && pool.startsWith('pool_')) container.push(pool)
	return container
}

const useAccountPools = (accounts, at?: Date) => {
	const addresses = useMemo(() => {
		if (!accounts) return []
		return accounts
			.map(({ fungible_resources }) => fungible_resources.items.reduce(collectResourcePools, []))
			.reduce((a, b) => a.concat(b), [])
			.filter((value, index, array) => array.indexOf(value) === index)
	}, [accounts])
	return useEntitiesDetails(addresses, undefined, undefined, at)
}

export const usePools = (addresses: string[]) => {
	const networkId = useNetworkId()

	const { data: accounts, isLoading: isLoadingAccounts } = useEntitiesDetails(addresses)

	const [before, setBefore] = useState<Date>(new Date())
	useEffect(() => {
		before.setDate(before.getDate() - 1)
		before.setHours(0, 0, 0, 0)
		setBefore(before)
	}, [])

	const { data: pools, isLoading: isLoadingPools } = useAccountPools(accounts)
	const { data: poolsBefore, isLoading: isLoadingPoolsBefore } = useAccountPools(accounts, before)

	const poolResources = useMemo(
		() => pools?.map(pool => pool.details.state.pool_unit_resource_address).filter(a => !!a) || [],
		[pools],
	)
	const { data: poolUnits, isLoading: isLoadingPoolUnits } = useEntitiesDetails(poolResources)

	const poolResourcesBefore = useMemo(
		() => poolsBefore?.map(pool => pool.details.state.pool_unit_resource_address).filter(a => !!a) || [],
		[poolsBefore],
	)
	const { data: poolUnitsBefore, isLoading: isLoadingPoolUnitsBefore } = useEntitiesDetails(
		poolResourcesBefore,
		undefined,
		undefined,
		before,
	)

	const isLoading =
		isLoadingPools || isLoadingAccounts || isLoadingPoolUnits || isLoadingPoolUnitsBefore || isLoadingPoolsBefore
	const enabled = !isLoading && addresses.length > 0 && !!pools && !!poolsBefore && !!poolUnits && !!poolUnitsBefore

	const queryFn = () => {
		const poolsBeforeMap = poolsBefore.reduce((map, pool) => {
			map[pool.address] = pool
			return map
		}, {})

		const poolUnitsSupply = poolUnits.reduce((m, unit) => {
			m[unit.address] = unit.details.total_supply
			return m
		}, {})

		const poolUnitsSupplyBefore = poolUnitsBefore.reduce((m, unit) => {
			m[unit.address] = unit.details.total_supply
			return m
		}, {})

		return (
			pools.reduce((map, pool) => {
				const resourceAmounts = pool.fungible_resources.items.reduce(
					(m, { resource_address, vaults }: FungibleResourcesCollectionItemVaultAggregated) => {
						m[resource_address] = vaults.items
							.reduce((sum, { amount: vaultAmount }) => sum.add(decimal(vaultAmount).value), ZERO)
							.add(m[resource_address] || 0)

						return m
					},
					{},
				)
				const resourceAmountsBefore = poolsBeforeMap[pool.address]?.fungible_resources.items.reduce(
					(m, { resource_address, vaults }: FungibleResourcesCollectionItemVaultAggregated) => {
						m[resource_address] = vaults.items
							.reduce((sum, { amount: vaultAmount }) => sum.add(decimal(vaultAmount).value), ZERO)
							.add(m[resource_address] || 0)

						return m
					},
					{},
				)

				pool.resourceAmounts = resourceAmounts || {}
				pool.poolUnitTotalSupply = poolUnitsSupply[pool.details.state.pool_unit_resource_address] || '0'
				pool.resourceAmountsBefore = resourceAmountsBefore || {}
				pool.poolUnitTotalSupplyBefore = poolUnitsSupplyBefore[pool.details.state.pool_unit_resource_address] || '0'

				map[pool.address] = pool
				return map
			}, {}) || {}
		)
	}

	return useQuery({
		queryKey: ['usePools', networkId, addresses, before],
		enabled,
		queryFn,
	})
}
