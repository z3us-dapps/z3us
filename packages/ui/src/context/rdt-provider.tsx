import { RadixNetworkConfigById } from '@radixdlt/babylon-gateway-api-sdk'
import { DataRequestStateClient, RadixDappToolkit } from '@radixdlt/radix-dapp-toolkit'
import { GatewayClient } from '@radixdlt/radix-dapp-toolkit/types/gateway/gateway'
import { GatewayApiClient } from '@radixdlt/radix-dapp-toolkit/types/gateway/gateway-api'
import React, { type PropsWithChildren, useEffect, useState } from 'react'

import { DAPP_ADDRESS } from '../constants/dapp'
import { useNetworkConfiguration } from '../hooks/dapp/use-network-configuration'
import { useNoneSharedStore, useSharedStore } from '../hooks/use-store'
import type { Rdt } from './rdt'
import { RdtContext } from './rdt'

export const RdtProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const { data: configuration } = useNetworkConfiguration()
	const { reloadSharedStore } = useSharedStore(state => ({
		reloadSharedStore: state.reloadSharedStoreAction,
	}))
	const { gatewayBaseUrl } = useNoneSharedStore(state => ({
		gatewayBaseUrl: state.gatewayBaseUrl,
	}))
	const [state, setState] = useState<Rdt>()

	const onStateChange = () => {
		reloadSharedStore()
	}

	useEffect(() => {
		if (!configuration?.network_id) return () => {}

		const gatewayApi = GatewayApiClient({
			basePath: RadixNetworkConfigById[configuration?.network_id].gatewayUrl,
		})

		const dataRequestStateClient = DataRequestStateClient({})

		const options = {
			networkId: configuration.network_id,
			dAppDefinitionAddress: DAPP_ADDRESS,
			logger: console, 
			providers: {
				gatewayClient: GatewayClient({ gatewayApi }),
				dataRequestStateClient,
			},
			useCache: false,
		}

		const rdt = RadixDappToolkit(options)
		setState(rdt)
		return () => rdt.destroy()
	}, [gatewayBaseUrl, configuration?.network_id])

	if (!state) return null

	return <RdtContext.Provider value={state}>{children}</RdtContext.Provider>
}
