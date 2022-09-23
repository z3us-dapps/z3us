import { HardwareWalletT } from '@radixdlt/hardware-wallet'
import { HardwareWalletStore } from './types'

export const factory = (set): HardwareWalletStore => ({
	hardwareWallet: null,
	isHardwareWallet: false,

	setHardwareWalletAction: (hw: HardwareWalletT) => {
		set(draft => {
			draft.hardwareWallet = hw
		})
	},

	unlockHardwareWalletAction: () => {
		set(draft => {
			draft.isHardwareWallet = true
		})
	},
})
