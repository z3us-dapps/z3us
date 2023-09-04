import { useQuery } from '@tanstack/react-query'

import { useGatewayClient } from './use-gateway-client'
import { useNetworkId } from './use-network-id'

export const useEntityNonFungibleIds = (
	address: string,
	vault_address: string,
	resource_address: string,
	cursor: string = null,
	limit: number = null,
) => {
	const networkId = useNetworkId()
	const { state } = useGatewayClient()!

	return useQuery({
		queryKey: ['useEntityNonFungibleIds', networkId, address, vault_address, resource_address],
		queryFn: () =>
			state.innerClient
				.entityNonFungibleIdsPage({
					stateEntityNonFungibleIdsPageRequest: {
						address,
						vault_address,
						resource_address,
						cursor,
						limit_per_page: limit,
					},
				})
				.then(resp => resp.items),
		enabled: !!state && !!address,
	})
}
