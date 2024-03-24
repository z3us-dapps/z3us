import { useQuery } from '@tanstack/react-query'

import { useNetworkId } from '../dapp/use-network'
import { useRns } from './use-rns'

export const useDomainDiscovery = (address: string) => {
	const networkId = useNetworkId()
	const rns = useRns()!

	return useQuery({
		queryKey: ['rns', 'useDomainDiscovery', networkId, address],
		queryFn: () => rns.getAccountDomains(address),
		enabled: !!address && !!networkId,
	})
}
