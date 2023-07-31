import type { EntityMetadataItem } from '@radixdlt/babylon-gateway-api-sdk'
import { useQueries, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { getEntityMetadataItemValue } from '../../services/metadata'
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

export const useMetadataValue = (keysOrKey: string[] | string, data?: EntityMetadataItem[]) => {
	const keys = Array.isArray(keysOrKey) ? keysOrKey : [keysOrKey]
	const isValidData = !!data

	return useMemo(
		() => (!isValidData ? null : getEntityMetadataItemValue(data?.find(detail => keys.includes(detail.key)))),
		[isValidData, ...keys],
	)
}
