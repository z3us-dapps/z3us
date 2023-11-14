import { RadixEngineToolkit } from '@radixdlt/radix-engine-toolkit'
import { useQuery } from '@tanstack/react-query'

import { useNetworkId } from './use-network-id'

export const useKnownAddresses = () => {
	const networkId = useNetworkId()

	return useQuery({
		queryKey: ['useKnownAddresses', networkId],
		queryFn: () => RadixEngineToolkit.Utils.knownAddresses(networkId),
		staleTime: 1000 * 60 * 60 * 24, // 1 day
	})
}
