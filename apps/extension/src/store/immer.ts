import { GetState, SetState, State, StateCreator, StoreApi } from 'zustand'
import produce, { Draft } from 'immer'

export const immer =
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
