import { ManifestAstValue, type ManifestBuilder } from '@radixdlt/radix-engine-toolkit'

interface SendFungibleTokens {
	tokens: Array<{
		resource: string
		amount: number
	}>
	from: string
	to: string
}

export const sendFungibleTokens = (
	manifest: ManifestBuilder,
	fungibles: Array<SendFungibleTokens>,
): ManifestBuilder => {
	// group amounts by token and then by from account address to reduce number of method calls on manifest
	const amountsByTokenByAccount = fungibles.reduce(
		(container, fungible) => ({
			...container,
			[fungible.from]: fungible.tokens.reduce(
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
	return fungibles.reduce(
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
	tokens: Array<{
		resource: string
		ids: string[]
	}>
}

export const sendNftTokens = (manifest: ManifestBuilder, nfts: Array<SendNftTokens>): ManifestBuilder => {
	// group ids by token and then by from account address to reduce number of method calls on manifest
	const idsByTokenByAccount = nfts.reduce(
		(container, nft) => ({
			...container,
			[nft.from]: nft.tokens.reduce(
				(tokens, token) => ({
					...tokens,
					[token.resource]: token.ids.reduce((ids, id) => ({ ...ids, [id]: null }), tokens[token.resource] || {}),
				}),
				{},
			),
		}),
		{},
	)

	// withdraw aggregated nfts by ids
	manifest = Object.entries(idsByTokenByAccount).reduce(
		(group, [from, tokens]) =>
			Object.entries(tokens).reduce(
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
	return nfts.reduce(
		(group, { tokens, to }) =>
			tokens.reduce(
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

interface CreateFungibleToken {
	address: string
	initialSupply: number
	name: string
	symbol: string
	description: string
	icon_url?: string
}

interface CreateNftToken {
	address: string
	icon_url?: string
	name: string
	description: string
	items: string[]
}

export const createToken = (address: string) => ({
	fungible: ({ initialSupply, ...details }: CreateFungibleToken) => `CREATE_FUNGIBLE_RESOURCE_WITH_INITIAL_SUPPLY
    18u8
    Map<String, String>(
        ${Object.entries(details)
					.filter(([, value]) => !!value)
					.map(([key, value]) => `"${key}", "${value}"`)
					.join(', ')}
    ) 
    Map<Enum, Tuple>(
        Enum("ResourceMethodAuthKey::Withdraw"), Tuple(Enum("AccessRule::AllowAll"), Enum("AccessRule::DenyAll")),
        Enum("ResourceMethodAuthKey::Deposit"), Tuple(Enum("AccessRule::AllowAll"), Enum("AccessRule::DenyAll"))
    )
    Decimal("${initialSupply}");
  
  # Depositing the entirety of the initial supply of the newly created resource into our account 
  # component.
  CALL_METHOD
    Address("${address}") 
    "deposit_batch"
    Expression("ENTIRE_WORKTOP");`,
	nft: ({ items, ...details }: CreateNftToken) => `CREATE_NON_FUNGIBLE_RESOURCE_WITH_INITIAL_SUPPLY
        Enum("NonFungibleIdType::Integer")
        Tuple(Tuple(Array<Enum>(), Array<Tuple>(), Array<Enum>()), Enum(0u8, 64u8), Array<String>())
        Map<String, String>(${Object.entries(details)
					.filter(([, value]) => !!value)
					.map(([key, value]) => `"${key}", "${value}"`)
					.join(', ')}
        )
        Map<Enum, Tuple>(
            Enum("ResourceMethodAuthKey::Withdraw"), Tuple(Enum("AccessRule::AllowAll"), Enum("AccessRule::DenyAll")),
            Enum("ResourceMethodAuthKey::Deposit"), Tuple(Enum("AccessRule::AllowAll"), Enum("AccessRule::DenyAll"))
        )
        Map<NonFungibleLocalId, Tuple>(${items
					.map((item, index) => `NonFungibleLocalId("#${index + 1}#"), Tuple(Tuple("${item}", Decimal("${index}")))`)
					.join(', ')}
        );
      
      CALL_METHOD
        Address("${address}") 
        "deposit_batch"
        Expression("ENTIRE_WORKTOP");`,
})
