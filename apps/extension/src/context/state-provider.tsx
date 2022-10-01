import React, { useEffect, useState } from 'react'
import { useSharedStore } from '@src/hooks/use-store'
import { AccountStore } from '@src/store'
import { getAccountStore, defaultAccountStore } from '@src/services/state'
import { AccountContext } from './state'

export const AccountStoreProvider = ({ children }: React.PropsWithChildren<{}>) => {
	const { keystoreId } = useSharedStore(state => ({
		keystoreId: state.selectKeystoreId,
	}))

	const [state, setState] = useState<AccountStore>(defaultAccountStore)

	useEffect(() => {
		const load = async (suffix: string) => {
			const store = await getAccountStore(suffix)
			setState(store)
		}
		load(keystoreId)
	}, [keystoreId])

	return <AccountContext.Provider value={state}>{children}</AccountContext.Provider>
}
