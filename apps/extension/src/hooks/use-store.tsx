import { AccountContext } from '@src/context/state'
import { sharedStore, AccountStore, SharedStore } from '@src/store'
import { AccountState, SharedState } from '@src/store/types'
import { useContext } from 'react'
import { useStore } from 'zustand'
import shallow from 'zustand/shallow'

export function useAccountStore<T>(
	selector: (state: AccountState) => T,
	equalityFn: (left: T, right: T) => boolean = shallow,
) {
	const store = useContext(AccountContext)
	if (!store) throw new Error('Missing AccountContext.Provider in the tree')
	return useStore<AccountStore, T>(store, selector, equalityFn)
}

export function useSharedStore<T>(
	selector: (state: SharedState) => T,
	equalityFn: (left: T, right: T) => boolean = shallow,
) {
	return useStore<SharedStore, T>(sharedStore, selector, equalityFn)
}
