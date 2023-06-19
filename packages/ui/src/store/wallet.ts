import { type IWalletStateSetter, type WalletState } from './types'

export const factory = (set: IWalletStateSetter): WalletState => ({
	sharedStoreReloadTrigger: Date.now(),

	reloadSharedStoreAction: async () => {
		set(state => {
			state.sharedStoreReloadTrigger = Date.now()
		})
	},
})
