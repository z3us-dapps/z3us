import React, { useEffect, useState } from 'react'

import { useSharedStore } from '../hooks/use-store'
import { defaultStore, defaultStoreKey, getNoneSharedStore } from '../services/state'
import { NoneSharedStoreContext, type TStoreContext } from './state'

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
		if (!keystoreId) {
			setState({ ...defaultValue })
		} else {
			getNoneSharedStore(keystoreId).then(store => {
				setState({ id: keystoreId, store })
			})
		}
	}, [keystoreId])

	return <NoneSharedStoreContext.Provider value={state}>{children}</NoneSharedStoreContext.Provider>
}
