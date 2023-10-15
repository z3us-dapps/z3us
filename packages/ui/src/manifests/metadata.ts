import { type ManifestBuilder, str } from '@radixdlt/radix-engine-toolkit'

interface IAccountMetadata {
	name: string
	description: string
	domain: string
	account_type: string
}

export const updateAccountMetadata = (manifest: ManifestBuilder, address: string) => (details: IAccountMetadata) =>
	Object.entries(details).map(([key, value]) => manifest.callMetadataMethod(address, 'set', [str(key), value]))
