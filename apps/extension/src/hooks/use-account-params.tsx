import { useMatch } from 'react-router-dom'

export const useAccountParams = () => {
	const accountMatch = useMatch('/accounts/:account')
	const assetTypeMatch = useMatch('/accounts/:account/:assetType')
	const assetMatch = useMatch('/accounts/:account/:assetType/:asset')

	return {
		...accountMatch?.params,
		...assetTypeMatch?.params,
		...assetMatch?.params,
	}
}
