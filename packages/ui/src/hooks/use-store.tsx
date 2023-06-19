// @ts-nocheck
// TODO: fix ts
import { useContext } from 'react'
import { useStore } from 'zustand'
import { shallow } from 'zustand/shallow'

import { NoneSharedStoreContext } from 'ui/src/context/state'
import type { NoneSharedStore, SharedStore } from 'ui/src/store'
import { sharedStore } from 'ui/src/store'
import type { NoneSharedState, SharedState } from 'ui/src/store/types'

const selectAll = state => state

export function useNoneSharedStore<T>(
	selector: (state: NoneSharedState) => T = selectAll,
	equalityFn: (left: T, right: T) => boolean = shallow,
) {
	const { store } = useContext(NoneSharedStoreContext)
	if (!store) throw new Error('Missing NoneSharedStoreContext.Provider in the tree')
	return useStore<NoneSharedStore, T>(store, selector, equalityFn)
}

export function useSharedStore<T>(
	selector: (state: SharedState) => T = selectAll,
	equalityFn: (left: T, right: T) => boolean = shallow,
) {
	return useStore<SharedStore, T>(sharedStore, selector, equalityFn)
}
