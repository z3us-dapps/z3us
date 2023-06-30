import type { FungibleResourcesCollectionItemGloballyAggregated } from '@radixdlt/babylon-gateway-api-sdk'
import BigNumber from 'bignumber.js'
import { useMemo } from 'react'

import type { ResourceBalance, SelectedAddresses } from '../../types/types'
import { useXRDPriceOnDay } from '../queries/market'
import { useTokens } from '../queries/oci'
import { useNoneSharedStore } from '../use-store'
import { useAccounts } from './use-accounts'
import { useEntitiesMetadata } from './use-metadata'

export const useGlobalResourceBalances = (selected: SelectedAddresses = null) => {
	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))
	const { data: accounts = [], isLoading: isLoadingAccounts, fetchStatus: fetchAccountsStatus } = useAccounts(selected)

	const resourceToBalanceMap = useMemo(
		() =>
			accounts.reduce((container, { fungible_resources }) => {
				fungible_resources.items.forEach((fungible: FungibleResourcesCollectionItemGloballyAggregated) => {
					container[fungible.resource_address] = new BigNumber(fungible.amount)
				})

				return container
			}, {}),
		[fetchAccountsStatus],
	)

	const {
		data: price,
		isLoading: isLoadingPrice,
		fetchStatus: fetchPriceStatus,
	} = useXRDPriceOnDay(currency, new Date())
	const { data: tokens, isLoading: isLoadingTokens, fetchStatus: fetchTokensStatus } = useTokens()
	const metadata = useEntitiesMetadata(Object.keys(resourceToBalanceMap))
	const isLoadingMetadata = metadata.reduce((isLoading, meta) => isLoading || meta.isLoading, false)
	const fetchMetadataStatus = metadata.reduce((combinedStatus, meta) => `${combinedStatus}${meta.fetchStatus}`, '')

	const { balances, totalValue, totalChange } = useMemo(() => {
		const data = Object.entries(resourceToBalanceMap).map(([address, amount], idx) => {
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
				value: (amount as BigNumber).multipliedBy(new BigNumber(token?.price.xrd || 0)).multipliedBy(price),
				symbol,
				name,
				description,
				url,
				imageUrl,
				change: token ? +(token.price.usd || 0) / +(token.price.usd_24h || 0) : 0,
			} as ResourceBalance
		})

		const totalV = data.reduce((value, balance) => value.plus(balance.value), new BigNumber(0))

		const totalC = data.reduce(
			(change, balance) => change.plus(new BigNumber(balance.change).div(totalV.dividedBy(balance.value))),
			new BigNumber(0),
		)

		return { balances: data, totalValue: totalV, totalChange: totalC }
	}, [currency, fetchAccountsStatus, fetchTokensStatus, fetchPriceStatus, fetchMetadataStatus])

	return {
		balances,
		totalValue,
		totalChange,
		isLoading: isLoadingAccounts || isLoadingMetadata || isLoadingTokens || isLoadingPrice,
	}
}
