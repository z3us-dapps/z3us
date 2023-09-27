import { Curve, Signature, SignatureWithPublicKey } from '@radixdlt/radix-engine-toolkit'
import { Convert } from '@radixdlt/radix-engine-toolkit'

export type SignatureJSON = {
	signature: string
	curve: Curve
}

export function signatureToJSON(signature: Signature): SignatureJSON {
	return {
		signature: Convert.Uint8Array.toHexString(signature.signature),
		curve: signature.curve,
	}
}

export function signatureFromJSON({ signature, curve }: SignatureJSON): Signature | null {
	switch (curve) {
		case 'Secp256k1':
			return new Signature.Secp256k1(Convert.HexString.toUint8Array(signature))
		case 'Ed25519':
			return new Signature.Ed25519(Convert.HexString.toUint8Array(signature))
		default:
			return null
	}
}

export type SignatureWithPublicKeyJSON = {
	signature: string
	publicKey: string
	curve: Curve
}

export function signatureWithPublicKeyToJSON(signature: SignatureWithPublicKey): SignatureWithPublicKeyJSON {
	return {
		signature: Convert.Uint8Array.toHexString(signature.signature),
		publicKey: signature.publicKey ? Convert.Uint8Array.toHexString(signature.publicKey) : '',
		curve: signature.curve,
	}
}

export function signatureWithPublicKeyFromJSON({
	signature,
	publicKey,
	curve,
}: SignatureWithPublicKeyJSON): SignatureWithPublicKey | null {
	switch (curve) {
		case 'Secp256k1':
			return new SignatureWithPublicKey.Secp256k1(Convert.HexString.toUint8Array(signature))
		case 'Ed25519':
			return new SignatureWithPublicKey.Ed25519(
				Convert.HexString.toUint8Array(signature),
				Convert.HexString.toUint8Array(publicKey),
			)
		default:
			return null
	}
}
