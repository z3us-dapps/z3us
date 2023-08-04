import { routes } from './routes'

export const accountMenuSlugs = {
	ACCOUNTS: `/${routes.ACCOUNTS}`,
	TRANSFER: `/${routes.ACCOUNTS}/${routes.TRANSFER}`,
	STAKING: `/${routes.ACCOUNTS}/${routes.STAKING}`,
	SWAP: `/${routes.ACCOUNTS}/${routes.SWAP}`,
	SETTINGS: `/${routes.ACCOUNTS}/${routes.SETTINGS}`,
}

export const ACCOUNT_PARAM_QUERY = 'query'
export const ACCOUNT_PARAM_ASSET = 'asset'
export const ACCOUNT_PARAM_TRANSACTION_ID = 'transactionId'
export const ACCOUNT_PARAM_ACTIVITY = 'activity'
export const ACCOUNT_PARAM_ACCOUNT = 'account'
