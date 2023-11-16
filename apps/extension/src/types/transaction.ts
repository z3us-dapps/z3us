export type TransactionSettings = {
	feePayer?: string
	tipPercentage: number
	padding: number
	lockAmount: number
}

export type ResourceChanges = Array<{ account: string; resource: string; amount: number }>

export type Proof = { resourceAddress: string; ids?: string[]; amount?: number }

export type Summary = { proofs: Proof[] }
