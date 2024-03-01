export const lockFeeInstructionCost = Number.parseFloat('0.08581566997')
export const fungibleGuaranteeInstructionCost = Number.parseFloat('0.00908532837')
export const nonFungibleGuaranteeInstructionCost = Number.parseFloat('0.00954602837')
export const signatureCost = Number.parseFloat('0.01109974758')
export const notarizingCost = Number.parseFloat('0.0081393944')
export const notarizingCostWhenNotaryIsSignatory = Number.parseFloat('0.0084273944')

export type Guarantee = { index: number; resourceAddress: string; ids?: string[]; amount?: number }

export type TransactionSettings = {
	feePayer?: string
	tipPercentage: number
	padding: number
	lockAmount: number
	guarantees: Guarantee[]
}

export type TransactionMeta = {
	needSignaturesFrom: string[]
	isNotarySignatory: boolean
	summary: Summary
}

export type TransactionReceipt = {
	status: string
	fee_summary: {
		xrd_total_execution_cost: string
		xrd_total_finalization_cost: string
		xrd_total_royalty_cost: string
		xrd_total_storage_cost: string
		xrd_total_tipping_cost: string
	}
	costing_parameters: any
	fee_source: any
	fee_destination: any
	state_updates: any
	events: any[]
	error_message: string
}

export type Proof = { resourceAddress: string; ids?: string[]; amount?: number }

export type Summary = {
	proofs: Proof[]
	nftGuaranteesCount: number
	tokenGuaranteesCount: number
	guarantees: Guarantee[]
	predictedDepositIndexes: { [key: number]: boolean }
	needSignatureFrom: { [key: string]: boolean }
}

export interface Change {
	index: number
	account: string
	resource: string
	amount: number
}

export interface AccountChange {
	account: string
	changes: Array<Change>
}

export interface AggregatedChange {
	type: string
	changes: AccountChange[]
}
