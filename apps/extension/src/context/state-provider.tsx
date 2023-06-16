import React, { useEffect, useState } from 'react'

import { useRdtState } from '@src/hooks/dapp/use-rdt-state'
import { getNoneSharedStore } from '@src/services/state'
import { NoneSharedStore } from '@src/store'

import { NoneSharedStoreContext } from './state'

export const NoneSharedStoreProvider = ({ children }: React.PropsWithChildren<{}>) => {
	const rdtState = useRdtState()
	const [state, setState] = useState<{ id: string; store?: NoneSharedStore }>({ id: '' })
	const identity = (rdtState as any)?.walletData?.persona?.identityAddress || 'test' // @TODO: fix this to be connected with connect button - rdt

	useEffect(() => {
		const load = async (id: string) => {
			const store = await getNoneSharedStore(id)
			setState({ id, store })
		}
		if (rdtState?.connected) load(identity)
	}, [rdtState?.connected, identity])

	return <NoneSharedStoreContext.Provider value={state}>{children}</NoneSharedStoreContext.Provider>
}
