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

// import {
// 	type FungibleResourcesCollectionItemGloballyAggregated,
// 	type NonFungibleResourcesCollectionItemGloballyAggregated,
// } from '@radixdlt/babylon-gateway-api-sdk'
// import BigNumber from 'bignumber.js'
// import { useMemo } from 'react'

// import { useXRDPriceOnDay } from 'ui/src/hooks/queries/market'
// import { useTokens } from 'ui/src/hooks/queries/oci'
// import { useNoneSharedStore } from 'ui/src/hooks/use-store'
// import { resourceBalanceFromEntityMetadataItems } from 'ui/src/services/metadata'
// import type { ResourceBalance } from 'ui/src/types/types'
// import { ResourceBalanceType } from 'ui/src/types/types'

// import { useAccounts } from './use-accounts'
// import { useEntitiesMetadata, useEntityMetadata } from './use-entity-metadata'
// import { useNetworkId } from './use-network-id'

// export const useResourceBalance = (
// 	resourceAddress: string,
// 	resourceType: ResourceBalanceType,
// 	amount: BigNumber,
// 	atDate: Date = new Date(),
// ): { data: ResourceBalance; isLoading: boolean } => {
// 	const networkId = useNetworkId()
// 	const { currency } = useNoneSharedStore(state => ({
// 		currency: state.currency,
// 		selectedAccount: state.selectedAccount,
// 	}))
// 	const { data: tokens, isLoading: isLoadingTokens, fetchStatus: fetchTokensStatus } = useTokens()
// 	const { data: price, isLoading: isLoadingPrice, fetchStatus: fetchPriceStatus } = useXRDPriceOnDay(currency, atDate)
// 	const {
// 		data: metadata,
// 		isLoading: isLoadingMetadata,
// 		fetchStatus: fetchMetadataStatus,
// 	} = useEntityMetadata(resourceAddress)

// 	return useMemo(
// 		() => ({
// 			isLoading: isLoadingPrice || isLoadingTokens || isLoadingMetadata,
// 			data: resourceBalanceFromEntityMetadataItems(
// 				resourceAddress,
// 				resourceType,
// 				amount,
// 				new BigNumber(price || 0),
// 				metadata,
// 				tokens,
// 			),
// 		}),
// 		[
// 			networkId,
// 			isLoadingTokens,
// 			fetchTokensStatus,
// 			isLoadingPrice,
// 			fetchPriceStatus,
// 			isLoadingMetadata,
// 			fetchMetadataStatus,
// 		],
// 	)
// }

// export const useGlobalResourceBalances = (forAccount?: string) => {
// 	const networkId = useNetworkId()
// 	const { selectedAccount, currency } = useNoneSharedStore(state => ({
// 		currency: state.currency,
// 		selectedAccount: state.selectedAccount,
// 	}))

// 	forAccount = forAccount || selectedAccount
// 	const {
// 		data: accounts = [],
// 		isLoading: isLoadingAccounts,
// 		fetchStatus: fetchAccountsStatus,
// 	} = useAccounts(forAccount ? { [forAccount]: true } : null)

// 	const {
// 		data: xrdPrice,
// 		isLoading: isLoadingPrice,
// 		fetchStatus: fetchPriceStatus,
// 	} = useXRDPriceOnDay(currency, new Date())
// 	const { data: tokens, isLoading: isLoadingTokens, fetchStatus: fetchTokensStatus } = useTokens()

// 	console.log('accounts', accounts)

// 	const fungibleBalances = useMemo(
// 		(): { [key: string]: BigNumber } =>
// 			accounts.reduce(
// 				(container, account) => ({
// 					...container,
// 					...account.fungible_resources.items.reduce(
// 						(innerContainer, item: FungibleResourcesCollectionItemGloballyAggregated) => ({
// 							...innerContainer,
// 							[item.resource_address]: new BigNumber(item.amount).plus(innerContainer[item.resource_address] || 0),
// 						}),
// 						container,
// 					),
// 				}),
// 				{},
// 			),
// 		[isLoadingAccounts, fetchAccountsStatus],
// 	)

// 	const fungibleMetadata = useEntitiesMetadata(Object.keys(fungibleBalances))
// 	const isLoadingFungibleMetadata = fungibleMetadata.find(m => m.isLoading) || false

// 	const [fungibleValue, fungibleResourceBalances] = useMemo(() => {
// 		let value = new BigNumber(0)
// 		const balances = Object.entries(fungibleBalances).reduce((container, [address, amount], idx) => {
// 			const { data, isLoading, isSuccess } = isLoadingFungibleMetadata[idx] || {}
// 			if (isLoading || !isSuccess) return container

