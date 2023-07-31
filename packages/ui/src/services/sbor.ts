import type { EntityMetadataItem } from '@radixdlt/babylon-gateway-api-sdk'
import { RadixEngineToolkit } from '@radixdlt/radix-engine-toolkit'
import type { ManifestSbor } from '@radixdlt/radix-engine-toolkit/dist/models/value/sbor'

export const sborDecodeMetadata = async (networkId: number, item?: EntityMetadataItem) => {
	const hex = item?.value.raw_hex
	if (!hex) {
		return ''
	}
	const value = (await RadixEngineToolkit.sborDecode(hex, networkId)) as ManifestSbor
	return value.toString()
}
