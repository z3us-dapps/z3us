import type BigNumber from 'bignumber.js'

import type { LIST_ITEM_ACTIVITY, LIST_ITEM_ASSET, LIST_ITEM_ASSET_TYPE, LIST_ITEM_INDEX } from 'ui/src/constants/list'

export enum Theme {
	LIGHT = 'light',
	DARK = 'dark',
	SYSTEM = 'system',
}

export enum ResourceBalanceType {
	FUNGIBLE = 'fungible',
	NON_FUNGIBLE = 'non_fungible',
}

export type ResourceBalance = {
	type: ResourceBalanceType

	address: string
	vaultAddress?: string
	ownerAddress?: string
	name: string
	symbol?: string
	description?: string
	url?: string
	imageUrl?: string
	validator?: string

	amount: BigNumber
	value: BigNumber
	change: BigNumber
}

export interface Ticker {
	asset: string
	currency: string
	change: number
	last_price: number
	volume: number
}

export type TListItemIndex = typeof LIST_ITEM_INDEX
export type TListItemAssetType = typeof LIST_ITEM_ASSET_TYPE
export type TListItemAsset = typeof LIST_ITEM_ASSET
export type TListItemActivity = typeof LIST_ITEM_ACTIVITY

export type TListItem = TListItemIndex | TListItemAssetType | TListItemAsset | TListItemActivity
