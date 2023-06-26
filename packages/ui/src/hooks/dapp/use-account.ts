import { useQuery } from '@tanstack/react-query'

import { useGatewayClient } from './use-gateway-client'

export const useAccount = (accountAddress: string) => {
	const { state } = useGatewayClient()!

	return useQuery({
		queryKey: ['useAccount', accountAddress],
		queryFn: () => state.getEntityDetailsVaultAggregated(accountAddress),
		enabled: !!state,
	})
}
