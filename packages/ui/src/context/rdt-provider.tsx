import type { RadixDappToolkitOptions } from '@radixdlt/radix-dapp-toolkit'
import { DataRequestBuilder, RadixDappToolkit } from '@radixdlt/radix-dapp-toolkit'
import { Buffer } from 'buffer'
import React, { type PropsWithChildren, useEffect, useState } from 'react'

import { DAPP_ADDRESS, DAPP_NAME, DAPP_VERSION } from 'ui/src/constants/dapp'
import { useNetworkConfiguration } from 'ui/src/hooks/dapp/use-network'
import { useNoneSharedStore, useSharedStore } from 'ui/src/hooks/use-store'
import { getLocalStorageClient } from 'ui/src/services/rdt/local-storage-client'

import { RdtContext } from './rdt'

export const createChallenge = async () => Buffer.from(crypto.getRandomValues(new Uint8Array(32))).toString('hex')

export const RdtProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const { data: configuration } = useNetworkConfiguration()
	const { selectedKeystoreId, reloadSharedStore } = useSharedStore(state => ({
		selectedKeystoreId: state.selectedKeystoreId,
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
		if (!selectedKeystoreId || !configuration?.network_id) return () => {}

		const storageClient = getLocalStorageClient(selectedKeystoreId)

		const options: RadixDappToolkitOptions = {
			networkId: configuration.network_id,
			applicationName: DAPP_NAME,
			applicationVersion: DAPP_VERSION,
			dAppDefinitionAddress: DAPP_ADDRESS,
			logger: console as any,
			useCache: false,
			providers: { storageClient },
		}

		const rdt = RadixDappToolkit(options)
		rdt.walletApi.walletData$.subscribe(onStateChange)
		rdt.walletApi.setRequestData(DataRequestBuilder.accounts().atLeast(1))
		rdt.walletApi.provideChallengeGenerator(createChallenge)

		setState(rdt)
		return () => rdt.destroy()
	}, [gatewayBaseUrl, selectedKeystoreId, configuration?.network_id])

	if (!state) return null

	return <RdtContext.Provider value={state}>{children}</RdtContext.Provider>
}
