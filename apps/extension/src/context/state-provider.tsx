import React, { useState } from 'react'

import { defaultNoneSharedStore } from '@src/services/state'
import { NoneSharedStore } from '@src/store'

import { NoneSharedStoreContext } from './state'

// @TODO: fix this to be connected with connect button - rdt
export const NoneSharedStoreProvider = ({ children }: React.PropsWithChildren<{}>) => {
	// const { keystoreId } = useSharedStore(state => ({
	// 	keystoreId: state.selectKeystoreId,
	// }))

	const [state] = useState<{ id: string; store: NoneSharedStore }>({
		id: '',
		store: defaultNoneSharedStore,
	})

	// useEffect(() => {
	// 	const load = async (suffix: string) => {
	// 		const store = await getNoneSharedStore(suffix)
	// 		setState({ keystoreId: suffix, store })
	// 	}
	// 	load(keystoreId)
	// }, [keystoreId])

	return <NoneSharedStoreContext.Provider value={state}>{children}</NoneSharedStoreContext.Provider>
}
