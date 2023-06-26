import type { FungibleResourcesCollectionItemGloballyAggregated } from '@radixdlt/babylon-gateway-api-sdk'
import BigNumber from 'bignumber.js'
import { useMemo } from 'react'

import { useXRDPriceOnDay } from '../queries/market'
import { useTokens } from '../queries/oci'
import { useNoneSharedStore } from '../use-store'
import { useAccounts } from './use-accounts'
import { useEntitiesMetadata } from './use-metadata'

type SelectedAdresses = { [address: string]: null } | null

type ResourceBalance = {
	address: string
	amount: BigNumber
	value: BigNumber
	symbol: string
	name: string
	description?: string
	url?: string
	change: number
}

export const useResourceBalances = (selected: SelectedAdresses = null) => {
	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))
	const { data = [] } = useAccounts(selected)
	const { data: price } = useXRDPriceOnDay(currency, new Date())

	const currencyConverter = (amount: BigNumber, priceInXrd: BigNumber): BigNumber =>
		amount.multipliedBy(priceInXrd).multipliedBy(price)

	const resourceToBalanceMap = data.reduce((container, { fungible_resources }) => {
		fungible_resources.items.forEach((fungible: FungibleResourcesCollectionItemGloballyAggregated) => {
			container[fungible.resource_address] = new BigNumber(fungible.amount)
		})

		return container
	}, {})

	const resourceAddresses = Object.keys(resourceToBalanceMap)
	const metadatas = useEntitiesMetadata(resourceAddresses)
	const { data: tokens } = useTokens()

	return useMemo(
		() =>
			Object.entries(resourceToBalanceMap).map(([address, amount], idx) => {
				const metadata = metadatas[idx]
				const symbol = metadata.data.find(detail => detail.key === 'symbol')?.value.as_string
				const token = tokens[symbol.toUpperCase()]

				return {
					address,
					amount: amount as BigNumber,
					value: currencyConverter(amount as BigNumber, new BigNumber(token?.price.xrd || 0)),
					symbol,
					name: metadata.data.find(detail => detail.key === 'name')?.value.as_string,
					description: metadata.data.find(detail => detail.key === 'description')?.value.as_string,
					url: metadata.data.find(detail => detail.key === 'url')?.value.as_string,
					change: token ? +(token.price.usd || 0) / +(token.price.usd_24h || 0) : 0,
				} as ResourceBalance
			}),
		[currency, price, resourceAddresses],
	)
}

export const useTotalBalance = (selected: SelectedAdresses = null) => {
	const balances = useResourceBalances(selected)

	return useMemo(() => {
		const totalValue = balances.reduce((value, balance) => value.plus(balance.value), new BigNumber(0))

		const totalChange = balances.reduce(
			(change, balance) => change.plus(new BigNumber(balance.change).div(totalValue.dividedBy(balance.value))),
			new BigNumber(0),
		)

		return [totalValue, totalChange]
	}, [balances])
}
