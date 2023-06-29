import type { ManifestBuilder, NonFungibleLocalIdString } from '@radixdlt/radix-dapp-toolkit'

interface SendFungibleTokens {
	tokens: Array<{
		resource: string
		amount: number
	}>
	from: string
	to: string
}

export const sendFungibleTokens = (manifest: ManifestBuilder, fungibles: Array<SendFungibleTokens>): ManifestBuilder =>
	fungibles.reduce(
		(group, { tokens, from, to }, idx) =>
			tokens
				.reduce(
					(amounts, { resource, amount }) =>
						amounts
							.withdrawFromAccount(from, resource, amount)
							.takeFromWorktopByAmount(amount, resource, `fungible${idx}`),
					group,
				)
				.callMethod(to, 'deposit', [`Bucket('fungible${idx}')`]),
		manifest,
	)

interface SendNftTokens {
	from: string
	to: string
	tokens: Array<{
		resource: string
		ids: NonFungibleLocalIdString[]
	}>
}

export const sendNftTokens = (manifest: ManifestBuilder, nfts: Array<SendNftTokens>): ManifestBuilder =>
	nfts.reduce(
		(group, { tokens, from, to }, idx) =>
			tokens
				.reduce(
					(amounts, { resource, ids }) =>
						amounts
							.withdrawNonFungiblesFromAccount(from, resource, ids)
							.takeFromWorktopByIds(ids, resource, `nfts${idx}`),
					group,
				)
				.callMethod(to, 'deposit', [`Bucket('nfts${idx}')`]),
		manifest,
	)

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
