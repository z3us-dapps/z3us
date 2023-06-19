// @ts-nocheck
// TODO: fix ts
import { RadixDappToolkit, type Rdt } from '@radixdlt/radix-dapp-toolkit'
import React, { type PropsWithChildren, useEffect, useRef } from 'react'

// import { DAPP_ADDRESS, DAPP_NAME, DAPP_NETWORK_ID } from 'ui/src/constants'
import { useSharedStore } from '../hooks/use-store'
import { RdtContext } from './rdt'

export const DAPP_NAME = 'Z3US'
export const DAPP_ORIGIN = 'https://z3us.com'
export const DAPP_ADDRESS = 'account_tdx_c_1p9u58qefydgxugayaapvwpceh5z96wmrzwl3c70ptxnqvman6v'
export const DAPP_NETWORK_ID = 12

export const RdtProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const { reloadSharedStore } = useSharedStore(state => ({
		reloadSharedStore: state.reloadSharedStoreAction,
	}))

	const onStateChange = s => {
		reloadSharedStore()

		// eslint-disable-next-line no-console
		console.log('RdtProvider.onStateChange', s)
	}

	const ref = useRef<Rdt>(
		RadixDappToolkit(
			{
				dAppName: DAPP_NAME,
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
				networkId: DAPP_NETWORK_ID,
				onStateChange,
				onInit: onStateChange,
			},
		),
	)

	useEffect(() => () => ref.current.destroy(), [])

	return <RdtContext.Provider value={ref.current}>{children}</RdtContext.Provider>
}
