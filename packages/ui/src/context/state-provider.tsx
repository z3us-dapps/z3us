import React, { useEffect, useState } from 'react'

import { useSharedStore } from '../hooks/use-store'
import { getNoneSharedStore } from '../services/state'
import { createNoneSharedStore } from '../store'
import { NoneSharedStoreContext, type TStoreContext } from './state'

const defaultStoreKey = 'z3us:store:default'
const defaultStore = createNoneSharedStore(defaultStoreKey)
const defaultValue = {
	id: defaultStoreKey,
	store: defaultStore,
}

interface INoneSharedStoreProvider {
	children: React.ReactNode
}

export const NoneSharedStoreProvider = (props: INoneSharedStoreProvider) => {
	const { children } = props
	const { keystoreId } = useSharedStore(state => ({
		keystoreId: state.selectedKeystoreId,
	}))

	const [state, setState] = useState<TStoreContext>(defaultValue)

	useEffect(() => {
		const load = async (id: string) => {
			if (!id) {
				setState({ ...defaultValue })
			} else {
				setState({ id, store: await getNoneSharedStore(id) })
			}
		}
		load(keystoreId)
	}, [keystoreId])

	return <NoneSharedStoreContext.Provider value={state}>{children}</NoneSharedStoreContext.Provider>
}
