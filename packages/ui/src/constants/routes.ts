export const PAIRING = 'pairing'
export const TRANSFER = 'transfer'
export const STAKING = 'staking'
export const SWAP = 'swap'
export const SETTINGS = 'settings'
export const ACCOUNTS = 'accounts'
export const ACCOUNTS_ALL = 'all'
export const ACCOUNT = ':account'
export const ASSET_TYPE = ':assetType'
export const ASSET = ':asset'
export const ASSET_TYPE_TOKENS = 'tokens'
export const ASSET_TYPE_NFTS = 'nfts'

export const SEARCH_ACTIVITY_PARAM = 'activity'

// '/:account/:assetType'
export const ACCOUNT_ASSET_TYPE = `/${ACCOUNT}/${ASSET_TYPE}`

// '/:account/:assetType/:asset'
export const ACCOUNT_ASSET = `/${ACCOUNT}/${ASSET_TYPE}/${ASSET}`

export const routes = {
	PAIRING,
	TRANSFER,
	STAKING,
	SWAP,
	SETTINGS,
	ACCOUNTS,
	ACCOUNT,
	ACCOUNT_ASSET_TYPE,
	ACCOUNT_ASSET,
}
