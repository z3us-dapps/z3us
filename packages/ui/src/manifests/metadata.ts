interface IAccountMetadata {
	name: string
	description: string
	domain: string
	account_type: string
}

export const updateAccountMetadata =
	(address: string) =>
	({ name, description, domain, account_type }: IAccountMetadata) =>
		`SET_METADATA ComponentAddress("${address}") "name" "${name}";   
   SET_METADATA ComponentAddress("${address}") "description" "${description}";     
   SET_METADATA ComponentAddress("${address}") "domain" "${domain}";     
   SET_METADATA ComponentAddress("${address}") "account_type" "${account_type}";`.trim()
