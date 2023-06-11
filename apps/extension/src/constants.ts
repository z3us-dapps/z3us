export const DAPP_NAME = 'Z3US'
export const DAPP_ADDRESS = 'account_tdx_c_1p9u58qefydgxugayaapvwpceh5z96wmrzwl3c70ptxnqvman6v'
export const DAPP_NETWORK_ID = 12

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
export const ASSET_TYPE_LP_TOKENS = 'lp-tokens'
export const ASSET_TYPE_NFTS = 'nfts'
export const ASSET_TYPE_BADGES = 'badges'

export const SEARCH_ACTIVITY_PARAM = 'activity'
export const LIST_ITEM_INDEX = 'list-item-index'
export const LIST_ITEM_ASSET_TYPE = 'list-item-asset-type'
export const LIST_ITEM_ASSET = 'list-item-asset'
export const LIST_ITEM_ACTIVITY = 'list-item-activity'

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

export const accountMenuSlugs = {
	ACCOUNTS: `/${routes.ACCOUNTS}/${ACCOUNTS_ALL}`,
	TRANSFER: `/${routes.ACCOUNTS}/${routes.TRANSFER}`,
	STAKING: `/${routes.ACCOUNTS}/${routes.STAKING}`,
	SWAP: `/${routes.ACCOUNTS}/${routes.SWAP}`,
	SETTINGS: `/${routes.ACCOUNTS}/${routes.SETTINGS}`,
}

export const ACCOUNT_PARAM_ASSET = 'asset'
export const ACCOUNT_PARAM_TRANSACTION_ID = 'transactionId'
export const ACCOUNT_PARAM_ACTIVITY = 'activity'

export const animtePageVariants = {
	visible: {
		opacity: 1,
		transition: {
			type: 'spring',
			stiffness: 200,
			damping: 20,
		},
	},
	hidden: {
		opacity: 0,
		transition: {
			type: 'spring',
			stiffness: 200,
			damping: 20,
		},
	},
}
