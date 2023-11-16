import type {
	FungibleResourcesCollectionItemVaultAggregated,
	NonFungibleResourcesCollectionItemVaultAggregated,
} from '@radixdlt/radix-dapp-toolkit'
import type { KnownAddresses } from '@radixdlt/radix-engine-toolkit'
import { useQuery } from '@tanstack/react-query'

import { useXRDPriceOnDay } from 'ui/src/hooks/queries/market'
import { useTokens } from 'ui/src/hooks/queries/oci'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import { findMetadataValue } from 'ui/src/services/metadata'
import type { Token } from 'ui/src/services/oci'
import { ResourceBalanceType } from 'ui/src/types'
import type { ResourceBalance, ResourceBalanceKind, ResourceBalances } from 'ui/src/types'

import { useEntitiesDetails } from './use-entity-details'
import { useKnownAddresses } from './use-known-addresses'
import { useNetworkId } from './use-network-id'

const transformFungibleResourceItemResponse =
	(knownAddresses: KnownAddresses, xrdPrice: number, tokens: { [key: string]: Token }) =>
	(container: ResourceBalances, item: FungibleResourcesCollectionItemVaultAggregated): ResourceBalances => {
		const metadata = item.explicit_metadata?.items
		const name = findMetadataValue('name', metadata)
		const symbol = findMetadataValue('symbol', metadata)
		const description = findMetadataValue('description', metadata)
		const imageUrl = findMetadataValue('icon_url', metadata)
		const url = findMetadataValue('info_url', metadata)
		const validator = findMetadataValue('validator', metadata)
		const pool = findMetadataValue('pool', metadata)

		const amount = item.vaults.items.reduce(
			(acc, curr) => acc + +curr.amount,
			container[item.resource_address]?.amount || 0,
		)
		if (amount === 0) {
			return container
		}

		const token = validator ? tokens?.[knownAddresses.resourceAddresses.xrd] : tokens?.[item.resource_address] || null

		const tokenPriceNow = parseFloat(token?.price?.usd.now) || 0
		const tokenPrice24h = parseFloat(token?.price?.usd['24h']) || 0
		const change = tokenPriceNow !== 0 ? tokenPriceNow / tokenPrice24h / 100 : 0
		const xrdValue = amount * (parseFloat(token?.price?.xrd.now) || 0)

		const details = {
			address: item.resource_address,
			amount,
			value: xrdValue * xrdPrice,
			xrdValue,
			name,
			description,
			url,
			imageUrl,
			change: Number.isFinite(change) ? change : 0,
		}

		let resourceType
		let resourceSubtype

		if (validator) {
			resourceType = ResourceBalanceType.LIQUIDITY_POOL_TOKEN
			resourceSubtype = validator
		} else if (pool) {
			resourceType = ResourceBalanceType.POOL_UNIT
			resourceSubtype = pool
		} else {
			resourceType = ResourceBalanceType.FUNGIBLE
			resourceSubtype = symbol
		}

		container[item.resource_address] = {
			...details,
			type: resourceType,
			// eslint-disable-next-line no-nested-ternary
			[resourceType === ResourceBalanceType.FUNGIBLE
				? 'symbol'
				: resourceType === ResourceBalanceType.LIQUIDITY_POOL_TOKEN
				? 'validator'
				: 'pool']: resourceSubtype,
		}

		return container
	}

const transformNonFungibleResourceItemResponse = (
	container: ResourceBalances,
	item: NonFungibleResourcesCollectionItemVaultAggregated,
): ResourceBalances => {
	const metadata = item.explicit_metadata?.items
	const name = findMetadataValue('name', metadata)
	const description = findMetadataValue('description', metadata)
	const imageUrl = findMetadataValue('icon_url', metadata)
	const url = findMetadataValue('info_url', metadata)

	const amount = item.vaults.items.reduce(
		(acc, vault) => acc + +vault.total_count,
		container[item.resource_address]?.amount || 0,
	)
	if (amount === 0) {
		return container
	}

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
		xrdValue: 0,
	} satisfies ResourceBalance[ResourceBalanceType.NON_FUNGIBLE]

	return container
}

const transformBalances = (balanceValues: ResourceBalanceKind[], valueType: string) => {
	const totalXrdValue = balanceValues.reduce((total, balance) => total + balance.xrdValue, 0)
	const totalValue = balanceValues.reduce((total, balance) => total + balance.value, 0)
	const totalChange = balanceValues.reduce(
		(change, balance) => change + (balance.change / totalValue) * balance.value,
		0,
	)

	return {
		[`${valueType}Balances`]: balanceValues,
		[`${valueType}XrdValue`]: Number.isFinite(totalXrdValue) ? totalXrdValue : 0,
		[`${valueType}Value`]: Number.isFinite(totalValue) ? totalValue : 0,
		[`${valueType}Change`]: Number.isFinite(totalChange) ? totalChange : 0,
	}
}

