import type { ManifestBuilder } from '@radixdlt/radix-engine-toolkit'

interface IAccountMetadata {
	name: string
	description: string
	domain: string
	account_type: string
}

export const updateAccountMetadata = (manifest: ManifestBuilder, address: string) => (details: IAccountMetadata) =>
	manifest
// Object.entries(details).map(([key, value]) => manifest.setMetadata(address, new ManifestAstValue.String(key), value))
