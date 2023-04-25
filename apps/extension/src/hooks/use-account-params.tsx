import { useMatch } from 'react-router-dom'

type TAccountParams = {
	account: string
	assetType: string
	asset: string
}

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
