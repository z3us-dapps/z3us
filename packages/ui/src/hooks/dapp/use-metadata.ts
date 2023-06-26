import { useQueries, useQuery } from '@tanstack/react-query'

import { useGatewayClient } from './use-gateway-client'

export const useEntityMetadata = (address: string) => {
	const { state } = useGatewayClient()!

	return useQuery({
		queryKey: ['useEntityMetadata', address],
		queryFn: () =>
			state.innerClient
				.entityMetadataPage({
					stateEntityMetadataPageRequest: { address },
				})
				.then(resp => resp.items),
		enabled: !!state,
	})
}

export const useEntitiesMetadata = (addresses: string[]) => {
	const { state } = useGatewayClient()!

	const queries = addresses.map(address => ({
		queryKey: ['useEntityMetadata', address],
		queryFn: () =>
			state.innerClient
				.entityMetadataPage({
					stateEntityMetadataPageRequest: { address },
				})
				.then(resp => resp.items),
		enabled: !!state,
	}))
	return useQueries({ queries })
}
