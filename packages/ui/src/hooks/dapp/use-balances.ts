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

import { useAccounts, useSelectedAccounts } from './use-accounts'
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

export const useFungibleResourceBalances = (forAccount?: string) => {
	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))
	const addresses = useSelectedAccounts()
	const { data: accounts = [], isLoading: isLoadingAccounts } = useAccounts(forAccount ? [forAccount] : addresses)

	const { data: xrdPrice, isLoading: isLoadingPrice } = useXRDPriceOnDay(currency, new Date())
	const { data: tokens, isLoading: isLoadingTokens } = useTokens()

	const response = useMemo(() => {
		let totalValue = new BigNumber(0)
		const data: { [address: string]: ResourceBalance } = accounts.reduce(
			(container, { fungible_resources }) =>
				fungible_resources.items.reduce((c, resource: FungibleResourcesCollectionItemGloballyAggregated) => {
					const amount = new BigNumber(resource.amount || 0)
					if (amount.isZero()) return c
					const balance = resourceBalanceFromEntityMetadataItems(
						resource.resource_address,
						ResourceBalanceType.FUNGIBLE,
						amount,
						new BigNumber(xrdPrice || 0),
						resource.explicit_metadata?.items,
						tokens,
					)
					totalValue = totalValue.plus(balance.value)
					return {
						...c,
						[resource.resource_address]: balance,
					}
				}, container),
			{},
		)

		const balances = Object.values(data)
		const totalChange = balances.reduce(
			(change, balance) => change.plus(balance.change.div(totalValue.dividedBy(balance.value))),
			new BigNumber(0),
		)

		return { balances, totalValue, totalChange }
	}, [accounts, xrdPrice, tokens])

	return {
		...response,
		isLoading: isLoadingAccounts || isLoadingTokens || isLoadingPrice,
	}
}

export const useNonFungibleResourceBalances = (forAccount?: string) => {
	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))

	const addresses = useSelectedAccounts()
	const { data: accounts = [], isLoading: isLoadingAccounts } = useAccounts(forAccount ? [forAccount] : addresses)

	const { data: xrdPrice, isLoading: isLoadingPrice } = useXRDPriceOnDay(currency, new Date())
	const { data: tokens, isLoading: isLoadingTokens } = useTokens()

	const response = useMemo(() => {
		let totalValue = new BigNumber(0)
		const data: { [address: string]: ResourceBalance } = accounts.reduce(
			(container, { non_fungible_resources }) =>
				non_fungible_resources.items.reduce((c, resource: NonFungibleResourcesCollectionItemGloballyAggregated) => {
					const amount = new BigNumber(resource.amount || 0)
					if (amount.isZero()) return c
					const balance = resourceBalanceFromEntityMetadataItems(
						resource.resource_address,
						ResourceBalanceType.NON_FUNGIBLE,
						amount,
						new BigNumber(xrdPrice || 0),
						resource.explicit_metadata?.items,
						tokens,
					)
					totalValue = totalValue.plus(balance.value)
					return {
						...c,
						[resource.resource_address]: balance,
					}
				}, container),
			{},
		)

		const balances = Object.values(data)
		const totalChange = balances.reduce(
			(change, balance) => change.plus(balance.change.div(totalValue.dividedBy(balance.value))),
			new BigNumber(0),
		)

		return { balances, totalValue, totalChange }
	}, [accounts, xrdPrice, tokens])

	return {
		...response,
		isLoading: isLoadingAccounts || isLoadingTokens || isLoadingPrice,
	}
}

export const useGlobalResourceBalances = (forAccount?: string) => {
	const {
		balances: fungibleBalances,
		totalValue: fungibleValue,
		totalChange: fungibleChange,
		isLoading: fungibleIsLoading,
	} = useFungibleResourceBalances(forAccount)
	const {
		balances: nonFungibleBalances,
		totalValue: nonFungibleValue,
		totalChange: nonFungibleChange,
		isLoading: nonFungibleIsLoading,
	} = useNonFungibleResourceBalances(forAccount)

	const balances = [...(fungibleBalances || []), ...(nonFungibleBalances || [])]

	const totalValue = fungibleValue.plus(nonFungibleValue)
	const totalChange = balances.reduce(
		(change, balance) => change.plus(balance.change.div(totalValue.dividedBy(balance.value))),
		new BigNumber(0),
	)

	return {
		balances,
		fungibleBalances,
		nonFungibleBalances,
		totalValue,
		fungibleValue,
		nonFungibleValue,
		totalChange,
		fungibleChange,
		nonFungibleChange,
		isLoading: fungibleIsLoading || nonFungibleIsLoading,
	}
}
