import { useMatch } from 'react-router-dom'

export const useAccountParams = () => {
	const accountMatch = useMatch('/accounts/:account')
	const assetTypeMatch = useMatch('/accounts/:account/:assetType')
	const assetMatch = useMatch('/accounts/:account/:assetType/:asset')

	let account: string
	let assetType: string
	let asset: string

	if (accountMatch) {
		account = accountMatch.params.account
	} else if (assetTypeMatch) {
		account = assetTypeMatch.params.account
		assetType = assetTypeMatch.params.assetType
	} else if (assetMatch) {
		account = assetMatch.params.account
		assetType = assetMatch.params.assetType
		asset = assetMatch.params.asset
	}

	return { account, assetType, asset }
}
