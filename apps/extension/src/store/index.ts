import browser from 'webextension-polyfill'
import { useLayoutEffect, useRef } from 'react'
import create, { GetState, Mutate, SetState, StoreApi } from 'zustand'
import shallow from 'zustand/shallow'
import { persist, devtools } from 'zustand/middleware'
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
import { immer } from './immer'

export const sharedStoreWhitelist = [...themeWhiteList, ...settingsWhiteList, ...keystorehiteList]

export const accountStoreWhitelist = [...walletWhiteList]

export const sharedStore = create<
	SharedStore,
	SetState<SharedStore>,
	GetState<SharedStore>,
	Mutate<StoreApi<SharedStore>, [['zustand/persist', Partial<SharedStore>], ['zustand/devtools', never]]>
>(
	devtools(
		persist(
			immer((set, get) => ({
				...createThemeStore(set),
				...createToastsStore(set),
				...createOnBoardingStore(set),
				...createSettingsStore(set),
				...createBackgroundStore(set, get),
				...createKeystoresStore(set),
			})),
			{
				name: sharedStoreKey,
				partialize: state =>
					Object.fromEntries(Object.entries(state).filter(([key]) => sharedStoreWhitelist.includes(key))),
				getStorage: () => new BrowserStorageService(new BrowserService(), browser.storage),
			},
		),
		{ name: sharedStoreKey },
	),
)

const accountStoreFactory = (name: string) =>
	create<
		AccountStore,
		SetState<AccountStore>,
		GetState<AccountStore>,
		Mutate<StoreApi<AccountStore>, [['zustand/persist', Partial<AccountStore>], ['zustand/devtools', never]]>
	>(
		devtools(
			persist(
				immer((set, get) => ({
					...createWalletStore(set, get),
					...createLocalWalletStore(set, get),
					...createHardwareWalletStore(set, get),
				})),
				{
					name,
					partialize: state =>
						Object.fromEntries(Object.entries(state).filter(([key]) => accountStoreWhitelist.includes(key))),
					getStorage: () => new BrowserStorageService(new BrowserService(), browser.storage),
				},
			),
			{ name },
		),
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
	if (store) {
		return store
	}
	const newStore = accountStoreFactory(name)
	accountStoreContainer[name] = newStore
	return newStore
}

export const useAccountStore = (suffix: string): typeof defaultAccountStore =>
	((selector, equalityFn = shallow) => accountStore(suffix)(selector, equalityFn)) as typeof defaultAccountStore

export const useStore: typeof defaultAccountStore = ((selector, equalityFn = shallow) => {
	const { keystoreName } = useSharedStore(state => ({
		keystoreName: state.selectKeystoreName,
	}))

	const storeRef = useRef(accountStore(keystoreName))

	useLayoutEffect(() => {
		storeRef.current = accountStore(keystoreName)
	}, [keystoreName])

	return storeRef.current(selector, equalityFn)
}) as typeof defaultAccountStore
