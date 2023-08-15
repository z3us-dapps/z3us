import { ManifestAstValue, type ManifestBuilder } from '@radixdlt/radix-engine-toolkit'

interface CreateFungibleToken {
	initialSupply: number
	name: string
	symbol: string
	description: string
	icon_url?: string
}

interface CreateNftToken {
	icon_url?: string
	name: string
	description: string
	initialSupply: number
	items: string[]
}

export const createToken = (manifest: ManifestBuilder, address: string) => ({
	fungible: (tokens: CreateFungibleToken[]) =>
		tokens
			.reduce(
				(group, { initialSupply, ...details }) =>
					group.createFungibleResourceWithInitialSupply(
						new ManifestAstValue.Bool(true),
						new ManifestAstValue.U8(18),
						new ManifestAstValue.Map(
							ManifestAstValue.Kind.String,
							ManifestAstValue.Kind.String,
							Object.entries(details).map(([key, value]) => [
								new ManifestAstValue.String(key),
								new ManifestAstValue.String(value),
							]),
						),
						new ManifestAstValue.Map(ManifestAstValue.Kind.Enum, ManifestAstValue.Kind.Tuple, []),
						new ManifestAstValue.Decimal(initialSupply),
					),
				manifest,
			)
			.callMethod(address, 'deposit_batch', [ManifestAstValue.Expression.entireWorktop()]),
	nft: (nfts: CreateNftToken[]) =>
		nfts
			.reduce(
				(group, { items, initialSupply, ...details }) =>
					group.createNonFungibleResourceWithInitialSupply(
						new ManifestAstValue.Bool(true),
						new ManifestAstValue.Enum(new ManifestAstValue.EnumU8Discriminator(0)),
						new ManifestAstValue.Tuple([
							new ManifestAstValue.Map(ManifestAstValue.Kind.Tuple, ManifestAstValue.Kind.Enum, []),
							new ManifestAstValue.Map(ManifestAstValue.Kind.String, ManifestAstValue.Kind.Enum, []),
							new ManifestAstValue.Enum(new ManifestAstValue.EnumU8Discriminator(0)),
							new ManifestAstValue.Map(ManifestAstValue.Kind.Tuple, ManifestAstValue.Kind.Enum, []),
							new ManifestAstValue.Map(ManifestAstValue.Kind.String, ManifestAstValue.Kind.Enum, []),
							new ManifestAstValue.Enum(new ManifestAstValue.EnumU8Discriminator(0)),
						]),
						new ManifestAstValue.Map(
							ManifestAstValue.Kind.String,
							ManifestAstValue.Kind.String,
							Object.entries(details).map(([key, value]) => [
								new ManifestAstValue.String(key),
								new ManifestAstValue.String(value),
							]),
						),
						new ManifestAstValue.Map(ManifestAstValue.Kind.Enum, ManifestAstValue.Kind.Tuple, []),
						new ManifestAstValue.Decimal(initialSupply),
					),
				manifest,
			)
			.callMethod(address, 'deposit_batch', [ManifestAstValue.Expression.entireWorktop()]),
})
