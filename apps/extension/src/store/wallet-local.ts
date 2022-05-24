import { GetState, SetState } from 'zustand'
import { HDMasterSeedT } from '@radixdlt/crypto'
import { AccountStore, LocalWalletStore } from './types'

export const factory = (set: SetState<AccountStore>, get: GetState<AccountStore>): LocalWalletStore => ({
	masterSeed: null,

	setMasterSeedAction: async (seed: HDMasterSeedT) => {
		set(draft => {
			draft.masterSeed = seed
		})
		const { selectAccountAction } = get()
		return selectAccountAction(0)
	},
})
