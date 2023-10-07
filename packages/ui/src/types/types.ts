export enum Theme {
	LIGHT = 'light',
	DARK = 'dark',
	SYSTEM = 'system',
}

export enum ResourceBalanceType {
	FUNGIBLE = 'fungible',
	NON_FUNGIBLE = 'non_fungible',
	POOL_UNIT = 'pool_unit',
	LIQUIDITY_POOL_TOKEN = 'liquidity_pool_token',
}

export type ResourceBalance = {
	[ResourceBalanceType.FUNGIBLE]: {
		type: ResourceBalanceType.FUNGIBLE
		address: string
		name: string

		amount: number
		value: number
		change: number

		symbol?: string
		description?: string
		url?: string
		imageUrl?: string
	}
	[ResourceBalanceType.LIQUIDITY_POOL_TOKEN]: {
		type: ResourceBalanceType.LIQUIDITY_POOL_TOKEN
		address: string
		validator: string

		amount: number
		value: number
		change: number

		name: string
		symbol?: string
		description?: string
		url?: string
		imageUrl?: string
	}
	[ResourceBalanceType.NON_FUNGIBLE]: {
		type: ResourceBalanceType.NON_FUNGIBLE
		address: string
		vaults: string[]
		name: string

		amount: number
		value: number
		change: number

		description?: string
		url?: string
		imageUrl?: string
	}
	[ResourceBalanceType.POOL_UNIT]: {
		type: ResourceBalanceType.POOL_UNIT
		address: string
		pool: string

		amount: number
		value: number
		change: number

		name: string
		symbol?: string
		description?: string
		url?: string
		imageUrl?: string
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
