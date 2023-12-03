import type {
	FungibleResourcesCollectionItemVaultAggregated,
	NonFungibleResourcesCollectionItemVaultAggregated,
	StateEntityDetailsResponseItem,
} from '@radixdlt/radix-dapp-toolkit'
import { type KnownAddresses, decimal } from '@radixdlt/radix-engine-toolkit'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useXRDPriceOnDay } from 'ui/src/hooks/queries/coingecko'
import { type Token, useTokens } from 'ui/src/hooks/queries/tokens'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import { findMetadataValue } from 'ui/src/services/metadata'
import { ResourceBalanceType } from 'ui/src/types'
import type { ResourceBalance, ResourceBalanceKind, ResourceBalances } from 'ui/src/types'

import { useEntitiesDetails } from './use-entity-details'
import { useKnownAddresses } from './use-known-addresses'
import { useNetworkId } from './use-network-id'
import { usePools } from './use-pools'
import { useValidators } from './use-validators'

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

const DECIMAL_ZERO = decimal(0).value

type PoolDetails = {
	resourceAmounts: { [key: string]: typeof DECIMAL_ZERO }
	poolUnitTotalSupply: string
	resourceAmountsBefore: { [key: string]: typeof DECIMAL_ZERO }
	poolUnitTotalSupplyBefore: string
}

type ValidatorDetails = {
	resourceAmounts: { [key: string]: typeof DECIMAL_ZERO }
	resourceAmountsBefore: { [key: string]: typeof DECIMAL_ZERO }
	validatorUnitTotalSupply: string
	validatorUnitTotalSupplyBefore: string
	validatorClaimTotalSupply: string
	validatorClaimTotalSupplyBefore: string
}

