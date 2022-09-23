import browser from 'webextension-polyfill'
import { useLayoutEffect, useRef } from 'react'
import create, { StateCreator, useStore as useZustandStore } from 'zustand'
import shallow from 'zustand/shallow'
import { immer } from 'zustand/middleware/immer'
import { devtools } from 'zustand/middleware/devtools'
import { persist } from 'zustand/middleware/persist'
import { subscribeWithSelector } from 'zustand/middleware/subscribeWithSelector'
import { BrowserService } from '@src/services/browser'
import { BrowserStorageService } from '@src/services/browser-storage'
import { defaultAccountStoreKey, sharedStoreKey } from '@src/config'

import { factory as createToastsStore } from './toasts'
import { factory as createThemeStore, whiteList as themeWhiteList } from './theme'
import { factory as createOnBoardingStore } from './onboarding'
import { factory as createSettingsStore, whiteList as settingsWhiteList } from './settings'
import { factory as createBackgroundStore } from './background'
import { factory as createKeystoresStore, whiteList as keystorehiteList } from './keystores'
import { factory as createLocalWalletStore } from './wallet-local'
import { factory as createHardwareWalletStore } from './wallet-hardware'
import { factory as createWalletStore, whiteList as walletWhiteList } from './wallet'

import { SharedStore, AccountStore } from './types'

type MutatorsTypes = [
	['zustand/devtools', never],
	['zustand/subscribeWithSelector', never],
	['zustand/persist', Partial<SharedStore>],
	['zustand/immer', never],
]
const middlewares = <T>(name: string, whitelist: string[], f: StateCreator<T, MutatorsTypes>) =>
	devtools(
		subscribeWithSelector(
			persist(immer(f), {
				name,
				partialize: state => Object.fromEntries(Object.entries(state).filter(([key]) => whitelist.includes(key))),
				getStorage: () => new BrowserStorageService(new BrowserService(), browser.storage),
			}),
		),
		{ name },
	)

export const sharedStoreWhitelist = [...themeWhiteList, ...settingsWhiteList, ...keystorehiteList]

export const accountStoreWhitelist = [...walletWhiteList]

export const sharedStore = create(
	middlewares<SharedStore>(sharedStoreKey, sharedStoreWhitelist, (set, get) => ({
		...createThemeStore(set),
		...createToastsStore(set, get),
		...createOnBoardingStore(set),
		...createSettingsStore(set),
		...createBackgroundStore(set, get),
		...createKeystoresStore(set),
		...createLocalWalletStore(set),
		...createHardwareWalletStore(set),
	})),
)

export const accountStoreFactory = (name: string) =>
	create(
		middlewares<AccountStore>(name, accountStoreWhitelist, (set, get) => ({
			...createWalletStore(set, get),
		})),
	)

export const useSharedStore = ((selector, equalityFn = shallow) =>
	sharedStore(selector, equalityFn)) as typeof sharedStore

export const defaultAccountStore = accountStoreFactory(defaultAccountStoreKey)

const accountStoreContainer: { [key: string]: typeof defaultAccountStore } = {
	[defaultAccountStoreKey]: defaultAccountStore,
}

export const accountStore = (suffix: string): typeof defaultAccountStore => {
	const name = !suffix ? defaultAccountStoreKey : `${defaultAccountStoreKey}-${suffix}`
	const store = accountStoreContainer[name]
	if (store) return store

	const newStore = accountStoreFactory(name)
	accountStoreContainer[name] = newStore
	return newStore
}

export const useStore: typeof defaultAccountStore = ((selector, equalityFn = shallow) => {
	const { keystoreId } = useSharedStore(state => ({
		keystoreId: state.selectKeystoreId,
	}))

	const storeRef = useRef(accountStore(keystoreId))

	useLayoutEffect(() => {
		storeRef.current = accountStore(keystoreId)
	}, [keystoreId])

	// return storeRef.current(selector, equalityFn)
	return useZustandStore(storeRef.current, selector, equalityFn)
}) as typeof defaultAccountStore
