import { useQueries, useQuery } from '@tanstack/react-query'

import { useGatewayClient } from './use-gateway-client'
import { useNetworkId } from './use-network-id'

export const useEntityMetadata = (address: string) => {
	const networkId = useNetworkId()
	const { state } = useGatewayClient()!

	return useQuery({
		queryKey: ['useEntityMetadata', networkId, address],
		queryFn: () =>
			state.innerClient
				.entityMetadataPage({
					stateEntityMetadataPageRequest: { address },
				})
				.then(resp => resp.items),
		enabled: !!state && !!address,
	})
}

export const useEntitiesMetadata = (addresses: string[]) => {
	const networkId = useNetworkId()
	const { state } = useGatewayClient()!

	const queries = addresses.map(address => ({
		queryKey: ['useEntityMetadata', networkId, address],
		queryFn: () =>
			state.innerClient
				.entityMetadataPage({
					stateEntityMetadataPageRequest: { address },
				})
				.then(resp => resp.items),
		enabled: !!state && !!address,
	}))

	return useQueries({ queries })
}
