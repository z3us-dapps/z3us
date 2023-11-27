import type { FungibleResourcesCollectionItemVaultAggregated } from '@radixdlt/radix-dapp-toolkit'
import { decimal } from '@radixdlt/radix-engine-toolkit'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'

import { findMetadataValue } from 'ui/src/services/metadata'

import { useTokens } from '../queries/tokens'
import { useEntitiesDetails } from './use-entity-details'
import { useNetworkId } from './use-network-id'

const ZERO = decimal(0).value

const collectResourcePools = (container: string[], item: FungibleResourcesCollectionItemVaultAggregated): string[] => {
	const metadata = item.explicit_metadata?.items
	const pool = findMetadataValue('pool', metadata)
	if (pool) container.push(pool)
	return container
}

const useAccountPools = (accounts, at?: Date) => {
	const poolAddresses = useMemo(() => {
		if (!accounts) return []
		return accounts
			.map(({ fungible_resources }) => fungible_resources.items.reduce(collectResourcePools, []))
			.reduce((a, b) => a.concat(b), [])
			.filter((value, index, array) => array.indexOf(value) === index)
	}, [accounts])
	return useEntitiesDetails(poolAddresses, undefined, undefined, at)
}

export const usePools = (addresses: string[]) => {
	const networkId = useNetworkId()

	const { data: tokens, isLoading: isLoadingTokens } = useTokens()
	const { data: accounts, isLoading: isLoadingAccounts } = useEntitiesDetails(addresses)

	const [before, setBefore] = useState<Date>(new Date())
	useEffect(() => {
		before.setDate(before.getDate() - 1)
		before.setHours(0, 0, 0, 0)
		setBefore(before)
	}, [])

	const { data: pools, isLoading: isLoadingPools } = useAccountPools(accounts)
	const poolResources = useMemo(() => pools?.map(pool => pool.details.state.pool_unit_resource_address) || [], [pools])
	const { data: poolUnits, isLoading: isLoadingPoolUnits } = useEntitiesDetails(poolResources)

	const { data: poolsBefore, isLoading: isLoadingPoolsBefore } = useAccountPools(accounts, before)
	const poolResourcesBefore = useMemo(
		() => poolsBefore?.map(pool => pool.details.state.pool_unit_resource_address) || [],
		[poolsBefore],
	)
	const { data: poolUnitsBefore, isLoading: isLoadingPoolUnitsBefore } = useEntitiesDetails(
		poolResourcesBefore,
		undefined,
		undefined,
		before,
	)

	const isLoading =
		isLoadingPools ||
		isLoadingAccounts ||
		isLoadingPoolUnits ||
		isLoadingPoolUnitsBefore ||
		isLoadingTokens ||
		isLoadingPoolsBefore
	const enabled = !isLoading && addresses.length > 0 && !!pools && !!poolsBefore && !!poolUnits && !!poolUnitsBefore

	return useQuery({
		queryKey: ['usePools', networkId, addresses, before],
		enabled,
		queryFn: () => {
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

					const totalValueNow = poolUnitsSupply[pool.details.state.pool_unit_resource_address]
						? pool.fungible_resources.items
								.reduce(
									(total, { resource_address, vaults }: FungibleResourcesCollectionItemVaultAggregated) =>
										total.add(
											vaults.items
												.reduce((sum, { amount: vaultAmount }) => sum.add(decimal(vaultAmount).value), ZERO)
												.mul(tokens[resource_address]?.price.usd.now || 0),
										),
									ZERO,
								)
								.div(poolUnitsSupply[pool.details.state.pool_unit_resource_address])
						: ZERO

					const totalValueBefore = poolUnitsSupplyBefore[pool.details.state.pool_unit_resource_address]
						? poolsBeforeMap[pool.address]?.fungible_resources.items
								.reduce(
									(total, { resource_address, vaults }: FungibleResourcesCollectionItemVaultAggregated) =>
										total.add(
											vaults.items
												.reduce((sum, { amount: vaultAmount }) => sum.add(decimal(vaultAmount).value), ZERO)
												.mul(tokens[resource_address]?.price.usd['24h'] || 0),
										),
									ZERO,
								)
								.div(poolUnitsSupplyBefore[pool.details.state.pool_unit_resource_address])
						: ZERO

					pool.change =
						totalValueNow && totalValueBefore && totalValueBefore.gt(0)
							? totalValueNow.sub(totalValueBefore).div(totalValueBefore).toNumber()
							: 0
					pool.resourceAmounts = resourceAmounts
					pool.poolUnitTotalSupply = poolUnitsSupply[pool.details.state.pool_unit_resource_address]

					map[pool.address] = pool
					return map
				}, {}) || {}
			)
		},
	})
}
