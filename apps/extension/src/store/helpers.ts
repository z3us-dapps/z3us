import { SigningKey } from '@radixdlt/application'
import { HDPathRadix, PrivateKey } from '@radixdlt/crypto'
import { getDefaultBackgroundForIndex, getDefaultColorSettingsForIndex } from '@src/config'
import { HardwareWalletStore, LocalWalletStore } from './types'

export const getHWSigningKeyForIndex = async (state: HardwareWalletStore, index: number) => {
	if (!state.hardwareWallet) return null

	const hdPath = HDPathRadix.create({ address: { index, isHardened: true } })
	const hardwareSigningKey = await state.hardwareWallet.makeSigningKey(hdPath, false).toPromise()

	return SigningKey.fromHDPathWithHWSigningKey({ hdPath, hardwareSigningKey })
}

export const getLocalSigningKeyForIndex = async (state: LocalWalletStore, index: number) => {
	if (!state.masterSeed) return null

	const key = state.masterSeed.masterNode().derive(HDPathRadix.create({ address: { index, isHardened: true } }))

	const pk = PrivateKey.fromHex(key.privateKey.toString())
	if (pk.isErr()) {
		throw pk.error
	}

	return SigningKey.fromPrivateKey({
		privateKey: pk.value,
	})
}

export const getDefaultAddressEntry = (index: number, isHardWallet: boolean) => ({
	isHardWallet,
	background: getDefaultBackgroundForIndex(index),
	colorSettings: getDefaultColorSettingsForIndex(index),
})
