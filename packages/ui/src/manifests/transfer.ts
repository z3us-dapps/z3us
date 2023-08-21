import { ManifestAstValue, type ManifestBuilder } from '@radixdlt/radix-engine-toolkit'

interface SendFungibleTokens {
	from: string
	to: string
	tokens: Array<{
		resource: string
		amount: number
	}>
}

export const sendFungibleTokens = (
	manifest: ManifestBuilder,
	transfers: Array<SendFungibleTokens>,
): ManifestBuilder => {
	// group amounts by token and then by from account address to reduce number of method calls on manifest
	const amountsByTokenByAccount = transfers.reduce(
		(container, transfer) => ({
			...container,
			[transfer.from]: transfer.tokens.reduce(
				(tokens, token) => ({ ...tokens, [token.resource]: token.amount + tokens[token.resource] }),
				{},
			),
		}),
		{},
	)

	// withdraw aggregated amounts
	manifest = Object.entries(amountsByTokenByAccount).reduce(
		(group, [from, tokens]) =>
			Object.entries(tokens).reduce(
				(amounts, [resource, amount]) =>
					amounts.callMethod(from, 'withdraw', [
						new ManifestAstValue.Address(resource),
						new ManifestAstValue.Decimal(amount),
					]),
				group,
			),
		manifest,
	)

	// deposit from worktop to destination account correct amounts
	return transfers.reduce(
		(group, { tokens, to }) =>
			tokens.reduce(
				(amounts, { resource, amount }) =>
					amounts.takeFromWorktop(resource, amount, (builder: ManifestBuilder, bucket: ManifestAstValue.Bucket) =>
						builder.callMethod(to, 'try_deposit_or_abort', [bucket]),
					),
				group,
			),
		manifest,
	)
}

interface SendNftTokens {
	from: string
	to: string
	nfts: Array<{
		resource: string
		ids: string[]
	}>
}

export const sendNftTokens = (manifest: ManifestBuilder, transfers: Array<SendNftTokens>): ManifestBuilder => {
	// group ids by token and then by from account address to reduce number of method calls on manifest
	const idsByNftByAccount = transfers.reduce(
		(container, nft) => ({
			...container,
			[nft.from]: nft.nfts.reduce(
				(nfts, token) => ({
					...nfts,
					[token.resource]: token.ids.reduce((ids, id) => ({ ...ids, [id]: null }), nfts[token.resource] || {}),
				}),
				{},
			),
		}),
		{},
	)

	// withdraw aggregated nfts by ids
	manifest = Object.entries(idsByNftByAccount).reduce(
		(group, [from, nft]) =>
			Object.entries(nft).reduce(
				(ids, [resource, idMap]) =>
					ids.callMethod(from, 'withdraw', [
						new ManifestAstValue.Address(resource),
						new ManifestAstValue.Array(
							ManifestAstValue.Kind.Array,
							Object.keys(idMap).map(id => new ManifestAstValue.NonFungibleLocalId(id)),
						),
					]),
				group,
			),
		manifest,
	)

	// deposit from worktop to destination account correct nfts by ids
	return transfers.reduce(
		(group, { nfts, to }) =>
			nfts.reduce(
				(amounts, { resource, ids }) =>
					amounts.takeNonFungiblesFromWorktop(
						resource,
						ids.map(id => new ManifestAstValue.NonFungibleLocalId(id)),
						(builder: ManifestBuilder, bucket: ManifestAstValue.Bucket) =>
							builder.callMethod(to, 'try_deposit_or_abort', [bucket]),
					),
				group,
			),
		manifest,
	)
}
