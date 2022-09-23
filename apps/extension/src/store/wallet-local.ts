import { HDMasterSeedT } from '@radixdlt/crypto'
import { LocalWalletState } from './types'

export const factory = (set): LocalWalletState => ({
	masterSeed: null,

	setMasterSeedAction: (seed: HDMasterSeedT) => {
		set(draft => {
			draft.masterSeed = seed
		})
	},
})
