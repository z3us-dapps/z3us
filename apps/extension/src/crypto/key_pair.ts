import { Curve, PublicKey } from '@radixdlt/radix-engine-toolkit'
import { Convert, PrivateKey } from '@radixdlt/radix-engine-toolkit'
import { HDKey } from '@scure/bip32'
import { entropyToMnemonic, mnemonicToSeedSync } from 'bip39'

import { type Data, DataType } from '@src/types/vault'

export function fromExtendedPrivateKey(xpriv: string): HDKey {
	return HDKey.fromJSON({ xpriv })
}

export function fromEntropy(entropyHex: string): HDKey {
	const entropy = Buffer.from(entropyHex, 'hex')
	const mnemonic = entropyToMnemonic(entropy)
	const seed = mnemonicToSeedSync(mnemonic)

	return HDKey.fromMasterSeed(seed)
}

export function deriveSecp256k1AccountForIndex(root: HDKey, index: number = 0): PrivateKey {
	// const child = root.derive(`m/44'/1022'/0'/0/${index}`)
	// m/44H/1022H/0H/0/0H
	const child = root.derive(`m/44H/1022H/0H/0/${index}H`)
	return new PrivateKey.Secp256k1(child.privateKey)
}

export function deriveSecp256k1PersonaForIndex(root: HDKey, index: number = 0): PrivateKey {
	return deriveSecp256k1AccountForIndex(root, index)
}

export function deriveEd25519AccountForIndex(root: HDKey, index: number = 0): PrivateKey {
	// m/44H/1022H/14H/525H/1460H/0H
	const child = root.derive(`m/44H/1022H/14H/525H/1460H/${index}H`)
	return new PrivateKey.Ed25519(child.privateKey)
}

export function deriveEd25519PersonaForIndex(root: HDKey, index: number = 0): PrivateKey {
	// m/44H/1022H/14H/618H/1460H/0H
	const child = root.derive(`m/44H/1022H/14H/618H/1460H/${index}H`)
	return new PrivateKey.Ed25519(child.privateKey)
}

export function getAccountPrivateKey(data: Data, index: number = 0): PrivateKey | null {
	switch (data?.type) {
		case DataType.MNEMONIC:
			return deriveSecp256k1AccountForIndex(fromEntropy(data.secret), index)
		case DataType.PRIVATE_KEY:
			return deriveSecp256k1AccountForIndex(fromExtendedPrivateKey(data.secret), index)
		case DataType.ECDSA_SECP_256K1:
			return deriveSecp256k1AccountForIndex(fromEntropy(data.secret), index)
		case DataType.EDDSA_ED25519:
			return deriveEd25519AccountForIndex(fromEntropy(data.secret), index)
		default:
			return null
	}
}

export function getAccountPublicKey(data: Data, index: number = 0): PublicKey | null {
	const pk = getAccountPrivateKey(data, index)
	if (!pk) {
		return null
	}
	return pk.publicKey()
}

export function getPersonaPrivateKey(data: Data, index: number = 0): PrivateKey | null {
	switch (data?.type) {
		case DataType.MNEMONIC:
			return deriveSecp256k1PersonaForIndex(fromEntropy(data.secret), index)
		case DataType.PRIVATE_KEY:
			return deriveSecp256k1PersonaForIndex(fromExtendedPrivateKey(data.secret), index)
		case DataType.ECDSA_SECP_256K1:
			return deriveSecp256k1PersonaForIndex(fromEntropy(data.secret), index)
		case DataType.EDDSA_ED25519:
			return deriveEd25519PersonaForIndex(fromEntropy(data.secret), index)
		default:
			return null
	}
}

export function getPersonaPublicKey(data: Data, index: number = 0): PublicKey | null {
	const pk = getPersonaPrivateKey(data, index)
	if (!pk) {
		return null
	}
	return pk.publicKey()
}

export type PublicKeyJSON = {
	publicKey: string
	curve: Curve
}

export function publicKeyToJSON(publicKey: PublicKey): PublicKeyJSON {
	return {
		publicKey: publicKey.hexString(),
		curve: publicKey.curve,
	}
}

export function publicKeyFromJSON({ publicKey, curve }: PublicKeyJSON): PublicKey | null {
	switch (curve) {
		case 'Secp256k1':
			return new PublicKey.Secp256k1(Convert.HexString.toUint8Array(publicKey))
		case 'Ed25519':
			return new PublicKey.Ed25519(Convert.HexString.toUint8Array(publicKey))
		default:
			return null
	}
}
