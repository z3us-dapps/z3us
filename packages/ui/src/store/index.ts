// @ts-nocheck
import type { StateCreator } from 'zustand'
import { createStore } from 'zustand'
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { factory as createKeystoreStore } from './keystore'
import { factory as createRDTStore } from './rdt'
import { factory as createSettingsStore } from './settings'
import { factory as createThemeStore } from './theme'
import type { NoneSharedState, SharedState } from './types'
import { factory as createWalletStore } from './wallet'

type MutatorsTypes = [
	['zustand/devtools', never],
	['zustand/subscribeWithSelector', never],
	['zustand/persist', Partial<SharedState>],
	['zustand/immer', never],
]

// TODO: fix type error
const middlewares = <T>(name: string, f: StateCreator<T, MutatorsTypes>) =>
	devtools(subscribeWithSelector(persist(immer(f), { name })), { name })

export const sharedStore = createStore(
	middlewares<SharedState>('z3us-store', set => ({
		...createKeystoreStore(set),
		...createThemeStore(set),
		...createWalletStore(set),
	})),
)

export const createNoneSharedStore = (name: string) =>
	createStore(
		middlewares<NoneSharedState>(name, set => ({
			...createSettingsStore(set),
			...createRDTStore(set),
		})),
	)

export type SharedStore = typeof sharedStore

export type NoneSharedStore = ReturnType<typeof createNoneSharedStore>
