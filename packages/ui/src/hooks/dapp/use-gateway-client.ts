import { GatewayApiClient } from '@radixdlt/babylon-gateway-api-sdk'
import { useEffect, useState } from 'react'

import { useNoneSharedStore } from '../use-store'

export const useGatewayClient = () => {
	const { gatewayBaseUrl } = useNoneSharedStore(state => ({
		gatewayBaseUrl: state.gatewayBaseUrl,
	}))
	const [state, setState] = useState<GatewayApiClient>(GatewayApiClient.initialize({ basePath: gatewayBaseUrl }))

	useEffect(() => {
		setState(
			GatewayApiClient.initialize({
				basePath: gatewayBaseUrl,
			}),
		)
	}, [gatewayBaseUrl])

	return state
}
