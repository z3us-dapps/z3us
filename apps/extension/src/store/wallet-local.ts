import { HDMasterSeedT } from '@radixdlt/crypto'
import { LocalWalletStore } from './types'

export const factory = (set): LocalWalletStore => ({
	masterSeed: null,

	setMasterSeedAction: (seed: HDMasterSeedT) => {
		set(draft => {
			draft.masterSeed = seed
		})
	},
})
