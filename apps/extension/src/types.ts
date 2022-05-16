import {
	AccountAddressT,
	AmountT,
	ResourceIdentifierT,
	IntendedTransferTokensAction,
	IntendedStakeTokensAction,
	IntendedUnstakeTokensAction,
} from '@radixdlt/application'
import {
	BurnTokens,
	CreateTokenDefinition,
	MintTokens,
	StakeTokens,
	TransferTokens,
	UnstakeTokens,
} from '@radixdlt/networking'

export interface Ticker {
	asset: string
	currency: string
	change: number
	bid: number
	ask: number
	last_price: number
	low: number
	high: number
	volume: number
}

export type Activity = BurnTokens | CreateTokenDefinition | MintTokens | StakeTokens | TransferTokens | UnstakeTokens

export type Action = {
	type: string
	amount: string
	rri?: string
	from_account?: string
	to_account?: string
	from_validator?: string
	to_validator?: string
	unstake_percentage?: number
}

export type Transaction = {
	id: string
	sentAt: Date
	fee: string
	message: string
	actions: Action[]
	status: string
}

export type Validator = {
	address: string
	ownerAddress: string
	name: string
	infoURL?: string
	totalDelegatedStake: string
	rri: string
	ownerDelegation: string
	validatorFee: number
	registered: boolean
	isExternalStakeAccepted: boolean
	uptimePercentage: number
	proposalsMissed: number
	proposalsCompleted: number
}

export type Token = {
	rri: string
	name: string
	symbol: string
	description: string
	granularity: string
	isSupplyMutable: boolean
	currentSupply: string
	tokenInfoURL: string
	iconURL?: string
	image?: string
	order: number
}

export enum ColorSettings {
	COLOR_PRIMARY = 'color_primary',
	COLOR_PRIMARY_STOP = 'color_primary_stop',
	COLOR_SECONDARY = 'color_secondary',
	COLOR_SECONDARY_STOP = 'color_secondary_stop',
	COLOR_TERTIARY = 'color_tertiary',
	COLOR_TERTIARY_STOP = 'color_tertiary_stop',
	COLOR_TEXT = 'color_text',
	COLOR_BORDER = 'color_border',
	GRADIENT_TYPE = 'gradient_type',
	GRADIENT_START = 'gradient_start',
}

export enum ExtendedActionType {
	CREATE_TOKEN = 'CreateTokenDefinition',
	MINT_TOKENS = 'MintTokens',
	BURN_TOKENS = 'BurnTokens',
}

export type NewTokenDefinition = {
	name: string
	description: string
	icon_url: string
	url: string
	symbol: string
	is_supply_mutable: boolean
	granularity: string
}

export type IntendedCreateTokenDefinitionAction = Readonly<{
	type: ExtendedActionType.CREATE_TOKEN
	to_account: AccountAddressT
	amount: AmountT
	rri: ResourceIdentifierT
	token: NewTokenDefinition
}>

export type IntendedMintTokensAction = Readonly<{
	type: ExtendedActionType.MINT_TOKENS
	to_account: AccountAddressT
	amount: AmountT
	rri: ResourceIdentifierT
}>

export type IntendedBurnTokensAction = Readonly<{
	type: ExtendedActionType.BURN_TOKENS
	from_account: AccountAddressT
	amount: AmountT
	rri: ResourceIdentifierT
}>

export type IntendedAction =
	| IntendedTransferTokensAction
	| IntendedStakeTokensAction
	| IntendedUnstakeTokensAction
	| IntendedCreateTokenDefinitionAction
	| IntendedMintTokensAction
	| IntendedBurnTokensAction