const transformFungibleResourceItemResponse =
	(
		knownAddresses: KnownAddresses,
		xrdPrice: number,
		tokens: { [key: string]: Token },
		validatorsMap: { [key: string]: StateEntityDetailsResponseItem & ValidatorDetails },
		poolsMap: { [key: string]: StateEntityDetailsResponseItem & PoolDetails },
	) =>
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

		let change = 0
		let xrdValue = 0
		if (pool && poolsMap[pool]) {
			const p = poolsMap[pool]

			const fraction = decimal(amount).value.div(p.poolUnitTotalSupply)
			const totalValueNow = Object.keys(p.resourceAmounts).reduce(
				(sum, resource) =>
					sum.add(fraction.mul(p.resourceAmounts[resource]).mul(decimal(tokens[resource]?.price.usd.now).value)),
				DECIMAL_ZERO,
			)

			const fractionBefore = decimal(amount).value.div(p.poolUnitTotalSupply)
			const totalValueBefore = Object.keys(p.resourceAmountsBefore).reduce(
				(sum, resource) =>
					sum.add(
						fractionBefore
							.mul(p.resourceAmountsBefore[resource])
							.mul(decimal(tokens[resource]?.price.usd['24h']).value),
					),
				DECIMAL_ZERO,
			)

			xrdValue = Object.keys(p.resourceAmounts)
				.reduce(
					(sum, resource) =>
						sum.add(fraction.mul(p.resourceAmounts[resource]).mul(decimal(tokens[resource]?.price.xrd.now || 0).value)),
					DECIMAL_ZERO,
				)
				.toNumber()
			xrdValue = Number.isFinite(xrdValue) ? xrdValue : 0

			change = totalValueBefore.gt(0) ? totalValueNow.sub(totalValueBefore).div(totalValueBefore).toNumber() : 0
		} else if (validator && validatorsMap[validator]) {
			const v = validatorsMap[validator]

			const fraction = decimal(amount).value.div(v.validatorUnitTotalSupply)
			const totalValueNow = fraction
				.mul(v.resourceAmounts[knownAddresses.resourceAddresses.xrd])
				.mul(decimal(tokens[knownAddresses.resourceAddresses.xrd]?.price.usd.now).value)

			const fractionBefore = decimal(amount).value.div(v.validatorUnitTotalSupply)
			const totalValueBefore = fractionBefore
				.mul(v.resourceAmountsBefore[knownAddresses.resourceAddresses.xrd])
				.mul(decimal(tokens[knownAddresses.resourceAddresses.xrd]?.price.usd['24h']).value)

			xrdValue = Object.keys(v.resourceAmounts)
				.reduce(
					(sum, resource) =>
						sum.add(fraction.mul(v.resourceAmounts[resource]).mul(decimal(tokens[resource]?.price.xrd.now || 0).value)),
					DECIMAL_ZERO,
				)
				.toNumber()
			xrdValue = Number.isFinite(xrdValue) ? xrdValue : 0

			change = totalValueBefore.gt(0) ? totalValueNow.sub(totalValueBefore).div(totalValueBefore).toNumber() : 0
		} else {
			const token = tokens?.[item.resource_address]
			change = token?.price.usd.change || 0
			xrdValue = amount.toNumber() * (token?.price.xrd.now || 0)
		}

		container[item.resource_address] = {
			type: ResourceBalanceType.FUNGIBLE,
			address: item.resource_address,
			vaults: item.vaults.items.map(vault => vault.vault_address),
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

const transformNonFungibleResourceItemResponse =
	() =>
	(container: ResourceBalances, item: NonFungibleResourcesCollectionItemVaultAggregated): ResourceBalances => {
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

		const ids = item.vaults.items.reduce((acc, curr) => {
			acc.push(...curr.items)
			return acc
		}, [])

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
			ids,
		}

		return container
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

	const accountAddresses = useMemo(() => addresses.filter(address => !!address), [addresses])

	const { data: knownAddresses, isLoading: isLoadingKnownAddresses } = useKnownAddresses()
	const { data: xrdPrice, isLoading: isLoadingXrdPrice } = useXRDPriceOnDay(currency, new Date())
	const { data: tokens, isLoading: isLoadingTokens } = useTokens()
	const { data: accounts, isLoading: isLoadingAccounts } = useEntitiesDetails(accountAddresses)
	const { data: pools, isLoading: isLoadingPools } = usePools(accountAddresses)
	const { data: validators, isLoading: isLoadingValidators } = useValidators(accountAddresses)

	const isLoading =
		isLoadingKnownAddresses ||
		isLoadingXrdPrice ||
		isLoadingTokens ||
		isLoadingAccounts ||
		isLoadingPools ||
		isLoadingValidators
	const enabled = !isLoading && !!accounts && !!xrdPrice && !!tokens && !!knownAddresses

	return useQuery({
		queryKey: ['useBalances', networkId, currency, accountAddresses, pools?.length],
		enabled,
		queryFn: (): Balances => {
			let fungible: ResourceBalances = {}
			let nonFungible: ResourceBalances = {}
			accounts.forEach(({ fungible_resources, non_fungible_resources }) => {
				fungible = fungible_resources.items.reduce(
					transformFungibleResourceItemResponse(knownAddresses, xrdPrice, tokens, validators, pools),
					fungible,
				)
				nonFungible = non_fungible_resources.items.reduce(transformNonFungibleResourceItemResponse(), nonFungible)
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

	const accountAddresses = useMemo(() => addresses.filter(address => !!address), [addresses])

	const { data: knownAddresses, isLoading: isLoadingKnownAddresses } = useKnownAddresses()
	const { data: xrdPrice, isLoading: isLoadingXrdPrice } = useXRDPriceOnDay(currency, new Date())
	const { data: tokens, isLoading: isLoadingTokens } = useTokens()
	const { data: accounts, isLoading: isLoadingAccounts } = useEntitiesDetails(accountAddresses)
	const { data: pools, isLoading: isLoadingPools } = usePools(accountAddresses)
	const { data: validators, isLoading: isLoadingValidators } = useValidators(accountAddresses)

	const isLoading =
		isLoadingKnownAddresses ||
		isLoadingXrdPrice ||
		isLoadingTokens ||
		isLoadingAccounts ||
		isLoadingPools ||
		isLoadingValidators
	const enabled = !isLoading && !!accounts && !!xrdPrice && !!tokens && !!knownAddresses

	return useQuery({
		queryKey: ['useAccountValues', networkId, currency, accountAddresses],
		enabled,
		queryFn: () =>
			accounts.reduce(
				(container, account) => ({
					...container,
					[account.address]: Object.values(
						account.fungible_resources.items.reduce(
							transformFungibleResourceItemResponse(knownAddresses, xrdPrice, tokens, validators, pools),
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

	const accountAddresses = useMemo(() => addresses.filter(address => !!address), [addresses])
	const { data: accounts = [], isLoading } = useEntitiesDetails(accountAddresses)

	return useQuery({
		queryKey: ['useAccountNftVaults', networkId, resource, accountAddresses],
		enabled: !!resource && !isLoading && accountAddresses.length > 0 && accounts.length > 0,
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
