import type {
	AccountAddressT,
	AmountT,
	BuiltTransactionReadyToSign,
	IntendedStakeTokensAction,
	IntendedTransferTokensAction,
	IntendedUnstakeTokensAction,
	PublicKeyT,
	ResourceIdentifierT,
	SignatureT,
	SigningKeyDecryptionInput,
	SigningKeyEncryptionInput,
} from '@radixdlt/application'
import type { HardwareWalletT } from '@radixdlt/hardware-wallet'
import type {
	BurnTokens,
	CreateTokenDefinition,
	MintTokens,
	StakeTokens,
	TransferTokens,
	UnstakeTokens,
} from '@radixdlt/networking'
import type BigNumber from 'bignumber.js'

import type { LIST_ITEM_ACTIVITY, LIST_ITEM_ASSET, LIST_ITEM_ASSET_TYPE, LIST_ITEM_INDEX } from '@src/constants'

import { generateId } from './utils/generate-id'

export enum KeystoreType {
	LOCAL = 'local',
	HARDWARE = 'hardware',
}

export type Keystore = {
	id: string
	name: string
	type: KeystoreType
}

export enum SigningKeyType {
	LEGACY = 'legacy',
	MNEMONIC = 'mnemonic',
	PRIVATE_KEY = 'private_key',
	HARDWARE = 'hardware',
}

export type SigningKey = {
	id: string
	type: SigningKeyType
	publicKey: PublicKeyT
	hw?: HardwareWalletT
	decrypt: (input: SigningKeyDecryptionInput) => Promise<string>
	encrypt: (input: SigningKeyEncryptionInput) => Promise<string>
	sign: (tx: BuiltTransactionReadyToSign, nonXrdHRP?: string) => Promise<SignatureT>
	signHash: (hashedMessage: Buffer) => Promise<SignatureT>
}

export interface Ticker {
	asset: string
	currency: string
	change: number
	last_price: number
	volume: number
}

export type Activity = BurnTokens | CreateTokenDefinition | MintTokens | StakeTokens | TransferTokens | UnstakeTokens

export enum ActionType {
	TRANSFER_TOKENS = 'TransferTokens',
	STAKE_TOKENS = 'StakeTokens',
	UNSTAKE_TOKENS = 'UnstakeTokens',
	CREATE_TOKEN = 'CreateTokenDefinition',
	MINT_TOKENS = 'MintTokens',
	BURN_TOKENS = 'BurnTokens',
}

export type RawAction = {
	type: ActionType
	amount: {
		token_identifier: {
			rri: string
		}
		value: string
	}
	from_account?: {
		address: string
	}
	to_account?: {
		address: string
	}
	from_validator?: {
		address: string
	}
	to_validator?: {
		address: string
	}
}

export type Action = {
	type: ActionType
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

export type VisibleToken = {
	rri: string
	name: string
	symbol: string
}

export type VisibleTokens = {
	[rri: string]: VisibleToken
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
	image?: string
	order: number
}

export type TokenAmount = {
	rri: string
	symbol: string
	amount: string
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

export enum PoolType {
	OCI = 'oci',
	CAVIAR = 'caviar',
	DOGECUBEX = 'dogecubex',
	ASTROLESCENT = 'astrolescent',
	DSOR = 'dsor',
	UNKNOWN = '',
}

interface IPool {
	type: PoolType
	url: string
	image: string
	name: string
	wallet?: string
	balances?: { [rri: string]: number }
	quote?: PoolQuote
	costRatio?: BigNumber
	supportsSlippage: boolean
}

export class Pool implements IPool {
	public readonly id: string = ''

	public type: PoolType = PoolType.UNKNOWN

	public url: string = ''

	public image: string = ''

	public name: string = ''

	public wallet: string = ''

	public balances = undefined

	public quote = undefined

	public costRatio = undefined

	public supportsSlippage = false

	constructor(settings: IPool) {
		Object.entries(settings).forEach(([key, value]) => {
			this[key] = value
		})
		this.id = generateId()
	}
}

export type PoolQuote = {
	amount: BigNumber
	receive: BigNumber
	fee: BigNumber
	priceImpact: number
	fullReceive?: BigNumber
}

// @TODO new account types move to accounts container

export type TListItemIndex = typeof LIST_ITEM_INDEX
export type TListItemAssetType = typeof LIST_ITEM_ASSET_TYPE
export type TListItemAsset = typeof LIST_ITEM_ASSET
export type TListItemActivity = typeof LIST_ITEM_ACTIVITY

export type TListItem = TListItemIndex | TListItemAssetType | TListItemAsset | TListItemActivity
