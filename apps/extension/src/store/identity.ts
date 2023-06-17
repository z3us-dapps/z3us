import type { IdentityState } from './types'

export const factory = (set): IdentityState => ({
	sharedStoreReloadTrigger: Date.now(),
	identityId: '',

	reloadSharedStoreAction: async () => {
		set(state => {
			state.sharedStoreReloadTrigger = Date.now()
		})
	},

	setIdentityIdAction: async (id: string) => {
		set(state => {
			state.identityId = id
		})
	},
})
