export const sendTokens = (from: string, to: string) => ({
	fungible: (fungibles: Array<{ resource: string; amount: number }>) => `${fungibles.map(
		({ resource, amount }, idx) => `
        CALL_METHOD 
          Address('${from}') 
          'withdraw'
          Address('${resource}')
          Decimal('${amount}');  
          
        TAKE_FROM_WORKTOP_BY_AMOUNT
          Decimal('${amount}')
          Address('${resource}')
          Bucket('fungible${idx}');
      
        CALL_METHOD
          Address('${to}') 
          'deposit'
          Bucket('fungible${idx}');`,
	)}
`,
	nft: (nfts: Array<{ resource: string; id: string }>) => `${nfts.map(
		({ resource, id }, idx) => `
      CALL_METHOD
        Address('${from}') 
        'withdraw_non_fungibles'
        Address('${resource}')
        Array<NonFungibleLocalId>(NonFungibleLocalId('${id}'));

      TAKE_FROM_WORKTOP_BY_IDS 
        Array<NonFungibleLocalId>(NonFungibleLocalId('${id}'))
        Address('${resource}')
        Bucket('nft${idx}');

      CALL_METHOD
        Address('${to}')
        'deposit'
        Bucket('nft${idx}');`,
	)}
`,
})

export const createToken = (address: string) => ({
	fungible: ({
		initialSupply,
		...details
	}: Partial<{
		icon_url: string
		name: string
		description: string
		symbol: string
		initialSupply: number
	}>) => `CREATE_FUNGIBLE_RESOURCE_WITH_INITIAL_SUPPLY
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
	nft: ({
		items,
		...details
	}: {
		icon_url?: string
		name: string
		description: string
		items: string[]
	}) => `CREATE_NON_FUNGIBLE_RESOURCE_WITH_INITIAL_SUPPLY
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
