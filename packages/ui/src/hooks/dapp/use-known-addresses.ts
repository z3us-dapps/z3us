import { RadixEngineToolkit } from '@radixdlt/radix-engine-toolkit'
import { useQuery } from '@tanstack/react-query'

import { useNetworkId } from './use-network'

export const knownAddressesQuery = networkId => ({
	queryKey: ['useKnownAddresses', networkId],
	queryFn: () => RadixEngineToolkit.Utils.knownAddresses(networkId),
	staleTime: 1000 * 60 * 60 * 24, // 1 day
})

export const useKnownAddresses = () => {
	const networkId = useNetworkId()

	return useQuery(knownAddressesQuery(networkId))
}
