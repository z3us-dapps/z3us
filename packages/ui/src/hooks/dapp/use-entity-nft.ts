import { useInfiniteQuery, useQueries, useQuery } from '@tanstack/react-query'

import { splitArrayIntoChunks } from 'ui/src/utils/array-chunk'

import { useAccountNftVaults } from './use-balances'
import { useGatewayClient } from './use-gateway-client'
import { useNetworkId } from './use-network'

export const useNonFungibleIds = (resourceId: string, addresses: string[]) => {
	const { state } = useGatewayClient()!
	const networkId = useNetworkId()
	const { data: vaults = [], isLoading } = useAccountNftVaults(resourceId, addresses)

	return useInfiniteQuery({
		queryKey: ['useNonFungibleIds', networkId, resourceId, addresses],
		queryFn: async ({ pageParam }) => {
			const responses = await Promise.all(
				vaults.map(({ account, vault, resource }, idx) =>
					pageParam?.[idx] === null
						? { items: [], next_cursor: null }
						: state.innerClient.entityNonFungibleIdsPage({
								stateEntityNonFungibleIdsPageRequest: {
									address: account,
									resource_address: resource,
									vault_address: vault,
									cursor: pageParam?.[idx],
								},
						  }),
				),
			)

			const aggregatedResult = responses.reduce(
				(accumulator, response) => {
					accumulator.items.push(...response.items)
					accumulator.next_cursors.push(response.next_cursor || null)
					return accumulator
				},
				{ items: [], next_cursors: [] },
			)

			return aggregatedResult
		},
		getNextPageParam: lastPage =>
			lastPage.next_cursors?.filter(cursor => cursor !== null).length > 0 ? lastPage.next_cursors : undefined,
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
