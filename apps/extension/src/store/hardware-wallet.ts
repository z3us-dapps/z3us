import TransportNodeHid from '@ledgerhq/hw-transport-webhid'
import { Account, AccountT, AccountAddress, SigningKey } from '@radixdlt/application'
import { HDPathRadix } from '@radixdlt/crypto'
import { HardwareWalletLedger } from '@radixdlt/hardware-ledger'
import { WalletStore } from './wallet'

export const steps = {
	SELECT_DEVICE: 'generate_phrase',
	IMPORT_ACCOUNTS: 'import_accounts',
	COMPLETE: 'complete',
}

export type HardwareWalletStore = {
	account: AccountT | null
	hardwareWalletStep: string
	hwPublicAddresses: string[]

	connectHWAction: () => Promise<void>
	setHardwareWalletStepAction: (step: string) => void
	setHWPublicAddressesAction: (addresses: string[]) => void
	removeLastHWPublicAddressAction: () => void
	sendAPDUAction: (
		cla: number,
		ins: number,
		p1: number,
		p2: number,
		data?: Buffer,
		statusList?: number[],
	) => Promise<Buffer>
}

export const whiteList = ['hwPublicAddresses']

const connectHW = async (state: HardwareWalletStore & WalletStore) => {
	const hardwareWallet = await HardwareWalletLedger.create({ send: state.sendAPDUAction }).toPromise()
	const hdPath = HDPathRadix.create({ address: { index: 1, isHardened: true } })
	const hardwareSigningKey = await hardwareWallet.makeSigningKey(hdPath, true).toPromise()

	const signingKey = SigningKey.fromHDPathWithHWSigningKey({ hdPath, hardwareSigningKey })

	const network = state.networks[state.selectedNetworkIndex]
	const address = AccountAddress.fromPublicKeyAndNetwork({
		publicKey: signingKey.publicKey,
		network: network.id,
	})

	state.account = Account.create({ address, signingKey })
	if (state.hwPublicAddresses.length <= state.selectedAccountIndex) {
		state.hwPublicAddresses = [...state.hwPublicAddresses, address.toString()]
	}
}

export const createHardwareWalletStore = set => ({
	account: null,
	hardwareWalletStep: steps.SELECT_DEVICE,
	device: null,
	hwPublicAddresses: [],

	connectHWAction: () =>
		new Promise<void>((resolve, reject) => {
			set(async state => {
				try {
					connectHW(state)
					resolve()
				} catch (error) {
					reject(error)
				}
			})
		}),

	setHardwareWalletStepAction: (step: string): void =>
		set(state => {
			state.hardwareWalletStep = step
		}),

	setHWPublicAddressesAction: (addresses: string[]) => {
		set(state => {
			state.hwPublicAddresses = addresses
		})
	},

	removeLastHWPublicAddressAction: () => {
		set(state => {
			if (state.hwPublicAddresses.length > 1) {
				state.hwPublicAddresses = state.hwPublicAddresses.slice(0, -1)
			}
		})
	},

	sendAPDUAction: async (cla: number, ins: number, p1: number, p2: number, data?: Buffer, statusList?: number[]) => {
		const devices = await TransportNodeHid.list()
		if (devices.length === 0) {
			throw new Error('No device selected')
		}
		const transport = await TransportNodeHid.open(devices[0])
		try {
			const result = await transport.send(cla, ins, p1, p2, data, statusList)
			transport.close()
			return result
		} catch (e) {
			transport.close()
			throw e
		}
	},
})
