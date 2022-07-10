import { SetState } from 'zustand'
import { HardwareWalletT } from '@radixdlt/hardware-wallet'
import { HardwareWalletStore, SharedStore } from './types'

export const factory = (set: SetState<SharedStore>): HardwareWalletStore => ({
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