const transformBalancesByType = (balances: ResourceBalances, type: string) =>
	Object.values(balances).filter(balance => balance.type === type)

type Balances = {
	balances: ResourceBalanceKind[]
	totalValue: number
	totalChange: number
	totalXrdValue: number

	fungibleBalances: ResourceBalanceKind[]
	fungibleValue: number
	fungibleChange: number
	fungibleXrdValue: number

	nonFungibleBalances: ResourceBalanceKind[]
	nonFungibleValue: number
	nonFungibleChange: number
	nonFungibleXrdValue: number

	tokensBalances: ResourceBalanceKind[]
	tokensValue: number
	tokensChange: number
	tokensXrdChange: number

	liquidityPoolTokensBalances: ResourceBalanceKind[]
	liquidityPoolTokensValue: number
	liquidityPoolTokensChange: number
	liquidityPoolTokensXrdValue: number

	poolUnitsBalances: ResourceBalanceKind[]
	poolUnitsValue: number
	poolUnitsChange: number
	poolUnitsXrdValue: number
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
		queryKey: ['useBalances', networkId, currency, addresses],
		enabled,
		queryFn: (): Balances => {
			let fungible: ResourceBalances = {}
			let nonFungible: ResourceBalances = {}
			accounts.forEach(({ fungible_resources, non_fungible_resources }) => {
				fungible = fungible_resources.items.reduce(
					transformFungibleResourceItemResponse(knownAddresses, xrdPrice, tokens),
					fungible,
				)
				nonFungible = non_fungible_resources.items.reduce(transformNonFungibleResourceItemResponse, nonFungible)
			})

			const fungibleTokens = Object.values(fungible)
			const nonFungibleTokens = Object.values(nonFungible)
			const otherTokens = transformBalancesByType(fungible, ResourceBalanceType.FUNGIBLE)
			const lpTokens = transformBalancesByType(fungible, ResourceBalanceType.LIQUIDITY_POOL_TOKEN)
			const poolUnits = transformBalancesByType(fungible, ResourceBalanceType.POOL_UNIT)

			const balances = [...fungibleTokens, ...nonFungibleTokens]
			const fungibleBalances = transformBalances(fungibleTokens, 'fungible')
			const nonFungibleBalances = transformBalances(nonFungibleTokens, 'nonFungible')

			const totalValue = (fungibleBalances.fungibleValue as number) + (nonFungibleBalances.nonFungibleValue as number)
			const totalChange = balances.reduce(
				(change, balance) =>
					change + balance.change / (totalValue === 0 ? 1 : totalValue / (balance.value === 0 ? 1 : balance.value)),
				0,
			)

			return {
				balances,
				totalValue,
				totalChange,
				totalXrdValue: fungibleBalances.fungibleXrdValue,
				...fungibleBalances,
				...nonFungibleBalances,
				...transformBalances(otherTokens, 'tokens'),
				...transformBalances(lpTokens, 'liquidityPoolTokens'),
				...transformBalances(poolUnits, 'poolUnits'),
			} as Balances
		},
	})
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
		queryKey: ['useAccountValues', networkId, currency, addresses],
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

type AccountNfts = { resource: string; vault: string; account: string }

export const useAccountNftVaults = (resource: string, addresses: string[]) => {
	const networkId = useNetworkId()

	const { data: accounts = [], isLoading } = useEntitiesDetails(addresses.filter(address => !!address))

	return useQuery({
		queryKey: ['useAccountNftVaults', networkId, resource, addresses],
		enabled: !!resource && !isLoading && addresses.length > 0 && accounts.length > 0,
		queryFn: () =>
			accounts.reduce((result: Array<AccountNfts>, account) => {
				const items = account.non_fungible_resources.items as Array<NonFungibleResourcesCollectionItemVaultAggregated>
				const resourceItems = items.find(({ resource_address }) => resource_address === resource)
				if (resourceItems) {
					return result.concat(
						resourceItems.vaults.items.map(({ vault_address }) => ({
							resource,
							vault: vault_address,
							account: account.address,
						})),
					)
				}
				return result
			}, [] as Array<AccountNfts>),
	})
}
