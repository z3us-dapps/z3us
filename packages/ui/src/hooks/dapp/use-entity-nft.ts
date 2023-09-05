import { useQueries } from '@tanstack/react-query'

import { useGatewayClient } from './use-gateway-client'
import { useNetworkId } from './use-network-id'

export const useEntityNonFungibleIds = (
	account: string,
	resource: string,
	vaults: string[] = [],
	cursor: string = null,
	limit: number = null,
) => {
	const networkId = useNetworkId()
	const { state } = useGatewayClient()!

	const queries = vaults.map(vault => ({
		queryKey: ['useEntityNonFungibleIds', networkId, account, resource, vault],
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
