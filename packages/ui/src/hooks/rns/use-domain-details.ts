import { useQuery } from '@tanstack/react-query'

import { useNetworkId } from '../dapp/use-network'
import { useRns } from './use-rns'

export const useDomainDetails = (domain: string) => {
	const networkId = useNetworkId()
	const rns = useRns()!

	return useQuery({
		queryKey: ['rns', 'useDomainDetails', networkId, domain],
		queryFn: () => rns.getDomainDetails(domain),
		enabled: !!domain && domain.endsWith('.xrd') && !!networkId,
	})
}
