import type {
	FungibleResourcesCollectionItemVaultAggregated,
	NonFungibleResourcesCollectionItemVaultAggregated,
	StateEntityDetailsResponseItem,
} from '@radixdlt/radix-dapp-toolkit'
import { type KnownAddresses, decimal } from '@radixdlt/radix-engine-toolkit'
import { useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useMemo, useState } from 'react'

import { BalancesContext, emptyState } from 'ui/src/context/balances/context'
import { useEntitiesDetails } from 'ui/src/hooks/dapp/use-entity-details'
import { useKnownAddresses } from 'ui/src/hooks/dapp/use-known-addresses'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network'
import { usePools } from 'ui/src/hooks/dapp/use-pools'
import { useValidators } from 'ui/src/hooks/dapp/use-validators'
import { useXRDCurrentPrice, useXRDPriceOnDay } from 'ui/src/hooks/queries/coingecko'
import { type Token } from 'ui/src/hooks/queries/tokens'
import { useCompareWithDate } from 'ui/src/hooks/use-compare-with-date'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import { findMetadataValue } from 'ui/src/services/metadata'
import { ResourceBalanceType } from 'ui/src/types'
import type { ResourceBalance, ResourceBalanceKind, ResourceBalances } from 'ui/src/types'
import type { Balances } from 'ui/src/types/balances'
import { formatDate, formatDateTime } from 'ui/src/utils/date'

import { useSelectedAccounts } from '../use-accounts'
import { useTokens } from './use-tokens'

export const useSelectedAccountsBalances = () => useContext(BalancesContext)!

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
}

const transformFungibleResourceItemResponse =
	(
		knownAddresses: KnownAddresses,
		xrdPrice: number = 0,
		xrdPriceBefore: number = 0,
		tokens: { [key: string]: Token } = {},
		validatorsMap: { [key: string]: { at: ValidatorDetails; before?: ValidatorDetails } } = {},
		poolsMap: { [key: string]: { at: PoolDetails; before?: PoolDetails } } = {},
	) =>
	(container: ResourceBalances, item: FungibleResourcesCollectionItemVaultAggregated): ResourceBalances => {
		xrdPrice = xrdPrice ?? 0
		xrdPriceBefore = xrdPriceBefore ?? 0
		tokens = tokens || {}
		validatorsMap = validatorsMap || {}
		poolsMap = poolsMap || {}

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

		let poolName = ''
		let validatorName = ''
		let change = 0
		let xrdValue = 0
		if (pool && poolsMap[pool]) {
			const p = poolsMap[pool]

			const fraction = decimal(amount).value.div(p.at.unitTotalSupply)
			const totalValueNow = Object.keys(p.at.resourceAmounts).reduce(
				(sum, resource) =>
					sum.add(
						fraction
							.mul(p.at.resourceAmounts[resource] || 0)
							.mul(decimal(tokens[resource]?.price.usd.now || '0').value),
					),
				DECIMAL_ZERO,
			)

			const fractionBefore = decimal(amount).value.div(p.at.unitTotalSupply)
			const totalValueBefore = Object.keys(p.before?.resourceAmounts || {}).reduce(
				(sum, resource) =>
					sum.add(
						fractionBefore
							.mul(p.before?.resourceAmounts?.[resource] || 0)
							.mul(decimal(tokens[resource]?.price.usd['24h'] || '0').value),
					),
				DECIMAL_ZERO,
			)

			poolName = findMetadataValue('name', p.at.explicit_metadata.items)
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

			validatorName = findMetadataValue('name', v.at.explicit_metadata.items)
			xrdValue = xrdValueNow.toNumber()
			xrdValue = Number.isFinite(xrdValue) ? xrdValue : 0
			change = totalValueBefore.gt(0) ? totalValueNow.sub(totalValueBefore).div(totalValueBefore).toNumber() : 0
		} else {
			const token = tokens[item.resource_address]
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
			validatorName,
			pool: pool?.startsWith('pool_') ? pool : undefined,
			poolName,
		}

		return container
	}

const transformNonFungibleResourceItemResponse =
	(
		validatorsMap: { [key: string]: { at: ValidatorDetails; before?: ValidatorDetails } } = {},
		poolsMap: { [key: string]: { at: PoolDetails; before?: PoolDetails } } = {},
	) =>
	(container: ResourceBalances, item: NonFungibleResourcesCollectionItemVaultAggregated): ResourceBalances => {
		validatorsMap = validatorsMap || {}
		poolsMap = poolsMap || {}

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

		// @TODO: this works for now but at some point we need pagination here
		// since current ids are only from page 1
		const ids = item.vaults.items.reduce((acc, curr) => {
			acc.push(...(curr.items || []))
			return acc
		}, [])

		let poolName = ''
		let validatorName = ''
		if (pool && poolsMap[pool]) {
			const p = poolsMap[pool]

			poolName = findMetadataValue('name', p.at.explicit_metadata.items)
		} else if (validator && validatorsMap[validator]) {
			const v = validatorsMap[validator]

			validatorName = findMetadataValue('name', v.at.explicit_metadata.items)
		}

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
			validatorName,
			pool: pool?.startsWith('pool_') ? pool : undefined,
			poolName,
		}

		return container
	}

function getBefore(at: Date): Date {
	const newBefore = new Date(at.getTime())
	newBefore.setUTCDate(newBefore.getUTCDate() - 1)
	return newBefore
}

