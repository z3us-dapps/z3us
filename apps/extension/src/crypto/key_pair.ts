import type { PublicKey } from '@radixdlt/radix-engine-toolkit'
import { PrivateKey } from '@radixdlt/radix-engine-toolkit'
import bip39 from 'bip39'
import hdkey from 'hdkey'

import { entropyToMnemonic } from '@src/crypto/mnemonic'
import { type Data, DataType } from '@src/types/vault'

export function legacyDerivePrivateKeyFromIndex(
	privateKey: PrivateKey.Secp256k1,
	index: number = 0,
): PrivateKey.Ed25519 {
	const root = hdkey.fromMasterSeed(privateKey.toString())
	// `m/${purpose}'/${coin_type}'/${account}'/${change}/${address_index}`
	// defaults to: `m/44'/1022'/0'/0/0`
	const key = root.derive(`m/44'/1022'/0'/0/${index}`)
	return new PrivateKey.Ed25519(key.toString('hex'))
}

export function legacyEntropyToPrivateKey(entropy: string): PrivateKey.Ed25519 {
	const mnemonic = entropyToMnemonic(entropy)
	const seed = bip39.mnemonicToSeedSync(mnemonic).toString('hex')
	const root = hdkey.fromMasterSeed(Buffer.from(seed, 'hex'))
	return new PrivateKey.Ed25519(root.privateKey.toString('hex'))
}

export function fromExtendedPrivateKey(xpriv: string): PrivateKey.Ed25519 {
	const root = hdkey.fromJSON({ xpriv, xpub: 'not used' })
	return new PrivateKey.Ed25519(root.privateKey.toString('hex'))
}

export function getPrivateKey(data: Data, index: number = 0): PrivateKey.IPrivateKey | null {
	switch (data.type) {
		case DataType.MNEMONIC:
			return legacyDerivePrivateKeyFromIndex(legacyEntropyToPrivateKey(data.secret), index)
		case DataType.PRIVATE_KEY:
			return legacyDerivePrivateKeyFromIndex(fromExtendedPrivateKey(data.secret), index)
		case DataType.ECDSA_SECP_256K1:
			return new PrivateKey.Ed25519(data.secret)
		case DataType.EDDSA_ED25519:
			return new PrivateKey.Ed25519(data.secret)
		default:
			return null
	}
}

export function getPublicKey(data: Data, index: number = 0): PublicKey.PublicKey | null {
	const pk = getPrivateKey(data, index)
	if (!pk) {
		return null
	}
	return pk.publicKey()
}
