import { RadixDappToolkit } from '@radixdlt/radix-dapp-toolkit'
import type { PropsWithChildren } from 'react'
import React, { useEffect, useRef } from 'react'

import { DAPP_ADDRESS, DAPP_NAME, DAPP_NETWORK_ID } from '@src/constants'
import { useSharedStore } from '@src/hooks/use-store'
import type { Rdt } from '@src/types'

import { RdtContext } from './rdt'

export const RdtProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const ref = useRef<Rdt>()
	const { setIdentityId, reloadSharedStore } = useSharedStore(state => ({
		setIdentityId: state.setIdentityIdAction,
		reloadSharedStore: state.reloadSharedStoreAction,
	}))

	const onStateChange = state => {
		setIdentityId(state?.walletData?.persona?.identityAddress || '')
		reloadSharedStore()
	}

	useEffect(() => {
		ref.current = RadixDappToolkit(
			{
				dAppName: DAPP_NAME,
				dAppDefinitionAddress: DAPP_ADDRESS,
			},
			requestData => {
				requestData({
					accounts: { quantifier: 'atLeast', quantity: 1 },
				})
			},
			{
				networkId: DAPP_NETWORK_ID,
				onStateChange,
				onInit: onStateChange,
			},
		)

		return () => ref.current.destroy()
	}, [])

	return <RdtContext.Provider value={ref.current}>{children}</RdtContext.Provider>
}
