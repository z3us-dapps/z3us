import { SetState } from 'zustand'
import { HDMasterSeedT } from '@radixdlt/crypto'
import { SharedStore, LocalWalletStore } from './types'

export const factory = (set: SetState<SharedStore>): LocalWalletStore => ({
	masterSeed: null,

	setMasterSeedAction: (seed: HDMasterSeedT) => {
		set(draft => {
			draft.masterSeed = seed
		})
	},
})
