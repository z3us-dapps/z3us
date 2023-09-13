import type { StateCreator } from 'zustand'
import { createStore } from 'zustand'
import { createJSONStorage, devtools, persist, subscribeWithSelector } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { factory as createExtensionStore } from './extension'
import { factory as createKeystoreStore } from './keystore'
import { factory as createSettingsStore } from './settings'
import { StateStorage } from './storage'
import type { NoneSharedState, SharedState } from './types'
import { factory as createWalletStore } from './wallet'

type MutatorsTypes = [
	['zustand/devtools', never],
	['zustand/subscribeWithSelector', never],
	['zustand/persist', Partial<SharedState>],
	['zustand/immer', never],
]

const getStorage = () => {
	if (globalThis.browser?.runtime?.id) return new StateStorage(globalThis.browser.storage.local)
	if (globalThis.chrome?.runtime?.id) return new StateStorage(globalThis.chrome.storage.local)

	return globalThis.localStorage
}

const middlewares = <T>(name: string, f: StateCreator<T, MutatorsTypes>) =>
	devtools(subscribeWithSelector(persist(immer(f), { name, storage: createJSONStorage<T>(getStorage) })), { name })

export const sharedStore = createStore(
	middlewares<SharedState>('z3us:store', set => ({
		...createKeystoreStore(set),
		...createWalletStore(set),
	})),
)

export const createNoneSharedStore = (name: string) =>
	createStore(
		middlewares<NoneSharedState>(name, set => ({
			...createSettingsStore(set),
			...createExtensionStore(set),
		})),
	)

export type SharedStore = typeof sharedStore

export type NoneSharedStore = ReturnType<typeof createNoneSharedStore>
