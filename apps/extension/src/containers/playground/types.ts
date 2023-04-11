import { LIST_ITEM_ACTIVITY, LIST_ITEM_ASSET, LIST_ITEM_ASSET_TYPE, LIST_ITEM_INDEX } from './constants'

export type TListItemIndex = typeof LIST_ITEM_INDEX
export type TListItemAssetType = typeof LIST_ITEM_ASSET_TYPE
export type TListItemAsset = typeof LIST_ITEM_ASSET
export type TListItemActivity = typeof LIST_ITEM_ACTIVITY

export type TListItem = TListItemIndex | TListItemAssetType | TListItemAsset | TListItemActivity
