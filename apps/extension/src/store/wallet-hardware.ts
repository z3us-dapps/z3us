import { GetState, SetState } from 'zustand'
import TransportWebHID from '@ledgerhq/hw-transport-webhid'
import { HardwareWalletLedger } from '@radixdlt/hardware-ledger'
import { AccountStore, HardwareWalletStore } from './types'

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

export const factory = (set: SetState<AccountStore>, get: GetState<AccountStore>): HardwareWalletStore => ({
	hardwareWallet: null,

	connectHW: async () => {
		const hw = await HardwareWalletLedger.create({ send: get().sendAPDUAction }).toPromise()
		set(draft => {
			draft.hardwareWallet = hw
		})
		const { selectAccountAction } = get()
		return selectAccountAction(0)
	},

	sendAPDUAction,
})
