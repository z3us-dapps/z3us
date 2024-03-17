import type { AuthLoginWithChallengeRequestResponseItem } from '@radixdlt/radix-dapp-toolkit'
import type { Curve } from '@radixdlt/radix-engine-toolkit'
import { Convert, Signature, SignatureWithPublicKey } from '@radixdlt/radix-engine-toolkit'
import { blake2b } from 'blakejs'

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

export function signatureWithPublicKeyToJSON(
	signature: SignatureWithPublicKey,
	pk?: Uint8Array,
): SignatureWithPublicKeyJSON {
	return {
		signature: Convert.Uint8Array.toHexString(signature.signature),
		publicKey: Convert.Uint8Array.toHexString(signature.publicKey || pk || new Uint8Array()),
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

export function proofCurve(curve: Curve): AuthLoginWithChallengeRequestResponseItem['proof']['curve'] {
	switch (curve) {
		case 'Secp256k1':
			return 'secp256k1'
		case 'Ed25519':
			return 'curve25519'
		default:
			throw new Error(`Unknown curve: ${curve}`)
	}
}

export function hash(data: Uint8Array): Uint8Array {
	return blake2b(data, undefined, 32)
}

export function getDAppDataToSign(challengeHex: string, origin: string, dAppDefinitionAddress: string): Uint8Array {
	if (dAppDefinitionAddress.length > 255) {
		throw new Error('dAppDefinitionAddress length exceeds maximum value')
	}
	const ROLA_PAYLOAD_PREFIX = 0x52
	const challengeHexBytes = Convert.HexString.toUint8Array(challengeHex)
	const dAppDefinitionAddressLength = dAppDefinitionAddress.length
	const dAppDefinitionAddressBytes = dAppDefinitionAddress.split('').map(char => char.charCodeAt(0))
	const originBytes = origin.split('').map(char => char.charCodeAt(0))

	return hash(
		new Uint8Array([
			ROLA_PAYLOAD_PREFIX,
			...challengeHexBytes,
			dAppDefinitionAddressLength,
			...dAppDefinitionAddressBytes,
			...originBytes,
		]),
	)
}