const useBeforeDate = (at: Date): Date => {
	const [compareDate] = useCompareWithDate()
	const [before, setBefore] = useState<Date>(compareDate || getBefore(at))
	useEffect(() => {
		if (compareDate) {
			setBefore(compareDate)
		} else {
			const newBefore = new Date(at.getTime())
			newBefore.setUTCDate(newBefore.getUTCDate() - 1)
			setBefore(newBefore)
		}
	}, [formatDateTime(at), formatDateTime(compareDate)])

	return before
}

export const useBalances = (addresses: string[], at: Date = new Date()) => {
	const networkId = useNetworkId()
	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))

	const tokens = useTokens()
	const before = useBeforeDate(at)
	const accountAddresses = useMemo(() => addresses.filter(address => !!address), [addresses])

	const { isLoading: isLoadingAccounts, data: accounts } = useEntitiesDetails(
		accountAddresses,
		undefined,
		undefined,
		at,
	)
	const { isLoading: isLoadingValidatorsAt, data: validatorsAt } = useValidators(accounts, at)
	const { isLoading: isLoadingValidatorsBefore, data: validatorsBefore } = useValidators(accounts, before)
	const { isLoading: isLoadingPoolsAt, data: poolsAt } = usePools(accounts, at)
	const { isLoading: isLoadingPoolsBefore, data: poolsBefore } = usePools(accounts, before)
	const { isLoading: isLoadingKnownAddresses, data: knownAddresses } = useKnownAddresses()

	const { isLoading: isLoadingXrdPriceNow, data: xrdPriceNow } = useXRDCurrentPrice(currency)
	const { isLoading: isLoadingXrdPriceAt, data: xrdPriceAt } = useXRDPriceOnDay(currency, at)
	const { isLoading: isLoadingXrdPriceBefore, data: xrdPriceBefore } = useXRDPriceOnDay(currency, before)
	const xrdPrice = formatDate(at) === formatDate(new Date()) ? xrdPriceNow : xrdPriceAt
	const isLoading =
		isLoadingAccounts ||
		isLoadingValidatorsAt ||
		isLoadingValidatorsBefore ||
		isLoadingPoolsAt ||
		isLoadingPoolsBefore ||
		isLoadingKnownAddresses ||
		isLoadingXrdPriceNow ||
		isLoadingXrdPriceAt ||
		isLoadingXrdPriceBefore

	const queryFn = (): Balances => {
		const validators = Object.keys(validatorsAt || {}).reduce((map, addr) => {
			map[addr] = {
				at: validatorsAt[addr],
				before: validatorsBefore[addr] || undefined,
			}
			return map
		}, {})

		const pools = Object.keys(poolsAt || {}).reduce((map, addr) => {
			map[addr] = {
				at: poolsAt[addr],
				before: poolsBefore[addr] || undefined,
			}
			return map
		}, {})

		let fungible: ResourceBalances = {}
		let nonFungible: ResourceBalances = {}
		accounts.forEach(({ fungible_resources, non_fungible_resources }) => {
			fungible = fungible_resources.items.reduce(
				transformFungibleResourceItemResponse(knownAddresses, xrdPrice, xrdPriceBefore, tokens, validators, pools),
				fungible,
			)
			nonFungible = non_fungible_resources.items.reduce(
				transformNonFungibleResourceItemResponse(validators, pools),
				nonFungible,
			)
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
	}

	const result = useQuery({
		queryKey: [
			'useBalances',
			networkId,
			accountAddresses,
			knownAddresses,
			xrdPrice,
			xrdPriceBefore,
			validatorsAt,
			validatorsBefore,
			poolsAt,
			poolsBefore,
			tokens,
		],
		queryFn,
		enabled: !isLoading,
	})
	return {
		...result,
		data: result.data || emptyState,
		isLoading: result.isLoading || isLoading,
	}
}

export const useAccountValues = (at: Date = new Date()) => {
	const networkId = useNetworkId()
	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))

	const accountAddresses = useSelectedAccounts()
	const { data: knownAddresses } = useKnownAddresses()

	const { data: xrdPriceNow } = useXRDCurrentPrice(currency)
	const { data: xrdPriceAt } = useXRDPriceOnDay(currency, at)
	const xrdPrice = formatDate(at) === formatDate(new Date()) ? xrdPriceNow : xrdPriceAt

	const tokens = useTokens()
	const { data: accounts } = useEntitiesDetails(accountAddresses, undefined, undefined, at)
	const { data: pools } = usePools(accounts, at)
	const { data: validators } = useValidators(accounts, at)

	const queryFn = () => {
		const validatorsMap = Object.keys(validators || {}).reduce((map, addr) => {
			map[addr] = {
				at: validators[addr],
			}
			return map
		}, {})

		const poolsMap = Object.keys(pools || {}).reduce((map, addr) => {
			map[addr] = {
				at: pools[addr],
			}
			return map
		}, {})

		return accounts.reduce(
			(container, account) => ({
				...container,
				[account.address]: Object.values(
					account.fungible_resources.items.reduce(
						transformFungibleResourceItemResponse(knownAddresses, xrdPrice, 0, tokens, validatorsMap, poolsMap),
						{},
					),
				).reduce((total: number, balance: ResourceBalance[ResourceBalanceType.FUNGIBLE]) => total + balance.value, 0),
			}),
			{},
		)
	}

	const result = useQuery({
		queryKey: ['useAccountValues', networkId, knownAddresses, xrdPrice, accounts, tokens, pools, validators],
		queryFn,
		enabled: !!knownAddresses && !!accounts && !!tokens && !!xrdPrice,
	})
	return result.data || {}
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
