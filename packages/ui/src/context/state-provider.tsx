import React, { useEffect, useState } from 'react'

import { useRdtState } from '../hooks/dapp/use-rdt-state'
import { getNoneSharedStore } from '../services/state'
import { type NoneSharedStore, createNoneSharedStore } from '../store'
import { NoneSharedStoreContext } from './state'

const defaultStoreKey = 'z3us:rdt:default'
const defaultStore = createNoneSharedStore(defaultStoreKey)
const defaultValue = {
	id: defaultStoreKey,
	store: defaultStore,
}

export const NoneSharedStoreProvider = ({ children }: React.PropsWithChildren<{}>) => {
	const rdtState = useRdtState()
	const [state, setState] = useState<{ id: string; store?: NoneSharedStore }>(defaultValue)

	useEffect(() => {
		const load = async (id: string) => {
			if (!id) {
				setState(defaultValue)
			} else {
				setState({ id, store: await getNoneSharedStore(id) })
			}
		}

		const id = rdtState?.persona?.identityAddress || ''
		if (id !== state.id || !state.store) {
			load(id)
		}
	}, [rdtState?.persona?.identityAddress])

	return <NoneSharedStoreContext.Provider value={state}>{children}</NoneSharedStoreContext.Provider>
}
