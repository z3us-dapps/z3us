import type {
	FungibleResourcesCollectionItemGloballyAggregated,
	NonFungibleResourcesCollectionItemGloballyAggregated,
} from '@radixdlt/babylon-gateway-api-sdk'
import BigNumber from 'bignumber.js'
import { useMemo } from 'react'

import type { Token } from 'ui/src/services/swap/oci'

import type { ResourceBalance } from '../../types/types'
import { ResourceBalanceType } from '../../types/types'
import { useXRDPriceOnDay } from '../queries/market'
import { useTokens } from '../queries/oci'
import { useNoneSharedStore } from '../use-store'
import { useAccounts } from './use-accounts'

const resourceToBalance = (
	resource: FungibleResourcesCollectionItemGloballyAggregated | NonFungibleResourcesCollectionItemGloballyAggregated,
	type: ResourceBalanceType,
	price: number,
	tokens: { [symbol: string]: Token },
): ResourceBalance => {
	const amount = new BigNumber(resource.amount)

	const name = resource.explicit_metadata?.items.find(detail => detail.key === 'name')?.value.as_string
	const symbol = resource.explicit_metadata?.items.find(detail => detail.key === 'symbol')?.value.as_string || name
	const imageUrl = resource.explicit_metadata?.items.find(
		detail => detail.key === 'icon_url' || detail.key === 'key_image_url',
	)?.value.as_string
	const url = resource.explicit_metadata?.items.find(detail => detail.key === 'info_url')?.value.as_string
	const description = resource.explicit_metadata?.items.find(detail => detail.key === 'description')?.value.as_string

	const token = tokens[symbol?.toUpperCase()]

	return {
		address: resource.resource_address,
		amount: amount as BigNumber,
		value: (amount as BigNumber).multipliedBy(new BigNumber(token?.price.xrd || 0)).multipliedBy(price),
		symbol,
		name,
		description,
		url,
		imageUrl,
		change: token ? +(token.price.usd || 0) / +(token.price.usd_24h || 0) : 0,
		type,
	}
}

export const useGlobalResourceBalances = (forAccount?: string) => {
	const { selectedAccount, currency } = useNoneSharedStore(state => ({
		currency: state.currency,
		selectedAccount: state.selectedAccount,
	}))

	forAccount = forAccount || selectedAccount
	const {
		data: accounts = [],
		isLoading: isLoadingAccounts,
		fetchStatus: fetchAccountsStatus,
	} = useAccounts(forAccount ? { [forAccount]: true } : null)

	const {
		data: price,
		isLoading: isLoadingPrice,
		fetchStatus: fetchPriceStatus,
	} = useXRDPriceOnDay(currency, new Date())
	const { data: tokens, isLoading: isLoadingTokens, fetchStatus: fetchTokensStatus } = useTokens()

	const response = useMemo(() => {
		let fungibleValue = new BigNumber(0)
		let nonFungibleValue = new BigNumber(0)
		const data: { [address: string]: ResourceBalance } = accounts.reduce(
			(container, { fungible_resources, non_fungible_resources }) => {
				container = fungible_resources.items.reduce(
					(c, resource: FungibleResourcesCollectionItemGloballyAggregated) => {
						const balance = resourceToBalance(resource, ResourceBalanceType.FUNGIBLE, price, tokens)
						fungibleValue = fungibleValue.plus(balance.value)
						return {
							...c,
							[resource.resource_address]: balance,
						}
					},
					container,
				)
				return non_fungible_resources.items.reduce((c, resource: FungibleResourcesCollectionItemGloballyAggregated) => {
					const balance = resourceToBalance(resource, ResourceBalanceType.NON_FUNGIBLE, price, tokens)
					nonFungibleValue = nonFungibleValue.plus(balance.value)
					return {
						...c,
						[resource.resource_address]: balance,
					}
				}, container)
			},
			{},
		)

		const balances = Object.values(data)

		let fungibleChange = new BigNumber(0)
		let nonFungibleChange = new BigNumber(0)

		const totalValue = fungibleValue.plus(nonFungibleValue)
		const totalChange = balances.reduce((change, balance) => {
			switch (balance.type) {
				case ResourceBalanceType.FUNGIBLE:
					fungibleChange = fungibleChange.plus(
						new BigNumber(balance.change).div(fungibleValue.dividedBy(balance.value)),
					)
					break
				case ResourceBalanceType.NON_FUNGIBLE:
					nonFungibleChange = nonFungibleChange.plus(
						new BigNumber(balance.change).div(nonFungibleValue.dividedBy(balance.value)),
					)
					break
				default:
					break
			}

			return change.plus(new BigNumber(balance.change).div(totalValue.dividedBy(balance.value)))
		}, new BigNumber(0))

		return { balances, totalValue, fungibleValue, nonFungibleValue, totalChange, fungibleChange, nonFungibleChange }
	}, [fetchAccountsStatus, fetchAccountsStatus, fetchTokensStatus, fetchPriceStatus])

	return { ...response, isLoading: isLoadingAccounts || isLoadingTokens || isLoadingPrice }
}
