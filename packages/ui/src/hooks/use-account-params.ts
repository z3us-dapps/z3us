import { useMatch } from 'react-router-dom'

type TAccountParams = {
	account: string
	assetType: string
	asset: string
}

/**
 * A custom hook to extract account-related parameters from the URL using react-router-dom.
 * It matches the URL path against three different patterns to capture account, assetType, and asset parameters.
 * @returns {TAccountParams} An object containing account, assetType, and asset parameters from the URL.
 */
export const useAccountParams = (): TAccountParams => {
	const accountMatch = useMatch('/accounts/:account')
	const assetTypeMatch = useMatch('/accounts/:account/:assetType')
	const assetMatch = useMatch('/accounts/:account/:assetType/:asset')

	return {
		...accountMatch?.params,
		...assetTypeMatch?.params,
		...assetMatch?.params,
	}
}
