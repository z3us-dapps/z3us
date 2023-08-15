import type { ManifestBuilder } from '@radixdlt/radix-engine-toolkit'

import { createToken } from './tokens'

export const getCreateBadgeManifest = (
	manifest: ManifestBuilder,
	accountAddress: string,
	name: string,
	description: string,
) => createToken(manifest, accountAddress).nft([{ name, description, initialSupply: 1, items: [name] }])
