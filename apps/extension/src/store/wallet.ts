import type { WalletState } from './types'

export const factory = (set): WalletState => ({
	sharedStoreReloadTrigger: Date.now(),

	reloadSharedStoreAction: async () => {
		set(state => {
			state.sharedStoreReloadTrigger = Date.now()
		})
	},
})
