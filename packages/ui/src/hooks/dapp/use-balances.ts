import {
	type FungibleResourcesCollectionItemGloballyAggregated,
	type NonFungibleResourcesCollectionItemGloballyAggregated,
} from '@radixdlt/babylon-gateway-api-sdk'
import BigNumber from 'bignumber.js'
import { useMemo } from 'react'

import { useXRDPriceOnDay } from 'ui/src/hooks/queries/market'
import { useTokens } from 'ui/src/hooks/queries/oci'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import { resourceBalanceFromEntityMetadataItems } from 'ui/src/services/metadata'
import type { ResourceBalance } from 'ui/src/types/types'
import { ResourceBalanceType } from 'ui/src/types/types'

import { useAccounts } from './use-accounts'
import { useEntityMetadata } from './use-entity-metadata'

export const useResourceBalance = (
	resourceAddress: string,
	resourceType: ResourceBalanceType,
	amount: BigNumber,
	atDate: Date = new Date(),
): { data: ResourceBalance; isLoading: boolean } => {
	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
		selectedAccount: state.selectedAccount,
	}))
	const { data: tokens, isLoading: isLoadingTokens, fetchStatus: fetchTokensStatus } = useTokens()
	const { data: price, isLoading: isLoadingPrice, fetchStatus: fetchPriceStatus } = useXRDPriceOnDay(currency, atDate)
	const {
		data: metadata,
		isLoading: isLoadingMetadata,
		fetchStatus: fetchMetadataStatus,
	} = useEntityMetadata(resourceAddress)

	return useMemo(
		() => ({
			isLoading: isLoadingPrice || isLoadingTokens || isLoadingMetadata,
			data: resourceBalanceFromEntityMetadataItems(
				resourceAddress,
				resourceType,
				amount,
				new BigNumber(price || 0),
				metadata,
				tokens,
			),
		}),
		[isLoadingTokens, fetchTokensStatus, isLoadingPrice, fetchPriceStatus, isLoadingMetadata, fetchMetadataStatus],
	)
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
		data: xrdPrice,
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
						const balance = resourceBalanceFromEntityMetadataItems(
							resource.resource_address,
							ResourceBalanceType.FUNGIBLE,
							new BigNumber(resource.amount || 0),
							new BigNumber(xrdPrice || 0),
							resource.explicit_metadata?.items,
							tokens,
						)
						fungibleValue = fungibleValue.plus(balance.value)
						return {
							...c,
							[resource.resource_address]: balance,
						}
					},
					container,
				)
				return non_fungible_resources.items.reduce(
					(c, resource: NonFungibleResourcesCollectionItemGloballyAggregated) => {
						const balance = resourceBalanceFromEntityMetadataItems(
							resource.resource_address,
							ResourceBalanceType.NON_FUNGIBLE,
							new BigNumber(resource.amount || 0),
							new BigNumber(xrdPrice || 0),
							resource.explicit_metadata?.items,
							tokens,
						)
						nonFungibleValue = nonFungibleValue.plus(balance.value)
						return {
							...c,
							[resource.resource_address]: balance,
						}
					},
					container,
				)
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

	return {
		...response,
		isLoading: isLoadingAccounts || isLoadingTokens || isLoadingPrice,
	}
}
