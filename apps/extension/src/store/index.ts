import browser from 'webextension-polyfill'
import { StateCreator, createStore } from 'zustand'
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { BrowserService } from '@src/services/browser'
import { BrowserStorageService } from '@src/services/browser-storage'
import { sharedStoreKey } from '@src/config'

import { factory as createToastsStore } from './toasts'
import { factory as createThemeStore, whiteList as themeWhiteList } from './theme'
import { factory as createOnBoardingStore } from './onboarding'
import { factory as createSettingsStore, whiteList as settingsWhiteList } from './settings'
import { factory as createBackgroundStore } from './background'
import { factory as createKeystoresStore, whiteList as keystorehiteList } from './keystores'
import { factory as createWalletStore } from './wallet'
import { factory as createAccountStore, whiteList as accountWhiteList } from './account'

import { SharedState, NoneSharedState } from './types'

type MutatorsTypes = [
	['zustand/devtools', never],
	['zustand/subscribeWithSelector', never],
	['zustand/persist', Partial<SharedState>],
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

export const sharedStoreWhitelist = [...themeWhiteList, ...keystorehiteList]

export const noneSharedStoreWhitelist = [...settingsWhiteList, ...accountWhiteList]

export const sharedStore = createStore(
	middlewares<SharedState>(sharedStoreKey, sharedStoreWhitelist, (set, get) => ({
		...createThemeStore(set),
		...createToastsStore(set, get),
		...createOnBoardingStore(set),
		...createBackgroundStore(set, get),
		...createKeystoresStore(set),
		...createWalletStore(set),
	})),
)

export const createNoneSharedStore = (name: string) =>
	createStore(
		middlewares<NoneSharedState>(name, noneSharedStoreWhitelist, (set, get) => ({
			...createAccountStore(set, get),
			...createSettingsStore(set),
		})),
	)

export type SharedStore = typeof sharedStore

export type NoneSharedStore = ReturnType<typeof createNoneSharedStore>
