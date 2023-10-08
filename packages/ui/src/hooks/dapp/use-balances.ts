import type {
	FungibleResourcesCollectionItemVaultAggregated,
	NonFungibleResourcesCollectionItemVaultAggregated,
} from '@radixdlt/radix-dapp-toolkit'
import type { KnownAddresses } from '@radixdlt/radix-engine-toolkit'
import { useQuery } from '@tanstack/react-query'

import { useXRDPriceOnDay } from 'ui/src/hooks/queries/market'
import { useTokens } from 'ui/src/hooks/queries/oci'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import { getStringMetadata } from 'ui/src/services/metadata'
import type { Token } from 'ui/src/services/oci'
import { ResourceBalanceType } from 'ui/src/types/types'
import type { ResourceBalance, ResourceBalances } from 'ui/src/types/types'

import { useEntitiesDetails } from './use-entity-details'
import { useKnownAddresses } from './use-known-addresses'
import { useNetworkId } from './use-network-id'

const transformFungibleResourceItemResponse =
	(knownAddresses: KnownAddresses, xrdPrice: number, tokens: { [key: string]: Token }) =>
	(container: ResourceBalances, item: FungibleResourcesCollectionItemVaultAggregated): ResourceBalances => {
		const name = getStringMetadata('name', item.explicit_metadata?.items)
		const symbol = getStringMetadata('symbol', item.explicit_metadata?.items)
		const description = getStringMetadata('description', item.explicit_metadata?.items)
		const imageUrl = getStringMetadata('icon_url', item.explicit_metadata?.items)
		const url = getStringMetadata('info_url', item.explicit_metadata?.items)
		const validator = getStringMetadata('validator', item.explicit_metadata?.items)
		const pool = getStringMetadata('pool', item.explicit_metadata?.items)

		const amount = item.vaults.items.reduce(
			(acc, curr) => acc + +curr.amount,
			container[item.resource_address]?.amount || 0,
		)

		const token = (validator ? tokens?.[knownAddresses.resourceAddresses.xrd] : tokens?.[item.resource_address]) || null

		let change =
			(token ? (parseFloat(token?.price?.usd.now) || 0) / (parseFloat(token?.price?.usd['24h']) || 0) : 0) / 100
		if (change === Infinity) {
			change = 0
		}

		const details = {
			address: item.resource_address,
			amount,
			value: amount * (parseFloat(token?.price?.xrd.now) || 0) * xrdPrice,
			name,
			description,
			url,
			imageUrl,
			change,
		}

		if (validator) {
			container[item.resource_address] = {
				...details,
				type: ResourceBalanceType.LIQUIDITY_POOL_TOKEN,
				validator,
			} satisfies ResourceBalance[ResourceBalanceType.LIQUIDITY_POOL_TOKEN]
		} else if (pool) {
			container[item.resource_address] = {
				...details,
				type: ResourceBalanceType.POOL_UNIT,
				pool,
			} satisfies ResourceBalance[ResourceBalanceType.POOL_UNIT]
		} else {
			container[item.resource_address] = {
				...details,
				type: ResourceBalanceType.FUNGIBLE,
				symbol,
			} satisfies ResourceBalance[ResourceBalanceType.FUNGIBLE]
		}
		return container
	}

const transformNonFungibleResourceItemResponse = (
	container: ResourceBalances,
	item: NonFungibleResourcesCollectionItemVaultAggregated,
): ResourceBalances => {
	const name = getStringMetadata('name', item.explicit_metadata?.items)
	const description = getStringMetadata('description', item.explicit_metadata?.items)
	const imageUrl = getStringMetadata('icon_url', item.explicit_metadata?.items)
	const url = getStringMetadata('info_url', item.explicit_metadata?.items)

	const amount = item.vaults.items[0].total_count + (container[item.resource_address]?.amount || 0)

	container[item.resource_address] = {
		type: ResourceBalanceType.NON_FUNGIBLE,
		address: item.resource_address,
		vaults: item.vaults.items.map(vault => vault.vault_address),
		amount,
		name,
		description,
		url,
		imageUrl,
		value: 0,
		change: 0,
	} satisfies ResourceBalance[ResourceBalanceType.NON_FUNGIBLE]

	return container
}

const filterBalancesByType =
	(type: ResourceBalanceType) =>
	(container: ResourceBalances, key: string): ResourceBalances => {
		if (container[key].type !== type) {
			delete container[key]
		}
		return container
	}

export const useAccountValues = (...addresses: string[]) => {
	const networkId = useNetworkId()
	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))

	const { data: knownAddresses, isLoading: isLoadingKnownAddresses } = useKnownAddresses()
	const { data: xrdPrice, isLoading: isLoadingXrdPrice } = useXRDPriceOnDay(currency, new Date())
	const { data: tokens, isLoading: isLoadingTokens } = useTokens()
	const { data: accounts, isLoading: isLoadingAccounts } = useEntitiesDetails(addresses.filter(address => !!address))

	const isLoading = isLoadingKnownAddresses || isLoadingXrdPrice || isLoadingTokens || isLoadingAccounts
	const enabled = !isLoading && !!accounts && !!xrdPrice && !!tokens && !!knownAddresses

	return useQuery({
		queryKey: ['useAccountValues', networkId, ...addresses],
		enabled,
		queryFn: () =>
			accounts.reduce(
				(container, account) => ({
					...container,
					[account.address]: Object.values(
						account.fungible_resources.items.reduce(
							transformFungibleResourceItemResponse(knownAddresses, xrdPrice, tokens),
							{},
						),
					).reduce((total: number, balance: ResourceBalance[ResourceBalanceType.FUNGIBLE]) => total + balance.value, 0),
				}),
				{},
			),
	})
}

