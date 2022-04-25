import browser from 'webextension-polyfill'
import create, { GetState, Mutate, SetState, State, StateCreator, StoreApi } from 'zustand'
import produce, { Draft } from 'immer'
import shallow from 'zustand/shallow'
import { persist, devtools } from 'zustand/middleware'
import { BrowserStorageService } from '@src/services/browser-storage'
import { createThemeStore, ThemeStore, whiteList as themeWhiteList } from './theme'
import { createWalletStore, WalletStore, whiteList as walletWhiteList } from './wallet'
import { createToastsStore, ToastsStore } from './toasts'
import { createOnBoardingStore, OnBoardingStore } from './onboarding'
import { createHardwareWalletStore, HardwareWalletStore, whiteList as hwWhiteList } from './hardware-wallet'

/**
 * These store keys will be persisted in local storage
 */
const storeWhiteList = [...themeWhiteList, ...walletWhiteList, ...hwWhiteList]

type AppStore = ThemeStore & ToastsStore & WalletStore & OnBoardingStore & HardwareWalletStore

const immer =
	<
		T extends State,
		CustomSetState extends SetState<T>,
		CustomGetState extends GetState<T>,
		CustomStoreApi extends StoreApi<T>,
	>(
		config: StateCreator<
			T,
			(partial: ((draft: Draft<T>) => T) | T, replace?: boolean) => Promise<void>,
			CustomGetState,
			CustomStoreApi
		>,
	): StateCreator<T, CustomSetState, CustomGetState, CustomStoreApi> =>
	(set, get, api) =>
		config(
			async (partial, replace) => {
				if (typeof partial !== 'function') {
					return set(partial as T, replace)
				}
				const nextState = produce(partial as (state: Draft<T>) => T)
				return set(nextState, replace)
			},
			get,
			api,
		)

export const name = 'z3us-store'

const useStoreBase = create<
	AppStore,
	SetState<AppStore>,
	GetState<AppStore>,
	Mutate<StoreApi<AppStore>, [['zustand/persist', Partial<AppStore>], ['zustand/devtools', never]]>
>(
	devtools(
		persist(
			immer((set, get) => ({
				...createThemeStore(set),
				...createToastsStore(set),
				...createWalletStore(set, get),
				...createOnBoardingStore(set),
				...createHardwareWalletStore(set),
			})),
			{
				name,
				partialize: state => Object.fromEntries(Object.entries(state).filter(([key]) => storeWhiteList.includes(key))),
				getStorage: () => new BrowserStorageService(browser?.storage || null),
			},
		),
		{ name: 'prefix' },
	),
)

const useStore = ((selector, equalityFn = shallow) => useStoreBase(selector, equalityFn)) as typeof useStoreBase

export { useStoreBase as store, useStore }
