import type {
	FungibleResourcesCollectionItemVaultAggregated,
	NonFungibleResourcesCollectionItemVaultAggregated,
} from '@radixdlt/radix-dapp-toolkit'
import { type KnownAddresses, decimal } from '@radixdlt/radix-engine-toolkit'
import { useQuery } from '@tanstack/react-query'

import { useXRDPriceOnDay } from 'ui/src/hooks/queries/coingecko'
import { type Token, useTokens } from 'ui/src/hooks/queries/tokens'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import { findMetadataValue } from 'ui/src/services/metadata'
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
			(acc, curr) => decimal(curr.amount).value.add(acc),
			decimal(container[item.resource_address]?.amount || 0).value,
		)
		if (!amount.gt(0)) {
			return container
		}

		const token = validator ? tokens?.[knownAddresses.resourceAddresses.xrd] : tokens?.[item.resource_address] || null

		const change = token?.change || 0
		const xrdValue = amount.toNumber() * (token?.price || 0)

		container[item.resource_address] = {
			type: ResourceBalanceType.FUNGIBLE,
			address: item.resource_address,
			amount: amount.toString(),
			value: xrdValue * xrdPrice,
			xrdValue,
			name,
			description,
			url,
			imageUrl,
			change: Number.isFinite(change) ? change : 0,
			symbol,
			validator,
			pool,
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
	const validator = findMetadataValue('validator', metadata)
	const pool = findMetadataValue('pool', metadata)

	const amount = item.vaults.items.reduce(
		(acc, curr) => decimal(curr.total_count).value.add(acc),
		decimal(container[item.resource_address]?.amount || 0).value,
	)
	if (!amount.gt(0)) {
		return container
	}

	container[item.resource_address] = {
		type: ResourceBalanceType.NON_FUNGIBLE,
		address: item.resource_address,
		vaults: item.vaults.items.map(vault => vault.vault_address),
		amount: amount.toString(),
		name,
		description,
		url,
		imageUrl,
		value: 0,
		change: 0,
		xrdValue: 0,
		validator,
		pool,
	}

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

	nftsBalances: ResourceBalanceKind[]
	nftsValue: number
	nftsChange: number
	nftsXrdValue: number

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
			const balances = [...fungibleTokens, ...nonFungibleTokens]

			const otherTokens = fungibleTokens.filter(balance => !balance.validator && !balance.pool)
			const otherNFTs = nonFungibleTokens.filter(balance => !balance.validator && !balance.pool)
			const lpTokens = balances.filter(balance => !!balance.validator)
			const poolUnits = balances.filter(balance => !!balance.pool)

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
				...transformBalances(otherNFTs, 'nfts'),
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
