import React, { useEffect, useState } from 'react'

import { useSharedStore } from '../hooks/use-store'
import { getNoneSharedStore } from '../services/state'
import { createNoneSharedStore } from '../store'
import { NoneSharedStoreContext, type TStoreContext } from './state'

const defaultStoreKey = 'z3us-store:unknown'
const defaultStore = createNoneSharedStore(defaultStoreKey)
const defaultValue = {
	id: defaultStoreKey,
	store: defaultStore,
}

interface INoneSharedStoreProvider {
	children: React.ReactNode
	z3usLogoLink?: React.ReactNode
}

export const NoneSharedStoreProvider = (props: INoneSharedStoreProvider) => {
	const { children, z3usLogoLink } = props
	const { keystoreId } = useSharedStore(state => ({
		keystoreId: state.selectKeystoreId,
	}))

	const [state, setState] = useState<TStoreContext>(defaultValue)

	useEffect(() => {
		const load = async (id: string) => {
			if (!id) {
				setState({ ...defaultValue, z3usLogoLink })
			} else {
				setState({ id, store: await getNoneSharedStore(id), z3usLogoLink })
			}
		}
		load(keystoreId)
	}, [keystoreId])

	return <NoneSharedStoreContext.Provider value={state}>{children}</NoneSharedStoreContext.Provider>
}
