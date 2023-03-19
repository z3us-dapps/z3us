import { ACTIVE_TAB_ACTIVITY, ACTIVE_TAB_ASSETS } from './constants'

export type TActiveTabAssets = typeof ACTIVE_TAB_ASSETS
export type TActiveTabActivity = typeof ACTIVE_TAB_ACTIVITY

export type TActiveTab = TActiveTabAssets | TActiveTabActivity
