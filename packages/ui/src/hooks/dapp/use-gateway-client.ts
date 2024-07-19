import { GatewayApiClient } from '@radixdlt/babylon-gateway-api-sdk'
import { useEffect, useState } from 'react'

import { DAPP_ADDRESS, DAPP_NAME, DAPP_VERSION } from 'ui/src/constants/dapp'

import { useNoneSharedStore } from '../use-store'

export const useGatewayClient = () => {
	const { gatewayBaseUrl } = useNoneSharedStore(state => ({
		gatewayBaseUrl: state.gatewayBaseUrl,
	}))
	const [state, setState] = useState<GatewayApiClient>(
		GatewayApiClient.initialize({
			basePath: gatewayBaseUrl,
			applicationName: DAPP_NAME,
			applicationDappDefinitionAddress: DAPP_ADDRESS,
			applicationVersion: DAPP_VERSION,
		}),
	)

	useEffect(() => {
		setState(
			GatewayApiClient.initialize({
				basePath: gatewayBaseUrl,
				applicationName: DAPP_NAME,
				applicationDappDefinitionAddress: DAPP_ADDRESS,
				applicationVersion: DAPP_VERSION,
			}),
		)
	}, [gatewayBaseUrl])

	return state
}
