import type { FungibleResourcesCollectionItemGloballyAggregated } from '@radixdlt/babylon-gateway-api-sdk'
import BigNumber from 'bignumber.js'
import { useMemo } from 'react'

import type { ResourceBalance, SelectedAddresses } from '../../types/types'
import { useXRDPriceOnDay } from '../queries/market'
import { useTokens } from '../queries/oci'
import { useNoneSharedStore } from '../use-store'
import { useAccounts } from './use-accounts'
import { useEntitiesMetadata } from './use-metadata'

export const useResourceBalances = (selected: SelectedAddresses = null) => {
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
	const metadata = useEntitiesMetadata(resourceAddresses)
	const { data: tokens } = useTokens()

	return useMemo(
		() =>
			Object.entries(resourceToBalanceMap).map(([address, amount], idx) => {
				const meta = metadata[idx].data

				const name = meta?.find(detail => detail.key === 'name')?.value.as_string
				const symbol = meta?.find(detail => detail.key === 'symbol')?.value.as_string || name
				const imageUrl = meta?.find(detail => detail.key === 'icon_url' || detail.key === 'key_image_url')?.value
					.as_string
				const url = meta?.find(detail => detail.key === 'info_url')?.value.as_string
				const description = meta?.find(detail => detail.key === 'description')?.value.as_string

				const token = tokens[symbol?.toUpperCase()]

				return {
					address,
					amount: amount as BigNumber,
					value: currencyConverter(amount as BigNumber, new BigNumber(token?.price.xrd || 0)),
					symbol,
					name,
					description,
					url,
					imageUrl,
					change: token ? +(token.price.usd || 0) / +(token.price.usd_24h || 0) : 0,
				} as ResourceBalance
			}),
		[currency, price, resourceAddresses],
	)
}

export const useTotalBalance = (selected: SelectedAddresses = null) => {
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
