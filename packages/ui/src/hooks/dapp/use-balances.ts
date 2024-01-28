import type {
	FungibleResourcesCollectionItemVaultAggregated,
	NonFungibleResourcesCollectionItemVaultAggregated,
	StateEntityDetailsResponseItem,
} from '@radixdlt/radix-dapp-toolkit'
import { type KnownAddresses, decimal } from '@radixdlt/radix-engine-toolkit'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'

import { useEntitiesDetails } from 'ui/src/hooks/dapp/use-entity-details'
import { useKnownAddresses } from 'ui/src/hooks/dapp/use-known-addresses'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network'
import { usePools, usePoolsCompare } from 'ui/src/hooks/dapp/use-pools'
import { useValidators, useValidatorsCompare } from 'ui/src/hooks/dapp/use-validators'
import { useXRDPriceOnDay } from 'ui/src/hooks/queries/coingecko'
import { type Token, useTokens } from 'ui/src/hooks/queries/tokens'
import { useCompareWithDate } from 'ui/src/hooks/use-compare-with-date'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import { findMetadataValue } from 'ui/src/services/metadata'
import { ResourceBalanceType } from 'ui/src/types'
import type { ResourceBalance, ResourceBalanceKind, ResourceBalances } from 'ui/src/types'
import { formatDateTime } from 'ui/src/utils/date'

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

type PoolDetails = StateEntityDetailsResponseItem & {
	resourceAmounts: { [key: string]: typeof DECIMAL_ZERO }
	unitTotalSupply: string
}

type ValidatorDetails = StateEntityDetailsResponseItem & {
	resourceAmounts: { [key: string]: typeof DECIMAL_ZERO }
	unitTotalSupply: string
	claimTotalSupply: string
}

