import type { RadixDappToolkitOptions } from '@radixdlt/radix-dapp-toolkit'
import { DataRequestBuilder, DataRequestStateClient, RadixDappToolkit } from '@radixdlt/radix-dapp-toolkit'
import { Buffer } from 'buffer'
import React, { type PropsWithChildren, useEffect, useState } from 'react'

import { DAPP_ADDRESS } from '../constants/dapp'
import { useNetworkConfiguration } from '../hooks/dapp/use-network'
import { useNoneSharedStore, useSharedStore } from '../hooks/use-store'
import { RdtContext } from './rdt'

export const createChallenge = () => Buffer.from(crypto.getRandomValues(new Uint8Array(32))).toString('hex')

export const dataRequestStateClient = DataRequestStateClient({})

export const RdtProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const { data: configuration } = useNetworkConfiguration()
	const { reloadSharedStore } = useSharedStore(state => ({
		reloadSharedStore: state.reloadSharedStoreAction,
	}))
	const { gatewayBaseUrl } = useNoneSharedStore(state => ({
		gatewayBaseUrl: state.gatewayBaseUrl,
	}))
	const [state, setState] = useState<RadixDappToolkit>()

	const onStateChange = () => {
		reloadSharedStore()
	}

	useEffect(() => {
		if (!configuration?.network_id) return () => {}

		const options: RadixDappToolkitOptions = {
			networkId: configuration.network_id,
			dAppDefinitionAddress: DAPP_ADDRESS,
			logger: console as any,
			useCache: false,
		}

		const rdt = RadixDappToolkit(options)

		rdt.walletApi.walletData$.subscribe(onStateChange)
		rdt.walletApi.setRequestData(DataRequestBuilder.accounts().atLeast(1))
		rdt.walletApi.provideChallengeGenerator(async () => createChallenge())

		setState(rdt)
		return () => rdt.destroy()
	}, [gatewayBaseUrl, configuration?.network_id])

	if (!state) return null

	return <RdtContext.Provider value={state}>{children}</RdtContext.Provider>
}
