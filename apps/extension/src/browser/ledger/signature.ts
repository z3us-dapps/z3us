import type { Curve } from '@radixdlt/radix-engine-toolkit'

export function signatureCurveFromLedgerCurve(curve: 'secp256k1' | 'curve25519'): Curve {
	switch (curve) {
		case 'secp256k1':
			return 'Secp256k1'
		case 'curve25519':
			return 'Ed25519'
		default:
			throw new Error(`Unknown curve: ${curve}`)
	}
}
