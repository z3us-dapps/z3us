import { NonFungibleIdType } from '@radixdlt/babylon-gateway-api-sdk'
import { useQueries, useQuery } from '@tanstack/react-query'

import { useGatewayClient } from './use-gateway-client'
import { useNetworkId } from './use-network-id'

export const useNonFungibleIds = (
	account: string,
	resource: string,
	vaults: string[] = [],
	cursor: string = null,
	limit: number = null,
) => {
	const networkId = useNetworkId()
	const { state } = useGatewayClient()!

	const queries = vaults.map(vault => ({
		queryKey: ['useNonFungibleIds', networkId, account, resource, vault],
		queryFn: () =>
			state.innerClient
				.entityNonFungibleIdsPage({
					stateEntityNonFungibleIdsPageRequest: {
						address: account,
						resource_address: resource,
						vault_address: vault,
						cursor,
						limit_per_page: limit,
					},
				})
				.then(resp => resp.items),
		enabled: !!state && !!account && !!resource && !!vault,
	}))

	return useQueries({ queries })
}

export const useNonFungibleCollection = (address: string, cursor: string = null, limit: number = null) => {
	const networkId = useNetworkId()
	const { state } = useGatewayClient()!

	return useQuery({
		queryKey: ['useNonFungibleCollection', networkId, address],
		queryFn: () =>
			state.innerClient
				.nonFungibleCollection({
					stateNonFungibleCollectionRequest: {
						resource_address: address,
						cursor,
						limit_per_page: limit,
					},
				})
				.then(resp => resp.non_fungible_ids.items),
		enabled: !!state && !!address,
	})
}

export const useNonFungibleData = (address: string, id: string) => {
	const networkId = useNetworkId()
	const { state } = useGatewayClient()!

	return useQuery({
		queryKey: ['useNonFungibleData', networkId, address, id],
		queryFn: () =>
			state.innerClient
				.nonFungibleData({
					stateNonFungibleDataRequest: {
						resource_address: address,
						non_fungible_ids: [id],
					},
				})
				.then(resp => resp.non_fungible_ids[0]),
		enabled: !!state && !!address && !!id,
	})
}
