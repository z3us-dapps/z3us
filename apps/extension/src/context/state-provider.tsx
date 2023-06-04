import React, { useEffect, useState } from 'react'

import { useSharedStore } from '@src/hooks/use-store'
import { defaultNoneSharedStore, getNoneSharedStore } from '@src/services/state'
import type { NoneSharedStore } from '@src/store'

import { NoneSharedStoreContext } from './state'

export const NoneSharedStoreProvider = ({ children }: React.PropsWithChildren<{}>) => {
	const { keystoreId } = useSharedStore(state => ({
		keystoreId: state.selectKeystoreId,
	}))

	const [state, setState] = useState<{ keystoreId: string; store: NoneSharedStore }>({
		keystoreId: '',
		store: defaultNoneSharedStore,
	})

	useEffect(() => {
		const load = async (suffix: string) => {
			const store = await getNoneSharedStore(suffix)
			setState({ keystoreId: suffix, store })
		}
		load(keystoreId)
	}, [keystoreId])

	return <NoneSharedStoreContext.Provider value={state}>{children}</NoneSharedStoreContext.Provider>
}
