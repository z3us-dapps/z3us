import { SigningKey } from '@radixdlt/application'
import { HDMasterSeedT, HDPathRadix, PrivateKey } from '@radixdlt/crypto'
import { HardwareWalletT } from '@radixdlt/hardware-wallet'
import { getDefaultBackgroundForIndex, getDefaultColorSettingsForIndex } from '@src/config'

export const getHWSigningKeyForIndex = async (hardwareWallet: HardwareWalletT | null, index: number) => {
	if (!hardwareWallet) return null

	const hdPath = HDPathRadix.create({ address: { index, isHardened: true } })
	const hardwareSigningKey = await hardwareWallet.makeSigningKey(hdPath, false).toPromise()

	return SigningKey.fromHDPathWithHWSigningKey({ hdPath, hardwareSigningKey })
}

export const getLocalSigningKeyForIndex = async (masterSeed: HDMasterSeedT | null, index: number) => {
	if (!masterSeed) return null

	const key = masterSeed.masterNode().derive(HDPathRadix.create({ address: { index, isHardened: true } }))

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
