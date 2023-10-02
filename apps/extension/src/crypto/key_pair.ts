import type { BaseHdWallet } from '@radixdlt/connector-extension/src/chrome/dev-tools/hd-wallet/hd-wallet'
import { createRadixWallet } from '@radixdlt/connector-extension/src/chrome/dev-tools/hd-wallet/hd-wallet'
import { Curve as HDWalletCurve } from '@radixdlt/connector-extension/src/chrome/dev-tools/hd-wallet/models'
import type { Curve } from '@radixdlt/radix-engine-toolkit'
import { Convert, PrivateKey, PublicKey } from '@radixdlt/radix-engine-toolkit'
import { HDKey } from '@scure/bip32'

import { type Data, DataType } from '@src/types/vault'

import { getSecret } from './secret'

export function hdkeyFromExtendedPrivateKey(xpriv: string): HDKey {
	return HDKey.fromJSON({ xpriv })
}

export function secp256k1FromEntropy(seed: string): BaseHdWallet {
	return createRadixWallet({
		seed,
		curve: HDWalletCurve.secp256k1,
	})
}

export function ed25519FromEntropy(seed: string): BaseHdWallet {
	return createRadixWallet({
		seed,
		curve: HDWalletCurve.ed25519,
	})
}

export function deriveSecp256k1AccountForIndex(wallet: BaseHdWallet, index: number = 0): PrivateKey {
	const child = wallet.deriveFullPath(`m/44H/1022H/0H/0/${index}H`.split('H').join("'"))
	return new PrivateKey.Secp256k1(child.privateKey)
}

export function deriveEd25519AccountForIndex(wallet: BaseHdWallet, index: number = 0): PrivateKey {
	const child = wallet.deriveFullPath(`m/44H/1022H/14H/525H/1460H/${index}H`.split('H').join("'"))
	return new PrivateKey.Ed25519(child.privateKey)
}

export function deriveEd25519PersonaForIndex(wallet: BaseHdWallet, index: number = 0): PrivateKey {
	const child = wallet.deriveFullPath(`m/44H/1022H/14H/618H/1460H/${index}H`.split('H').join("'"))
	return new PrivateKey.Ed25519(child.privateKey)
}

export function deriveHDKeyAccountForIndex(root: HDKey, index: number = 0): PrivateKey {
	const child = root.derive(`m/44'/1022'/0'/0/${index}`)
	return new PrivateKey.Secp256k1(child.privateKey)
}

export function deriveHDKeyPersonaForIndex(root: HDKey, index: number = 0): PrivateKey {
	const child = root.derive(`m/44'/1022'/0'/0/${index}`)
	return new PrivateKey.Ed25519(child.privateKey)
}

export function getAccountPrivateKey(data: Data, index: number = 0): PrivateKey | null {
	const secret = getSecret(data)
	switch (data?.type) {
		case DataType.ECDSA_SECP_256K1:
			return deriveSecp256k1AccountForIndex(secp256k1FromEntropy(secret), index)
		case DataType.EDDSA_ED25519:
			return deriveEd25519AccountForIndex(ed25519FromEntropy(secret), index)
		case DataType.PRIVATE_KEY:
			return deriveHDKeyAccountForIndex(hdkeyFromExtendedPrivateKey(secret), index)
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
	const secret = getSecret(data)
	switch (data?.type) {
		case DataType.ECDSA_SECP_256K1:
		case DataType.EDDSA_ED25519:
			return deriveEd25519PersonaForIndex(ed25519FromEntropy(secret), index)
		case DataType.PRIVATE_KEY:
			return deriveHDKeyPersonaForIndex(hdkeyFromExtendedPrivateKey(secret), index)
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
