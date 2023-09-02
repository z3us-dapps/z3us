import { GatewayApiClient } from '@radixdlt/babylon-gateway-api-sdk'
import { useEffect, useState } from 'react'

import { DAPP_NAME } from 'ui/src/constants/dapp'

import { useNoneSharedStore } from '../use-store'

export const useGatewayClient = () => {
	const { gatewayBaseUrl } = useNoneSharedStore(state => ({
		gatewayBaseUrl: state.gatewayBaseUrl,
	}))
	const [state, setState] = useState<GatewayApiClient>(
		GatewayApiClient.initialize({
			basePath: gatewayBaseUrl,
			applicationName: DAPP_NAME,
		}),
	)

	useEffect(() => {
		setState(
			GatewayApiClient.initialize({
				basePath: gatewayBaseUrl,
				applicationName: DAPP_NAME,
			}),
		)
	}, [gatewayBaseUrl])

	return state
}