const transformFungibleResourceItemResponse =
	(
		knownAddresses: KnownAddresses,
		xrdPrice: number,
		xrdPriceBefore: number,
		tokens: { [key: string]: Token },
		validatorsMap: { [key: string]: { at: ValidatorDetails; before?: ValidatorDetails } },
		poolsMap: { [key: string]: { at: PoolDetails; before?: PoolDetails } },
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

			const fraction = decimal(amount).value.div(p.at.unitTotalSupply)
			const totalValueNow = Object.keys(p.at.resourceAmounts).reduce(
				(sum, resource) =>
					sum.add(fraction.mul(p.at.resourceAmounts[resource]).mul(decimal(tokens[resource]?.price.usd.now).value)),
				DECIMAL_ZERO,
			)

			const fractionBefore = decimal(amount).value.div(p.at.unitTotalSupply)
			const totalValueBefore = Object.keys(p.before?.resourceAmounts || {}).reduce(
				(sum, resource) =>
					sum.add(
						fractionBefore
							.mul(p.before?.resourceAmounts?.[resource] || '0')
							.mul(decimal(tokens[resource]?.price.usd['24h']).value),
					),
				DECIMAL_ZERO,
			)

			xrdValue = Object.keys(p.at.resourceAmounts)
				.reduce(
					(sum, resource) =>
						sum.add(
							fraction.mul(p.at.resourceAmounts[resource]).mul(decimal(tokens[resource]?.price.xrd.now || 0).value),
						),
					DECIMAL_ZERO,
				)
				.toNumber()
			xrdValue = Number.isFinite(xrdValue) ? xrdValue : 0

			change = totalValueBefore.gt(0) ? totalValueNow.sub(totalValueBefore).div(totalValueBefore).toNumber() : 0
		} else if (validator && validatorsMap[validator]) {
			const v = validatorsMap[validator]

			const fraction = decimal(amount).value.div(v.at.unitTotalSupply)
			const xrdValueNow = fraction.mul(v.at.resourceAmounts[knownAddresses.resourceAddresses.xrd])
			const totalValueNow = xrdValueNow.mul(decimal(xrdPrice).value)

			const fractionBefore = decimal(amount).value.div(v.at.unitTotalSupply)
			const xrdValueBefore = fractionBefore.mul(v.before?.resourceAmounts[knownAddresses.resourceAddresses.xrd] || 0)
			const totalValueBefore = xrdValueBefore.mul(decimal(xrdPriceBefore).value)

			xrdValue = xrdValueNow.toNumber()
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
			validator: validator?.startsWith('validator_') ? validator : undefined,
			pool: pool?.startsWith('pool_') ? pool : undefined,
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
			acc.push(...(curr.items || []))
			return acc
		}, [])

		container[item.resource_address] = {
			type: ResourceBalanceType.NON_FUNGIBLE,
			address: item.resource_address,
			ids,
			vaults: item.vaults.items.map(vault => vault.vault_address),
			amount: amount.toString(),
			name,
			description,
			url,
			imageUrl,
			value: 0,
			change: 0,
			xrdValue: 0,
			validator: validator?.startsWith('validator_') ? validator : undefined,
			pool: pool?.startsWith('pool_') ? pool : undefined,
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

const useBeforeDate = (at: Date): Date => {
	const [compareDate] = useCompareWithDate()
	const [before, setBefore] = useState<Date>(at)
	useEffect(() => {
		if (compareDate) {
			setBefore(new Date(compareDate.toUTCString()))
		} else {
			before.setUTCDate(at.getUTCDate() - 1)
			before.setHours(0, 0, 0, 0)
			setBefore(before)
		}
	}, [formatDateTime(at)])

	return before
}

export const useBalances = (addresses: string[], at: Date = new Date()) => {
	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))

	const before = useBeforeDate(at)
	const accountAddresses = useMemo(() => addresses.filter(address => !!address), [addresses])

	const { data: accounts } = useEntitiesDetails(accountAddresses, undefined, undefined, at)
	const pools = usePoolsCompare(accounts, at, before)
	const validators = useValidatorsCompare(accounts, at, before)
	const { data: knownAddresses } = useKnownAddresses()
	const { data: tokens } = useTokens()
	const { data: xrdPrice } = useXRDPriceOnDay(currency, at)
	const { data: xrdPriceBefore } = useXRDPriceOnDay(currency, before)

	return useMemo((): Balances => {
		let fungible: ResourceBalances = {}
		let nonFungible: ResourceBalances = {}
		accounts.forEach(({ fungible_resources, non_fungible_resources }) => {
			fungible = fungible_resources.items.reduce(
				transformFungibleResourceItemResponse(knownAddresses, xrdPrice, xrdPriceBefore, tokens, validators, pools),
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
	}, [knownAddresses, xrdPrice, xrdPriceBefore, tokens, accounts, pools, validators])
}

export const useAccountValues = (addresses: string[], at: Date = new Date()) => {
	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))

	const accountAddresses = useMemo(() => addresses.filter(address => !!address), [addresses])

	const { data: knownAddresses } = useKnownAddresses()
	const { data: xrdPrice } = useXRDPriceOnDay(currency, at)
	const { data: tokens } = useTokens()
	const { data: accounts } = useEntitiesDetails(accountAddresses, undefined, undefined, at)
	const pools = usePools(accounts, at)
	const validators = useValidators(accounts, at)

	return useMemo(
		() =>
			accounts.reduce(
				(container, account) => ({
					...container,
					[account.address]: Object.values(
						account.fungible_resources.items.reduce(
							transformFungibleResourceItemResponse(
								knownAddresses,
								xrdPrice,
								0,
								tokens,
								Object.keys(validators || {}).reduce((map, address) => {
									map[address] = {
										at: validators[address],
									}
									return map
								}, {}),
								Object.keys(pools || {}).reduce((map, address) => {
									map[address] = {
										at: pools[address],
									}
									return map
								}, {}),
							),
							{},
						),
					).reduce((total: number, balance: ResourceBalance[ResourceBalanceType.FUNGIBLE]) => total + balance.value, 0),
				}),
				{},
			),
		[accounts, knownAddresses, xrdPrice, tokens, validators, pools],
	)
}

type AccountNfts = { resource: string; vault: string; account: string }

export const useAccountNftVaults = (resource: string, addresses: string[], at: Date) => {
	const networkId = useNetworkId()

	const accountAddresses = useMemo(() => addresses.filter(address => !!address), [addresses])
	const { data: accounts = [], isLoading } = useEntitiesDetails(accountAddresses, undefined, undefined, at)

	return useQuery({
		queryKey: ['useAccountNftVaults', networkId, resource, accountAddresses, formatDateTime(at)],
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
