import React, { useEffect, useState } from 'react'

import { useSharedStore } from '../hooks/use-store'
import { getNoneSharedStore } from '../services/state'
import { type NoneSharedStore, createNoneSharedStore } from '../store'
import { NoneSharedStoreContext } from './state'

const defaultStoreKey = 'z3us-store:unknown'
const defaultStore = createNoneSharedStore(defaultStoreKey)
const defaultValue = {
	id: defaultStoreKey,
	store: defaultStore,
}

export const NoneSharedStoreProvider = ({ children }: React.PropsWithChildren<{}>) => {
	const { keystoreId } = useSharedStore(state => ({
		keystoreId: state.selectKeystoreId,
	}))

	const [state, setState] = useState<{ id: string; store?: NoneSharedStore }>(defaultValue)

	useEffect(() => {
		const load = async (id: string) => {
			if (!id) {
				setState(defaultValue)
			} else {
				setState({ id, store: await getNoneSharedStore(id) })
			}
		}
		load(keystoreId)
	}, [keystoreId])

	return <NoneSharedStoreContext.Provider value={state}>{children}</NoneSharedStoreContext.Provider>
}
