import type {
	FungibleResourcesCollectionItemVaultAggregated,
	NonFungibleResourcesCollectionItemVaultAggregated,
} from '@radixdlt/radix-dapp-toolkit'
import BigNumber from 'bignumber.js'
import { useMemo } from 'react'

import { useXRDPriceOnDay } from 'ui/src/hooks/queries/market'
import { useTokens } from 'ui/src/hooks/queries/oci'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import { getStringMetadata } from 'ui/src/services/metadata'
import type { Token } from 'ui/src/services/oci'
import { ResourceBalanceType } from 'ui/src/types/types'
import type { ResourceBalance, ResourceBalances } from 'ui/src/types/types'

import { useEntitiesDetails } from './use-entity-details'

const ZERO = new BigNumber(0)

const transformFungibleResourceItemResponse =
	(xrdPrice: number, tokens: { [key: string]: Token }) =>
	(container: ResourceBalances, item: FungibleResourcesCollectionItemVaultAggregated): ResourceBalances => {
		const name = getStringMetadata('name', item.explicit_metadata?.items)
		const symbol = getStringMetadata('symbol', item.explicit_metadata?.items)
		const description = getStringMetadata('description', item.explicit_metadata?.items)
		const imageUrl = getStringMetadata('icon_url', item.explicit_metadata?.items)
		const url = getStringMetadata('info_url', item.explicit_metadata?.items)
		const validator = getStringMetadata('validator', item.explicit_metadata?.items)
		const pool = getStringMetadata('pool', item.explicit_metadata?.items)

		const amount = item.vaults.items.reduce(
			(acc, curr) => acc.plus(new BigNumber(curr.amount)),
			container[item.resource_address]?.amount || ZERO,
		)

		let tokenKey = symbol?.toLowerCase()
		if (!tokenKey && validator) tokenKey = 'xrd'
		const token = tokens?.[tokenKey] || null

		let change = new BigNumber(token ? +(token.price.usd.now || 0) / +(token.price.usd['24h'] || 0) : 0).dividedBy(100)
		if (!change.isFinite()) {
			change = ZERO
		}

		const details = {
			address: item.resource_address,
			amount,
			value: amount.multipliedBy(new BigNumber(token?.price.xrd.now || 0)).multipliedBy(xrdPrice),
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

	const amount = new BigNumber(item.vaults.items[0].total_count).plus(container[item.resource_address]?.amount || 0)

	container[item.resource_address] = {
		type: ResourceBalanceType.NON_FUNGIBLE,
		address: item.resource_address,
		vaults: item.vaults.items.map(vault => vault.vault_address),
		amount,
		name,
		description,
		url,
		imageUrl,
		value: ZERO,
		change: ZERO,
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
	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))
	const { data: xrdPrice, isLoading: isLoadingPrice } = useXRDPriceOnDay(currency, new Date())
	const { data: tokens, isLoading: isLoadingTokens } = useTokens()
	const { data: accounts = [], isLoading: isLoadingAccounts } = useEntitiesDetails(
		addresses.filter(address => !!address),
	)

	const values = useMemo(
		() =>
			accounts.reduce(
				(container, account) => ({
					...container,
					[account.address]: Object.values(
						account.fungible_resources.items.reduce(transformFungibleResourceItemResponse(xrdPrice, tokens), {}),
					).reduce(
						(total: BigNumber, balance: ResourceBalance[ResourceBalanceType.FUNGIBLE]) => total.plus(balance.value),
						ZERO,
					),
				}),
				{},
			),
		[accounts, xrdPrice, tokens],
	)

	return {
		values,
		isLoading: isLoadingAccounts || isLoadingTokens || isLoadingPrice,
	}
}

export const useBalances = (...addresses: string[]) => {
	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))
	const { data: xrdPrice, isLoading: isLoadingPrice } = useXRDPriceOnDay(currency, new Date())
	const { data: tokens, isLoading: isLoadingTokens } = useTokens()
	const { data: accounts = [], isLoading: isLoadingAccounts } = useEntitiesDetails(
		addresses.filter(address => !!address),
	)

	const response = useMemo(() => {
		let fungible: ResourceBalances = {}
		let nonFungible: ResourceBalances = {}
		accounts.forEach(({ fungible_resources, non_fungible_resources }) => {
			fungible = fungible_resources.items.reduce(transformFungibleResourceItemResponse(xrdPrice, tokens), fungible)
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
		const fungibleValue = fungibleBalances.reduce((total, balance) => total.plus(balance.value), ZERO)
		const fungibleChange = fungibleBalances.reduce(
			(change, balance) =>
				change.plus(
					balance.change.div(
						fungibleValue.eq(0) ? 1 : fungibleValue.dividedBy(balance.value.eq(0) ? 1 : balance.value),
					),
				),
			ZERO,
		)

		const nonFungibleBalances = Object.values(nonFungible)
		const nonFungibleValue = nonFungibleBalances.reduce((total, balance) => total.plus(balance.value), ZERO)
		const nonFungibleChange = nonFungibleBalances.reduce(
			(change, balance) =>
				change.plus(
					balance.change.div(
						nonFungibleValue.eq(0) ? 1 : nonFungibleValue.dividedBy(balance.value.eq(0) ? 1 : balance.value),
					),
				),
			ZERO,
		)

		const tokenBalances = Object.values(otherTokens)
		const tokensValue = tokenBalances.reduce((total, balance) => total.plus(balance.value), ZERO)
		const tokensChange = tokenBalances.reduce(
			(change, balance) =>
				change.plus(
					balance.change.div(tokensValue.eq(0) ? 1 : tokensValue.dividedBy(balance.value.eq(0) ? 1 : balance.value)),
				),
			ZERO,
		)

		const lpBalances = Object.values(lpTokens)
		const lpValue = lpBalances.reduce((total, balance) => total.plus(balance.value), ZERO)
		const lpChange = lpBalances.reduce(
			(change, balance) =>
				change.plus(balance.change.div(lpValue.eq(0) ? 1 : lpValue.dividedBy(balance.value.eq(0) ? 1 : balance.value))),
			ZERO,
		)

		const puBalances = Object.values(poolUnits)
		const puValue = puBalances.reduce((total, balance) => total.plus(balance.value), ZERO)
		const puChange = puBalances.reduce(
			(change, balance) =>
				change.plus(balance.change.div(puValue.eq(0) ? 1 : puValue.dividedBy(balance.value.eq(0) ? 1 : balance.value))),
			ZERO,
		)

		const balances = [...fungibleBalances, ...nonFungibleBalances]
		const totalValue = fungibleValue.plus(nonFungibleValue).plus(lpValue).plus(puValue)
		const totalChange = balances.reduce(
			(change, balance) =>
				change.plus(
					balance.change.div(totalValue.eq(0) ? 1 : totalValue.dividedBy(balance.value.eq(0) ? 1 : balance.value)),
				),
			ZERO,
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
	}, [accounts, xrdPrice, tokens])

	return {
		...response,
		isLoading: isLoadingAccounts || isLoadingTokens || isLoadingPrice,
	}
}
