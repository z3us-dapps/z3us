import { useQuery } from '@tanstack/react-query'

import { useNoneSharedStore } from '../use-store'
import { useGatewayClient } from './use-gateway-client'

export const useNetworkConfiguration = () => {
	const { status } = useGatewayClient()!
	const { gatewayBaseUrl } = useNoneSharedStore(state => ({
		gatewayBaseUrl: state.gatewayBaseUrl,
	}))

	return useQuery({
		queryKey: ['useNetworkConfiguration', gatewayBaseUrl],
		queryFn: () => status.getNetworkConfiguration(),
		enabled: !!status,
	})
}
