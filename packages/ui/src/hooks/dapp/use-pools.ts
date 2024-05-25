import type { StateEntityDetailsResponseItemDetails } from '@radixdlt/babylon-gateway-api-sdk'
import type {
	FungibleResourcesCollectionItemVaultAggregated,
	StateEntityDetailsResponseItem,
} from '@radixdlt/radix-dapp-toolkit'
import { decimal } from '@radixdlt/radix-engine-toolkit'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { findMetadataValue } from 'ui/src/services/metadata'

import { useEntitiesDetails } from './use-entity-details'

const ZERO = decimal(0).value

const collectResourcePoolAddresses = (
	container: string[],
	item: FungibleResourcesCollectionItemVaultAggregated,
): string[] => {
	const pool = findMetadataValue('pool', item.explicit_metadata?.items)
	if (pool && pool.startsWith('pool_')) container.push(pool)
	return container
}

const collectAccountPoolAddresses = (accounts: StateEntityDetailsResponseItem[]) => () => {
	if (!accounts) return []
	return accounts
		.map(({ fungible_resources }) => fungible_resources.items.reduce(collectResourcePoolAddresses, []))
		.reduce((a, b) => a.concat(b), [])
		.filter((value, index, array) => array.indexOf(value) === index)
}

const collectUnitResourceAddresses = (pools: StateEntityDetailsResponseItem[]) => () =>
	pools
		?.map(
			pool =>
				((pool.details as Extract<StateEntityDetailsResponseItemDetails, { type: 'Component' }>).state as any)
					.pool_unit_resource_address,
		)
		.filter(a => !!a) || []

export const usePools = (accounts: StateEntityDetailsResponseItem[], at: Date) => {
	const addresses = useMemo(collectAccountPoolAddresses(accounts), [accounts])
	const { data: pools = [] } = useEntitiesDetails(addresses, undefined, undefined, at)

	const resourceAddresses = useMemo(collectUnitResourceAddresses(pools), [pools])
	const { data: units = [] } = useEntitiesDetails(resourceAddresses, undefined, undefined, at)

	const queryFn = () => {
		const unitsSupply = units.reduce((m, unit) => {
			m[unit.address] = unit.details.total_supply
			return m
		}, {})

		return pools.reduce((map, pool) => {
			const resourceAmounts = pool.fungible_resources.items.reduce(
				(m, { resource_address, vaults }: FungibleResourcesCollectionItemVaultAggregated) => {
					m[resource_address] = vaults.items
						.reduce((sum, { amount: vaultAmount }) => sum.add(decimal(vaultAmount).value), ZERO)
						.add(m[resource_address] || 0)

					return m
				},
				{},
			)

			pool.resourceAmounts = resourceAmounts || {}
			pool.unitTotalSupply = unitsSupply[pool.details.state.pool_unit_resource_address] || '0'
			map[pool.address] = pool
			return map
		}, {})
	}

	return useQuery({
		queryKey: ['usePools', pools, units],
		queryFn,
		enabled: accounts?.length > 0,
	})
}
