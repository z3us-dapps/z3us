import { RadixDappToolkit } from '@radixdlt/radix-dapp-toolkit'
import React, { type PropsWithChildren, useEffect, useRef } from 'react'

import { DAPP_NETWORK_ID, dAppMeta } from '../constants/dapp'
import { useSharedStore } from '../hooks/use-store'
import type { Rdt } from './rdt'
import { RdtContext } from './rdt'

export const RdtProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const { reloadSharedStore } = useSharedStore(state => ({
		reloadSharedStore: state.reloadSharedStoreAction,
	}))

	const onStateChange = () => {
		reloadSharedStore()
	}

	const ref = useRef<Rdt>(
		RadixDappToolkit(
			dAppMeta,
			requestData => {
				requestData({
					accounts: { quantifier: 'atLeast', quantity: 1 },
					personaData: {
						fields: ['givenName', 'emailAddress', 'familyName', 'phoneNumber'],
					},
				})
			},
			{
				networkId: DAPP_NETWORK_ID,
				onStateChange,
				onInit: onStateChange,
			},
		),
	)

	useEffect(() => () => ref.current.destroy(), [])

	return <RdtContext.Provider value={ref.current}>{children}</RdtContext.Provider>
}
