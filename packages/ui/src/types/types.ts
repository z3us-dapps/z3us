import type BigNumber from 'bignumber.js'

export enum Theme {
	LIGHT = 'light',
	DARK = 'dark',
	SYSTEM = 'system',
}

export enum ResourceBalanceType {
	FUNGIBLE = 'fungible',
	NON_FUNGIBLE = 'non_fungible',
	LIQUIDITY_POOL = 'liquidity_pool',
}

export type ResourceBalance = {
	[ResourceBalanceType.FUNGIBLE]: {
		type: ResourceBalanceType.FUNGIBLE
		address: string
		name: string

		amount: BigNumber
		value: BigNumber
		change: BigNumber

		symbol?: string
		description?: string
		url?: string
		imageUrl?: string
	}
	[ResourceBalanceType.LIQUIDITY_POOL]: {
		type: ResourceBalanceType.LIQUIDITY_POOL
		address: string
		validator: string

		amount: BigNumber
		value: BigNumber
		change: BigNumber

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

		amount: BigNumber
		value: BigNumber
		change: BigNumber

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
