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
import type { ResourceBalance, ResourceBalanceKind, ResourceBalances } from 'ui/src/types/types'

import { useEntitiesDetails } from './use-entity-details'
import { useKnownAddresses } from './use-known-addresses'
import { useNetworkId } from './use-network-id'

const transformFungibleResourceItemResponse =
	(knownAddresses: KnownAddresses, xrdPrice: number, tokens: { [key: string]: Token }) =>
	(container: ResourceBalances, item: FungibleResourcesCollectionItemVaultAggregated): ResourceBalances => {
		const metadata = item.explicit_metadata?.items
		const name = getStringMetadata('name', metadata)
		const symbol = getStringMetadata('symbol', metadata)
		const description = getStringMetadata('description', metadata)
		const imageUrl = getStringMetadata('icon_url', metadata)
		const url = getStringMetadata('info_url', metadata)
		const validator = getStringMetadata('validator', metadata)
		const pool = getStringMetadata('pool', metadata)

		const amount = item.vaults.items.reduce(
			(acc, curr) => acc + +curr.amount,
			container[item.resource_address]?.amount || 0,
		)

		const token = validator ? tokens?.[knownAddresses.resourceAddresses.xrd] : tokens?.[item.resource_address] || null

		const tokenPriceNow = parseFloat(token?.price?.usd.now) || 0
		const tokenPrice24h = parseFloat(token?.price?.usd['24h']) || 0
		const change = tokenPrice24h !== 0 ? tokenPriceNow / tokenPrice24h / 100 : 0

		const details = {
			address: item.resource_address,
			amount,
			value: amount * (parseFloat(token?.price?.xrd.now) || 0) * xrdPrice,
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
	const name = getStringMetadata('name', metadata)
	const description = getStringMetadata('description', metadata)
	const imageUrl = getStringMetadata('icon_url', metadata)
	const url = getStringMetadata('info_url', metadata)

	const firstVault = item.vaults.items[0]
	const totalAmount = firstVault.total_count + (container[item.resource_address]?.amount || 0)

	container[item.resource_address] = {
		type: ResourceBalanceType.NON_FUNGIBLE,
		address: item.resource_address,
		vaults: item.vaults.items.map(vault => vault.vault_address),
		amount: totalAmount,
		name,
		description,
		url,
		imageUrl,
		value: 0,
		change: 0,
	} satisfies ResourceBalance[ResourceBalanceType.NON_FUNGIBLE]

	return container
}

const transformBalances = (balanceValues: ResourceBalanceKind[], valueType: string) => {
	const totalValue = balanceValues.reduce((total, balance) => total + balance.value, 0)
	const totalChange = balanceValues.reduce(
		(change, balance) => change + (balance.change / totalValue) * balance.value,
		0,
	)

	return {
		[`${valueType}Balances`]: balanceValues,
		[`${valueType}Value`]: totalValue,
		[`${valueType}Change`]: totalChange,
	}
}

const transformBalancesByType = (balances: ResourceBalances, type: string) =>
	Object.values(balances).filter(balance => balance.type === type)

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

type Balances = {
	balances: ResourceBalanceKind[]
	totalValue: number
	totalChange: number

	fungibleBalances: ResourceBalanceKind[]
	fungibleValue: number
	fungibleChange: number

	nonFungibleBalances: ResourceBalanceKind[]
	nonFungibleValue: number
	nonFungibleChange: number

	tokensBalances: ResourceBalanceKind[]
	tokensValue: number
	tokensChange: number

	liquidityPoolTokensBalances: ResourceBalanceKind[]
	liquidityPoolTokensValue: number
	liquidityPoolTokensChange: number

	poolUnitsBalances: ResourceBalanceKind[]
	poolUnitsValue: number
	poolUnitsChange: number
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
				...fungibleBalances,
				...nonFungibleBalances,
				...transformBalances(otherTokens, 'tokens'),
				...transformBalances(lpTokens, 'liquidityPoolTokens'),
				...transformBalances(poolUnits, 'poolUnits'),
			} as Balances
		},
	})
}
