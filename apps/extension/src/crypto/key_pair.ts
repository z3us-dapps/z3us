import type { PublicKey } from '@radixdlt/radix-engine-toolkit'
import { PrivateKey } from '@radixdlt/radix-engine-toolkit'
import { HDKey } from '@scure/bip32'
import { entropyToMnemonic, mnemonicToSeedSync } from 'bip39'

import { type Data, DataType } from '@src/types/vault'

export function legacyDerivePrivateKeyFromIndex(root: HDKey, index: number = 0): PrivateKey {
	// // `m/${purpose}'/${coin_type}'/${account}'/${change}/${address_index}`
	// // defaults to: `m/44'/1022'/0'/0/0`
	const child = root.derive(`m/44'/1022'/0'/0/${index}`)

	return new PrivateKey.Secp256k1(child.privateKey)
}

export function legacyEntropyToPrivateKey(entropyHex: string): HDKey {
	const entropy = Buffer.from(entropyHex, 'hex')
	const mnemonic = entropyToMnemonic(entropy)
	const seed = mnemonicToSeedSync(mnemonic)

	return HDKey.fromMasterSeed(seed)
}

export function fromExtendedPrivateKey(xpriv: string): HDKey {
	return HDKey.fromJSON({ xpriv })
}

export function getPrivateKey(data: Data, index: number = 0): PrivateKey | null {
	switch (data.type) {
		case DataType.MNEMONIC:
			return legacyDerivePrivateKeyFromIndex(legacyEntropyToPrivateKey(data.secret), index)
		case DataType.PRIVATE_KEY:
			return legacyDerivePrivateKeyFromIndex(fromExtendedPrivateKey(data.secret), index)
		case DataType.ECDSA_SECP_256K1:
			return new PrivateKey.Secp256k1(data.secret)
		case DataType.EDDSA_ED25519:
			return new PrivateKey.Ed25519(data.secret)
		default:
			return null
	}
}

export function getPublicKey(data: Data, index: number = 0): PublicKey | null {
	const pk = getPrivateKey(data, index)
	if (!pk) {
		return null
	}
	return pk.publicKey()
}
