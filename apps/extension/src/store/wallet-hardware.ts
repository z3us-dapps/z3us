import { HardwareWalletT } from '@radixdlt/hardware-wallet'
import { HardwareWalletState } from './types'

export const factory = (set): HardwareWalletState => ({
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
