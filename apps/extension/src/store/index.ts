import browser from 'webextension-polyfill'
import type { StateCreator } from 'zustand'
import { createStore } from 'zustand'
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { BrowserStorageService } from '@src/storage/browser'

import { sharedStoreKey } from './constants'
import { factory as createSettingsStore } from './settings'
import { factory as createThemeStore } from './theme'
import { factory as createToastsStore } from './toasts'
import { NoneSharedState, SharedState } from './types'

type MutatorsTypes = [
	['zustand/devtools', never],
	['zustand/subscribeWithSelector', never],
	['zustand/persist', Partial<SharedState>],
	['zustand/immer', never],
]

const middlewares = <T>(name: string, f: StateCreator<T, MutatorsTypes>) =>
	devtools(
		subscribeWithSelector(
			persist(immer(f), {
				name,
				getStorage: () => new BrowserStorageService(browser.storage),
			}),
		),
		{ name },
	)

export const sharedStore = createStore(
	middlewares<SharedState>(sharedStoreKey, (set, get) => ({
		...createThemeStore(set),
		...createToastsStore(set, get),
	})),
)

export const createNoneSharedStore = (name: string) =>
	createStore(
		middlewares<NoneSharedState>(name, set => ({
			...createSettingsStore(set),
		})),
	)

export type SharedStore = typeof sharedStore

export type NoneSharedStore = ReturnType<typeof createNoneSharedStore>
