import React, { useEffect, useState } from 'react'

import { useRdtState } from '@src/hooks/dapp/use-rdt-state'
import { useSharedStore } from '@src/hooks/use-store'
import { getNoneSharedStore } from '@src/services/state'
import { type NoneSharedStore, createNoneSharedStore } from '@src/store'

import { NoneSharedStoreContext } from './state'

const defaultStoreKey = 'z3us:rdt:default'
const defaultStore = createNoneSharedStore(defaultStoreKey)
const defaultValue = {
	id: defaultStoreKey,
	store: defaultStore,
}

export const NoneSharedStoreProvider = ({ children }: React.PropsWithChildren<{}>) => {
	const rdtState = useRdtState()
	const { reloadTrigger } = useSharedStore(state => ({
		reloadTrigger: state.sharedStoreReloadTrigger,
	}))

	const [state, setState] = useState<{ id: string; store?: NoneSharedStore }>(defaultValue)

	useEffect(() => {
		const load = async (id: string) => {
			let { store } = state

			if (id !== state.id || !store) {
				if (!id) {
					store = defaultStore
					setState(defaultValue)
				} else {
					store = await getNoneSharedStore(id)
					setState({ id, store })
				}
			}

			const { addressBook, setAddressBookEntryAction } = store.getState()
			rdtState?.accounts.forEach(account =>
				setAddressBookEntryAction(account.address, {
					dateAdded: Date.now(),
					...addressBook[account.address],
					name: account.label,
					address: account.address,
				}),
			)
		}

		load(rdtState?.persona?.identityAddress)
	}, [reloadTrigger])

	return <NoneSharedStoreContext.Provider value={state}>{children}</NoneSharedStoreContext.Provider>
}