// 			const balance = resourceBalanceFromEntityMetadataItems(
// 				address,
// 				ResourceBalanceType.FUNGIBLE,
// 				amount,
// 				new BigNumber(xrdPrice || 0),
// 				data,
// 				tokens,
// 			)
// 			value = value.plus(balance.value)

// 			return {
// 				...container,
// 				[address]: balance,
// 			}
// 		}, {})
// 		return [value, balances]
// 	}, [networkId, isLoadingTokens, fetchTokensStatus, isLoadingPrice, fetchPriceStatus, isLoadingFungibleMetadata])

// 	const nonFungibleBalances = useMemo(
// 		(): { [key: string]: BigNumber } =>
// 			accounts.reduce(
// 				(container, account) => ({
// 					...container,
// 					...account.non_fungible_resources.items.reduce(
// 						(innerContainer, item: NonFungibleResourcesCollectionItemGloballyAggregated) => ({
// 							...innerContainer,
// 							[item.resource_address]: new BigNumber(item.amount).plus(innerContainer[item.resource_address] || 0),
// 						}),
// 						container,
// 					),
// 				}),
// 				{},
// 			),
// 		[isLoadingAccounts, fetchAccountsStatus],
// 	)

// 	const nonFungibleMetadata = useEntitiesMetadata(Object.keys(nonFungibleBalances))
// 	const isLoadingNonFungibleMetadata = fungibleMetadata.find(m => m.isLoading) || false

// 	const [nonFungibleValue, nonFungibleResourceBalances] = useMemo(() => {
// 		let value = new BigNumber(0)
// 		const balances = Object.entries(nonFungibleBalances).reduce((container, [address, amount], idx) => {
// 			const { data, isLoading, isSuccess } = nonFungibleMetadata[idx] || {}
// 			if (isLoading || !isSuccess) return container

// 			const balance = resourceBalanceFromEntityMetadataItems(
// 				address,
// 				ResourceBalanceType.NON_FUNGIBLE,
// 				amount,
// 				new BigNumber(xrdPrice || 0),
// 				data,
// 				tokens,
// 			)
// 			value = value.plus(balance.value)

// 			return {
// 				...container,
// 				[address]: balance,
// 			}
// 		}, {})
// 		return [value, balances]
// 	}, [networkId, isLoadingTokens, fetchTokensStatus, isLoadingPrice, fetchPriceStatus, isLoadingNonFungibleMetadata])

// 	console.log('fungibleResourceBalances', fungibleResourceBalances)
// 	console.log('nonFungibleResourceBalances', nonFungibleResourceBalances)

// 	const response = useMemo(() => {
// 		let fungibleChange = new BigNumber(0)
// 		let nonFungibleChange = new BigNumber(0)

// 		const balances: ResourceBalance[] = Object.values({
// 			...fungibleResourceBalances,
// 			...nonFungibleResourceBalances,
// 		})

// 		const totalValue = fungibleValue.plus(nonFungibleValue)
// 		const totalChange = balances.reduce((change: BigNumber, balance: ResourceBalance) => {
// 			switch (balance.type) {
// 				case ResourceBalanceType.FUNGIBLE:
// 					fungibleChange = fungibleChange.plus(
// 						new BigNumber(balance.change).div(fungibleValue.dividedBy(balance.value)),
// 					)
// 					break
// 				case ResourceBalanceType.NON_FUNGIBLE:
// 					nonFungibleChange = nonFungibleChange.plus(
// 						new BigNumber(balance.change).div(nonFungibleValue.dividedBy(balance.value)),
// 					)
// 					break
// 				default:
// 					break
// 			}

// 			return change.plus(new BigNumber(balance.change).div(totalValue.dividedBy(balance.value)))
// 		}, new BigNumber(0))

// 		return { balances, totalValue, fungibleValue, nonFungibleValue, totalChange, fungibleChange, nonFungibleChange }
// 	}, [networkId, fetchAccountsStatus, fetchAccountsStatus, fetchTokensStatus, fetchPriceStatus])

// 	return {
// 		...response,
// 		isLoading:
// 			isLoadingAccounts ||
// 			isLoadingTokens ||
// 			isLoadingPrice ||
// 			isLoadingFungibleMetadata ||
// 			isLoadingNonFungibleMetadata,
// 	}
// }