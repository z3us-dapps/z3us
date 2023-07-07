import type { PublicKey } from '@radixdlt/radix-engine-toolkit'
import { PrivateKey } from '@radixdlt/radix-engine-toolkit'
import bip39 from 'bip39'
import hdkey from 'hdkey'

import { entropyToMnemonic } from '@src/crypto/mnemonic'
import { type Data, DataType } from '@src/types/vault'

export function legacyEntropyToPrivateKey(entropy: string): PrivateKey.IPrivateKey {
	const mnemonic = entropyToMnemonic(entropy)
	const seed = bip39.mnemonicToSeedSync(mnemonic).toString('hex')
	const root = hdkey.fromMasterSeed(Buffer.from(seed, 'hex'))
	// const key = root.derive("m/44'/1022'/0'/0/0")
	return new PrivateKey.Secp256k1(root.privateKey.toString('hex'))
}

export function fromExtendedPrivateKey(xpriv: string): PrivateKey.IPrivateKey {
	const root = hdkey.fromJSON({ xpriv, xpub: 'not used' })
	return new PrivateKey.Secp256k1(root.privateKey.toString('hex'))
}

export function getPrivateKey(data: Data): PrivateKey.IPrivateKey | null {
	switch (data.type) {
		case DataType.MNEMONIC:
			return legacyEntropyToPrivateKey(data.secret)
		case DataType.PRIVATE_KEY:
			return fromExtendedPrivateKey(data.secret)
		case DataType.ECDSA_SECP_256K1:
			return new PrivateKey.Secp256k1(data.secret)
		case DataType.EDDSA_ED25519:
			return new PrivateKey.Ed25519(data.secret)
		default:
			return null
	}
}

export function getPublicKey(data: Data): PublicKey.PublicKey | null {
	const pk = getPrivateKey(data)
	if (!pk) {
		return null
	}
	return pk.publicKey()
}
