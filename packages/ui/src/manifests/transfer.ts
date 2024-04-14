import {
	type ManifestBuilder,
	ValueKind,
	address,
	array,
	bucket,
	decimal,
	enumeration,
	nonFungibleLocalId,
} from '@radixdlt/radix-engine-toolkit'

interface SendFungibleTokens {
	from: string
	to: string
	tokens: Array<{
		resource: string
		amount: string
	}>
}

const NONE = enumeration(0)

export const sendFungibleTokens = (
	manifest: ManifestBuilder,
	transfers: Array<SendFungibleTokens>,
): ManifestBuilder => {
	// group amounts by token and then by from account address to reduce number of method calls on manifest
	const amountsByTokenByAccount = transfers.reduce(
		(container, transfer) => ({
			...container,
			[transfer.from]: transfer.tokens.reduce(
				(tokens, token) => ({
					...tokens,
					[token.resource]: decimal(token.amount)
						.value.add(decimal(tokens[token.resource] || 0).value)
						.toString(),
				}),
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
					amounts.callMethod(from.trim(), 'withdraw', [address(resource.trim()), decimal(amount)]),
				group,
			),
		manifest,
	)

	// deposit from worktop to destination account correct amounts
	return transfers.reduce(
		(group, { tokens, to }) =>
			tokens.reduce(
				(amounts, { resource, amount }) =>
					amounts.takeFromWorktop(
						resource.trim(),
						decimal(amount).value,
						(builder: ManifestBuilder, bucketId: number) =>
							builder.callMethod(to.trim(), 'try_deposit_or_abort', [bucket(bucketId), NONE]),
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
			Object.entries(nft).reduce((ids, [resource, idMap]) => {
				Object.keys(idMap).forEach(id => {
					ids = ids.callMethod(from.trim(), 'withdraw_non_fungibles', [
						address(resource.trim()),
						array(ValueKind.NonFungibleLocalId, nonFungibleLocalId(id.trim())),
					])
				})
				return ids
			}, group),
		manifest,
	)

	// deposit from worktop to destination account correct nfts by ids
	return transfers.reduce(
		(group, { nfts, to }) =>
			nfts.reduce(
				(amounts, { resource, ids }) =>
					amounts.takeNonFungiblesFromWorktop(resource.trim(), ids, (builder: ManifestBuilder, bucketId: number) =>
						builder.callMethod(to.trim(), 'try_deposit_or_abort', [bucket(bucketId), NONE]),
					),
				group,
			),
		manifest,
	)
}
