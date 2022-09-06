export type SwapQuery = {
	lhs_rri: string
	rhs_rri: string
	lhs_amount?: string
	rhs_amount?: string
}

type Action = {
	source: string
	name: string
	wallet_address: string
	lhs_rri: string
	lhs_amount: number
	rhs_rri: string
	rhs_amount: number
	rhs_full_amount: number
}

export type SwapResponse = {
	uid: string
	lhs_amount?: number
	rhs_amount?: number

	actions: Array<Action>
	message: string
}

export type Token = {
	rri: string
	symbol: string
	price_xrd: number
	price_usd: number
	market_cap_usd: number
	volume_24: {
		total: number
	}
}

export type TokensResponse = {
	tokens: Array<Token>
}

export const PoolName = 'DSOR'

export class DSORService {
	private baseURL: string = 'https://api.dsor.io/v1.0'

	private options: RequestInit = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	}

	getTokens = async (): Promise<TokensResponse> => {
		const response = await fetch(`${this.baseURL}/tokens`, this.options)
		if (response.status !== 200) {
			throw new Error(`Invalid request: ${response.status} received`)
		}
		return response.json()
	}

	getSwap = async (query: SwapQuery): Promise<SwapResponse> => {
		const response = await fetch(`${this.baseURL}/optimize_trade`, {
			...this.options,
			method: 'POST',
			body: JSON.stringify(query),
		})

		const data = await response.json()
		if (response.status !== 200) {
			if (data?.message) {
				const error = data.message.toString().trim()
				throw new Error(error)
			}

			// eslint-disable-next-line no-console
			console.error(`Invalid request: ${response.status} received`, response)
			throw new Error(`Failed to optimize swap`)
		}

		return data
	}

	confirmSwap = async (swapID: string, txID: string): Promise<SwapResponse> => {
		const response = await fetch(`${this.baseURL}/lce`, {
			...this.options,
			method: 'POST',
			body: JSON.stringify({
				type: 'tx_confirmed',
				tx_id: txID,
				res_id: swapID,
			}),
		})

		const data = await response.json()
		if (response.status !== 200) {
			if (data?.message) {
				const error = data.message.toString().trim()
				throw new Error(error)
			}

			// eslint-disable-next-line no-console
			console.error(`Invalid request: ${response.status} received`, response)
			throw new Error(`Failed to confirm swap`)
		}

		return data
	}
}

const service = new DSORService()
export default service
