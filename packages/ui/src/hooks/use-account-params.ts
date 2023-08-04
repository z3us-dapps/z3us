import { useSearchParams } from 'react-router-dom'

import {
	ACCOUNT_PARAM_ACCOUNT,
	ACCOUNT_PARAM_ACTIVITY,
	ACCOUNT_PARAM_ASSET,
	ACCOUNT_PARAM_QUERY,
	ACCOUNT_PARAM_TRANSACTION_ID,
} from '../constants/accounts'

type TAccountParams = {
	query?: string
	account?: string
	asset?: string
	activity?: string
	transactionId?: string
}

/**
 * A custom hook to extract account-related parameters from the URL using react-router-dom.
 * It matches the URL path against three different patterns to capture account, assetType, and asset parameters.
 * @returns {TAccountParams} An object containing account, assetType, and asset parameters from the URL.
 */
export const useAccountParams = (): TAccountParams => {
	const [searchParams] = useSearchParams()
	const query = searchParams.get(ACCOUNT_PARAM_QUERY)
	const asset = searchParams.get(ACCOUNT_PARAM_ASSET)
	const transactionId = searchParams.get(ACCOUNT_PARAM_TRANSACTION_ID)
	const activity = searchParams.get(ACCOUNT_PARAM_ACTIVITY)
	const account = searchParams.get(ACCOUNT_PARAM_ACCOUNT)

	return { query, asset, transactionId, activity, account }
}
