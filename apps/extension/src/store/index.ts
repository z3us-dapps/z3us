import browser from 'webextension-polyfill'
import type { StateCreator} from 'zustand';
import { createStore } from 'zustand'
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { sharedStoreKey } from '@src/config'
import browserService from '@src/services/browser'
import { BrowserStorageService } from '@src/services/browser-storage'

import { whiteList as accountWhiteList, factory as createAccountStore } from './account'
import { factory as createKeystoresStore, whiteList as keystorehiteList } from './keystores'
import { factory as createOnBoardingStore } from './onboarding'
import { factory as createSettingsStore, whiteList as settingsWhiteList } from './settings'
import { factory as createThemeStore, whiteList as themeWhiteList } from './theme'
import { factory as createToastsStore } from './toasts'
import type { NoneSharedState, SharedState } from './types'
import { factory as createWalletStore } from './wallet'

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
				getStorage: () => new BrowserStorageService(browserService, browser.storage),
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
