import type { ManifestAddress } from '@radixdlt/radix-engine-toolkit'

export const resolveManifestAddress = (address: ManifestAddress): Extract<ManifestAddress, { kind: 'Static' }> => {
	if (address.kind === 'Static') {
		return address
	}
	throw new Error('Not a static address')
}
