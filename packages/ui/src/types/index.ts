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
	[ResourceBalanceType.FUNGIBLE]: {
		type: ResourceBalanceType.FUNGIBLE
		address: string
		vaults: string[]
		name: string

		amount: string
		value: number
		xrdValue: number
		change: number

		symbol?: string
		description?: string
		url?: string
		imageUrl?: string
		validator?: string
		pool?: string
	}
	[ResourceBalanceType.NON_FUNGIBLE]: {
		type: ResourceBalanceType.NON_FUNGIBLE
		address: string
		vaults: string[]
		name: string

		amount: string
		value: number
		xrdValue: number
		change: number
		ids: string[]

		description?: string
		url?: string
		imageUrl?: string
		validator?: string
		pool?: string
	}
}

export type ResourceBalanceKind = ResourceBalance[ResourceBalanceType]

export type ResourceBalances = { [address: string]: ResourceBalanceKind }

export interface Ticker {
	asset: string
	currency: string
	change: number
	last_price: number
	volume: number
}

export enum TimeFrames {
	WEEK = '1W',
	MONTH = '1M',
	THREE_MONTHS = '3M',
	SIX_MONTHS = '6M',
	YEAR = '1Y',
	FIVE_YEARS = '5Y',
}
