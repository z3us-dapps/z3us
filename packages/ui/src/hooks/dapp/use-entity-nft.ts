import { useInfiniteQuery, useQueries, useQuery } from '@tanstack/react-query'

import { splitArrayIntoChunks } from 'ui/src/utils/array-chunk'
import { formatDateTime } from 'ui/src/utils/date'

import { useAccountNftVaults } from './use-balances'
import { useGatewayClient } from './use-gateway-client'
import { useNetworkId } from './use-network'

export const useNonFungibleCollection = (resourceId: string) => {
	const { state } = useGatewayClient()!
	const networkId = useNetworkId()

	return useInfiniteQuery({
		queryKey: ['useNonFungibleCollection', networkId, resourceId],
		queryFn: async ({ pageParam: lastPage }) =>
			state.innerClient.nonFungibleIds({
				stateNonFungibleIdsRequest: {
					limit_per_page: 5,
					resource_address: resourceId,
					cursor: lastPage?.non_fungible_ids.next_cursor || null,
					at_ledger_state: lastPage?.non_fungible_ids.next_cursor
						? {
								state_version: lastPage.ledger_state.state_version,
						  }
						: null,
				},
			}),
		getNextPageParam: lastPage => (lastPage.non_fungible_ids.next_cursor ? lastPage : undefined),
		enabled: !!resourceId && !!state,
	})
}

export const useNonFungibleIds = (resourceId: string, addresses: string[], at: Date = new Date()) => {
	const { state } = useGatewayClient()!
	const networkId = useNetworkId()
	const { data: vaults = [], isLoading } = useAccountNftVaults(resourceId, addresses, at)
	const vaultAddresses = vaults.map(vault => vault.vault)

	return useInfiniteQuery({
		queryKey: ['useNonFungibleIds', networkId, resourceId, addresses, vaultAddresses, formatDateTime(at)],
		queryFn: async ({ pageParam }) => {
			const responses = await Promise.all(
				vaults.map(({ account, vault, resource }, idx) =>
					pageParam?.[idx].next_cursor === null
						? { items: [], next_cursor: null, ledger_state: null }
						: state.innerClient.entityNonFungibleIdsPage({
								stateEntityNonFungibleIdsPageRequest: {
									address: account,
									resource_address: resource,
									vault_address: vault,
									limit_per_page: 5,
									cursor: pageParam?.[idx].next_cursor || null,
									at_ledger_state: pageParam?.[idx].next_cursor
										? {
												state_version: pageParam?.[idx].ledger_state.state_version,
										  }
										: null,
								},
						  }),
				),
			)

			const aggregatedResult = responses.reduce(
				(accumulator, response) => {
					accumulator.items.push(...response.items)
					accumulator.pageParams.push({
						next_cursor: response.next_cursor || null,
						ledger_state: response.ledger_state,
					})
					return accumulator
				},
				{ items: [], pageParams: [] },
			)

			return aggregatedResult
		},
		getNextPageParam: lastPage =>
			lastPage.pageParams?.filter(({ next_cursor }) => next_cursor !== null).length > 0
				? lastPage.pageParams
				: undefined,
		enabled: !!resourceId && !!state && !isLoading && vaults.length > 0,
	})
}

export const useNonFungibleData = (collection: string, id: string) => {
	const networkId = useNetworkId()
	const { state } = useGatewayClient()!

	return useQuery({
		queryKey: ['useNonFungibleData', networkId, collection, id],
		queryFn: () =>
			state.innerClient
				.nonFungibleData({
					stateNonFungibleDataRequest: {
						resource_address: collection,
						non_fungible_ids: [id],
					},
				})
				.then(resp => ({ ...resp.non_fungible_ids[0], collection })),
		enabled: !!state && !!collection && !!id,
	})
}

export const useNonFungiblesData = (collection: string, ids: string[]) => {
	const networkId = useNetworkId()
	const { state } = useGatewayClient()!

	const queries = splitArrayIntoChunks(ids, 20).map(chunk => ({
		queryKey: ['useNonFungiblesData', networkId, collection, chunk],
		queryFn: () =>
			state.innerClient
				.nonFungibleData({
					stateNonFungibleDataRequest: {
						resource_address: collection,
						non_fungible_ids: chunk,
					},
				})
				.then(resp => resp.non_fungible_ids.map(d => ({ ...d, collection }))),
		enabled: !!state && !!collection && chunk.length > 0,
	}))

	const results = useQueries({ queries })
	return results.reduce(
		(container, result) => ({
			data: container.data.concat(result.data || []),
			isLoading: container.isLoading || result.isLoading,
		}),
		{ data: [], isLoading: false },
	)
}

export const useNonFungibleLocation = (collection: string, id: string) => {
	const networkId = useNetworkId()
	const { state } = useGatewayClient()!

	return useQuery({
		queryKey: ['useNonFungibleLocation', networkId, collection, id],
		queryFn: () =>
			state.innerClient.nonFungibleLocation({
				stateNonFungibleLocationRequest: {
					resource_address: collection,
					non_fungible_ids: [id],
				},
			}),
		enabled: !!state && !!collection && !!id,
	})
}
