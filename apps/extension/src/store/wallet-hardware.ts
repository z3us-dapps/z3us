import { SetState } from 'zustand'
import TransportWebHID from '@ledgerhq/hw-transport-webhid'
import { HardwareWalletT } from '@radixdlt/hardware-wallet'
import { HardwareWalletStore, SharedStore } from './types'

export const sendAPDUAction = async (
	cla: number,
	ins: number,
	p1: number,
	p2: number,
	data?: Buffer,
	statusList?: number[],
) => {
	const transport = await TransportWebHID.openConnected()
	try {
		const result = await transport.send(cla, ins, p1, p2, data, statusList)
		await transport.close()
		return result
	} catch (e) {
		await transport.close()
		throw e
	}
}

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

	sendAPDUAction,
})
