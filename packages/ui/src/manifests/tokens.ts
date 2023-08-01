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
	items: string[]
}

export const createToken = (address: string) => ({
	fungible: ({ initialSupply, name, symbol,description, icon_url }: CreateFungibleToken) => `
	CREATE_FUNGIBLE_RESOURCE_WITH_INITIAL_SUPPLY
		# Owner role - This gets metadata permissions, and is the default for other permissions
		# Can set as Enum<OwnerRole::Fixed>(access_rule)  or Enum<OwnerRole::Updatable>(access_rule)
		Enum<OwnerRole::None>()
		true             # Whether the engine should track supply (avoid for massively parallelizable tokens)
		18u8             # Divisibility (between 0u8 and 18u8)
		Decimal("${initialSupply}") # Initial supply
		Tuple(
			Some(         # Mint Roles (if None: defaults to DenyAll, DenyAll)
				Tuple(
					Some(Enum<AccessRule::AllowAll>()),  # Minter (if None: defaults to Owner)
					Some(Enum<AccessRule::DenyAll>())    # Minter Updater (if None: defaults to Owner)
				)
			),
			None,        # Burn Roles (if None: defaults to DenyAll, DenyAll)
			None,        # Freeze Roles (if None: defaults to DenyAll, DenyAll)
			None,        # Recall Roles (if None: defaults to DenyAll, DenyAll)
			None,        # Withdraw Roles (if None: defaults to AllowAll, DenyAll)
			None         # Deposit Roles (if None: defaults to AllowAll, DenyAll)
		)
		Tuple(                                                                   # Metadata initialization
			Map<String, Tuple>(                                                  # Initial metadata values
				"name" => Tuple(
					Some(Enum<Metadata::String>("${name}")),    				 # Resource Name
					true                                                         # Locked
				),
				"symbol" => Tuple(
					Some(Enum<Metadata::String>("${symbol}")),   
					true                                                        
				),
				"description" => Tuple(
					Some(Enum<Metadata::String>("${description}")),   
					false                                                        
				),
				"icon_url" => Tuple(
				  Some(Enum<Metadata::Url>("${icon_url}")),
				  false
				)
			),
			Map<String, Enum>(                                                   # Metadata roles
				"metadata_setter" => Some(Enum<AccessRule::AllowAll>()),         # Metadata setter role
				"metadata_setter_updater" => None,                               # Metadata setter updater role as None defaults to OWNER
				"metadata_locker" => Some(Enum<AccessRule::DenyAll>()),          # Metadata locker role
				"metadata_locker_updater" => None                                # Metadata locker updater role as None defaults to OWNER
			)
		)
		None;             # No Address Reservation	
  
	# Depositing the entirety of the initial supply of the newly created resource into our account 
	# component.
	CALL_METHOD
		Address("${address}") 
		"deposit_batch"
		Expression("ENTIRE_WORKTOP");`,
	nft: ({ items, ...details }: CreateNftToken) => `
	CREATE_NON_FUNGIBLE_RESOURCE_WITH_INITIAL_SUPPLY
		# Owner role - This gets metadata permissions, and is the default for other permissions
		# Can set as Enum<OwnerRole::Fixed>(access_rule)  or Enum<OwnerRole::Updatable>(access_rule)
		Enum<OwnerRole::None>()
		Enum<NonFungibleIdType::Integer>()                                                                  # The type of NonFungible Id
		true                                                                                                # Whether the engine should track supply (avoid for massively parallelizable tokens)
		Tuple(Tuple(Array<Enum>(), Array<Tuple>(), Array<Enum>()), Enum<0u8>(66u8), Array<String>())        # Non Fungible Data Schema
		Map<NonFungibleLocalId, Tuple>(${items
					.map((item, index) => `NonFungibleLocalId("#${index + 1}#"), Tuple(Tuple("${item}", Decimal("${index}")))`)
					.join(', ')}
		);
		Tuple(
			Some(         # Mint Roles (if None: defaults to DenyAll, DenyAll)
				Tuple(
					Some(Enum<AccessRule::AllowAll>()),  # Minter (if None: defaults to Owner)
					Some(Enum<AccessRule::DenyAll>())    # Minter Updater (if None: defaults to Owner)
				)
			),
			None,        # Burn Roles (if None: defaults to DenyAll, DenyAll)
			None,        # Freeze Roles (if None: defaults to DenyAll, DenyAll)
			None,        # Recall Roles (if None: defaults to DenyAll, DenyAll)
			None,        # Withdraw Roles (if None: defaults to AllowAll, DenyAll)
			None,        # Deposit Roles (if None: defaults to AllowAll, DenyAll)
			None         # Non Fungible Data Update Roles (if None: defaults to DenyAll, DenyAll)
		)
		Tuple(                                                       # Metadata initialization
			Map<String, String>(${Object.entries(details)
				.filter(([, value]) => !!value)
				.map(([key, value]) => `
					"${key}" => Tuple(
						Some(Enum<Metadata::String>("${value}")),    # Resource Name
						false                                      	 # Locked
					)`
				)
				.join(', ')}
			),
			Map<String, Enum>(                                                   # Metadata roles
				"metadata_setter" => Some(Enum<AccessRule::AllowAll>()),         # Metadata setter role
				"metadata_setter_updater" => None,                               # Metadata setter updater role as None defaults to OWNER
				"metadata_locker" => Some(Enum<AccessRule::DenyAll>()),          # Metadata locker role
				"metadata_locker_updater" => None                                # Metadata locker updater role as None defaults to OWNER
			)
		)
		None;

	CALL_METHOD
		Address("${address}") 
		"deposit_batch"
		Expression("ENTIRE_WORKTOP");`,
})
