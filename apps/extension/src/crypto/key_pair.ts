import type { PublicKey as GatewayPublicKey } from '@radixdlt/babylon-gateway-api-sdk'
import type { BaseHdWallet } from '@radixdlt/connector-extension/src/chrome/dev-tools/hd-wallet/hd-wallet'
import { createRadixWallet } from '@radixdlt/connector-extension/src/chrome/dev-tools/hd-wallet/hd-wallet'
import { Curve as HDWalletCurve } from '@radixdlt/connector-extension/src/chrome/dev-tools/hd-wallet/models'
import type { Curve as KeyCurve } from '@radixdlt/radix-engine-toolkit'
import { Convert, PrivateKey, PublicKey } from '@radixdlt/radix-engine-toolkit'
import { HDKey } from '@scure/bip32'

import type { Account, Persona } from 'ui/src/store/types'
import { CURVE } from 'ui/src/store/types'

import { type Data, DataType } from '@src/types/vault'

import { getSecret } from './secret'

export function hdkeyFromExtendedPrivateKey(xpriv: string): HDKey {
	return HDKey.fromJSON({ xpriv })
}

export function secp256k1FromSeed(seed: string): BaseHdWallet {
	return createRadixWallet({
		seed,
		curve: HDWalletCurve.secp256k1,
	})
}

export function ed25519FromSeed(seed: string): BaseHdWallet {
	return createRadixWallet({
		seed,
		curve: HDWalletCurve.ed25519,
	})
}

export function deriveHDKey(root: HDKey, derivationPath: string): PrivateKey {
	const child = root.derive(derivationPath.split('H').join("'"))
	return new PrivateKey.Secp256k1(child.privateKey)
}

export function deriveSecp256k1(root: BaseHdWallet, derivationPath: string): PrivateKey {
	const child = root.deriveFullPath(derivationPath.split('H').join("'"))
	return new PrivateKey.Secp256k1(child.privateKey)
}

export function deriveEd25519(root: BaseHdWallet, derivationPath: string): PrivateKey {
	const child = root.deriveFullPath(derivationPath.split('H').join("'"))
	return new PrivateKey.Ed25519(child.privateKey)
}

export function getPrivateKey(data: Data, curve: CURVE, derivationPath: string): PrivateKey | null {
	const secret = getSecret(data)
	switch (data?.type) {
		case DataType.MNEMONIC:
			switch (curve) {
				case CURVE.SECP256K1:
					return deriveSecp256k1(secp256k1FromSeed(secret), derivationPath)
				case CURVE.CURVE25519:
					return deriveEd25519(ed25519FromSeed(secret), derivationPath)
				default:
					return null
			}
		case DataType.PRIVATE_KEY:
			return deriveHDKey(hdkeyFromExtendedPrivateKey(secret), derivationPath)
		case DataType.RAW_PRIVATE_KEY:
			switch (curve) {
				case CURVE.SECP256K1:
					return new PrivateKey.Secp256k1(secret)
				case CURVE.CURVE25519:
					return new PrivateKey.Ed25519(secret)
				default:
					return null
			}
		default:
			return null
	}
}

export type PublicKeyJSON = {
	publicKey: string
	curve: KeyCurve
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

export function gatewayPublicKeyFromPersonaOrAccount({ publicKeyHex, curve }: Account | Persona): GatewayPublicKey {
	switch (curve) {
		case CURVE.SECP256K1:
			return { key_type: 'EcdsaSecp256k1', key_hex: publicKeyHex }
		case CURVE.CURVE25519:
			return { key_type: 'EddsaEd25519', key_hex: publicKeyHex }
		default:
			throw new Error(`Invalid curve: ${curve}`)
	}
}