export const useBalances = (...addresses: string[]) => {
	const networkId = useNetworkId()
	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))

	const { data: knownAddresses, isLoading: isLoadingKnownAddresses } = useKnownAddresses()
	const { data: xrdPrice, isLoading: isLoadingXrdPrice } = useXRDPriceOnDay(currency, new Date())
	const { data: tokens, isLoading: isLoadingTokens } = useTokens()
	const { data: accounts, isLoading: isLoadingAccounts } = useEntitiesDetails(addresses.filter(address => !!address))

	const isLoading = isLoadingKnownAddresses || isLoadingXrdPrice || isLoadingTokens || isLoadingAccounts
	const enabled = !isLoading && !!accounts && !!xrdPrice && !!tokens && !!knownAddresses

	return useQuery({
		queryKey: ['useBalances', networkId, ...addresses, 'test5'],
		enabled,
		queryFn: () => {
			let fungible: ResourceBalances = {}
			let nonFungible: ResourceBalances = {}
			accounts.forEach(({ fungible_resources, non_fungible_resources }) => {
				fungible = fungible_resources.items.reduce(
					transformFungibleResourceItemResponse(knownAddresses, xrdPrice, tokens),
					fungible,
				)
				nonFungible = non_fungible_resources.items.reduce(transformNonFungibleResourceItemResponse, nonFungible)
			})

			const otherTokens: ResourceBalances = Object.keys(fungible).reduce(
				filterBalancesByType(ResourceBalanceType.FUNGIBLE),
				{ ...fungible },
			)
			const lpTokens: ResourceBalances = Object.keys(fungible).reduce(
				filterBalancesByType(ResourceBalanceType.LIQUIDITY_POOL_TOKEN),
				{ ...fungible },
			)
			const poolUnits: ResourceBalances = Object.keys(fungible).reduce(
				filterBalancesByType(ResourceBalanceType.POOL_UNIT),
				{ ...fungible },
			)

			const fungibleBalances = Object.values(fungible)
			const fungibleValue = fungibleBalances.reduce((total, balance) => total + balance.value, 0)
			const fungibleChange = fungibleBalances.reduce(
				(change, balance) =>
					change +
					balance.change / (fungibleValue === 0 ? 1 : fungibleValue / (balance.value === 0 ? 1 : balance.value)),
				0,
			)

			const nonFungibleBalances = Object.values(nonFungible)
			const nonFungibleValue = nonFungibleBalances.reduce((total, balance) => total + balance.value, 0)
			const nonFungibleChange = nonFungibleBalances.reduce(
				(change, balance) =>
					change +
					balance.change / (nonFungibleValue === 0 ? 1 : nonFungibleValue / (balance.value === 0 ? 1 : balance.value)),
				0,
			)

			const tokenBalances = Object.values(otherTokens)
			const tokensValue = tokenBalances.reduce((total, balance) => total + balance.value, 0)
			const tokensChange = tokenBalances.reduce(
				(change, balance) =>
					change + balance.change / (tokensValue === 0 ? 1 : tokensValue / (balance.value === 0 ? 1 : balance.value)),
				0,
			)

			const lpBalances = Object.values(lpTokens)
			const lpValue = lpBalances.reduce((total, balance) => total + balance.value, 0)
			const lpChange = lpBalances.reduce(
				(change, balance) =>
					change + balance.change / (lpValue === 0 ? 1 : lpValue / (balance.value === 0 ? 1 : balance.value)),
				0,
			)

			const puBalances = Object.values(poolUnits)
			const puValue = puBalances.reduce((total, balance) => total + balance.value, 0)
			const puChange = puBalances.reduce(
				(change, balance) =>
					change + balance.change / (puValue === 0 ? 1 : puValue / (balance.value === 0 ? 1 : balance.value)),
				0,
			)

			const balances = [...fungibleBalances, ...nonFungibleBalances]
			const totalValue = fungibleValue + nonFungibleValue
			const totalChange = balances.reduce(
				(change, balance) =>
					change + balance.change / (totalValue === 0 ? 1 : totalValue / (balance.value === 0 ? 1 : balance.value)),
				0,
			)

			return {
				balances,
				totalValue,
				totalChange,

				fungibleBalances: Object.values(fungible),
				fungibleValue,
				fungibleChange,

				nonFungibleBalances: Object.values(nonFungible),
				nonFungibleValue,
				nonFungibleChange,

				tokensBalances: Object.values(tokenBalances),
				tokensValue,
				tokensChange,

				liquidityPoolTokensBalances: Object.values(lpBalances),
				liquidityPoolTokensValue: lpValue,
				liquidityPoolTokensChange: lpChange,

				poolUnitsBalances: Object.values(puBalances),
				poolUnitsValue: puValue,
				poolUnitsChange: puChange,
			}
		},
	})
}
