import { type IWalletStateSetter, type WalletState } from './types'

const defaultState = {
	sharedStoreReloadTrigger: Date.now(),
}
export const factory = (set: IWalletStateSetter): WalletState => ({
	...defaultState,

	reloadSharedStoreAction: async () => {
		set(state => {
			state.sharedStoreReloadTrigger = Date.now()
		})
	},
})
