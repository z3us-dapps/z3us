import React, { useEffect, useState } from 'react'

import { useRdtState } from '@src/hooks/dapp/use-rdt-state'
import { getNoneSharedStore } from '@src/services/state'
import { type NoneSharedStore, createNoneSharedStore } from '@src/store'

import { NoneSharedStoreContext } from './state'

const defaultStoreKey = 'default'
const defaultStore = createNoneSharedStore(defaultStoreKey)
const defaultValue = {
	id: defaultStoreKey,
	store: defaultStore,
}

export const NoneSharedStoreProvider = ({ children }: React.PropsWithChildren<{}>) => {
	const rdtState = useRdtState()

	const [state, setState] = useState<{ id: string; store?: NoneSharedStore }>(defaultValue)

	const identity = (rdtState as any)?.walletData?.persona?.identityAddress

	useEffect(() => {
		const load = async (id: string) => {
			const store = await getNoneSharedStore(id)
			setState({ id, store })

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
		if (rdtState?.connected && identity) {
			load(identity)
		} else {
			setState(defaultValue)
		}
	}, [rdtState?.connected, rdtState?.accounts?.length, identity])

	return <NoneSharedStoreContext.Provider value={state}>{children}</NoneSharedStoreContext.Provider>
}
