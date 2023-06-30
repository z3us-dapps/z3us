import { RadixDappToolkit } from '@radixdlt/radix-dapp-toolkit'
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

		const rdt = RadixDappToolkit(
			{
				networkId: configuration.network_id,
				dAppDefinitionAddress: DAPP_ADDRESS,
			},
			requestData => {
				requestData({
					accounts: { quantifier: 'atLeast', quantity: 1 },
					personaData: {
						fields: ['givenName', 'emailAddress', 'familyName', 'phoneNumber'],
					},
				})
			},
			{
				onStateChange,
				onInit: onStateChange,
				gatewayBaseUrl,
			},
		)
		setState(rdt)
		return () => rdt.destroy()
	}, [gatewayBaseUrl, configuration?.network_id])

	if (!state) return null

	return <RdtContext.Provider value={state}>{children}</RdtContext.Provider>
}
