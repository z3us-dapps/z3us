import { useQuery } from '@tanstack/react-query'

import { useNetworkId } from '../dapp/use-network'
import { useRns } from './use-rns'

export const useDomainResolution = (domain: string, context: string = 'website', directive: string = 'navigation') => {
	const networkId = useNetworkId()
	const rns = useRns()!

	return useQuery({
		queryKey: ['rns', 'useDomainResolution', networkId, domain, context, directive],
		queryFn: () => rns.resolveRecord({ domain, context, directive }),
		enabled: !!domain && domain.endsWith('.xrd') && !!networkId,
	})
}
