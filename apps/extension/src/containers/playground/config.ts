export const TRANSFER = '/transfer'
export const STAKING = '/staking'
export const SWAP = '/swap'
export const SETTINGS = '/settings'
export const ACCOUNTS = '/accounts'
export const ACCOUNT = '/:account'
export const ASSET_TYPE = '/:assetType'
export const ASSET = '/:asset'

// '/:account/:assetType'
export const ACCOUNT_ASSET_TYPE = `${ACCOUNT}${ASSET_TYPE}`

// '/:account/:assetType/:asset'
export const ACCOUNT_ASSET = `${ACCOUNT}${ASSET_TYPE}${ASSET}`

export const routes = {
	TRANSFER,
	STAKING,
	SWAP,
	SETTINGS,
	ACCOUNTS,
	ACCOUNT,
	ACCOUNT_ASSET_TYPE,
	ACCOUNT_ASSET,
}

export const accountMenuSlugs = {
	ACCOUNTS: `${routes.ACCOUNTS}/all`,
	TRANSFER: `${routes.ACCOUNTS}${routes.TRANSFER}`,
	STAKING: `${routes.ACCOUNTS}${routes.STAKING}`,
	SWAP: `${routes.ACCOUNTS}${routes.SWAP}`,
	SETTINGS: `${routes.ACCOUNTS}${routes.SETTINGS}`,
}
