import BigNumber from 'bignumber.js'

export type Price = {
	amount: string
	rri: string
	// atos: string
	// usd: string
}

export type CalculateSwapResponse = {
	fee_exchange: Price
	fee_liquidity_provider: Price
	input: Price
	// output: Price
	minimum_output: Price
	price_impact: string
	// pool_address: string
}

export type OCIPool = {
	name: string
	wallet_address: string
	slug: string
	token_a: {
		rri: string
	}
	token_b: {
		rri: string
	}
}

export type OCIPoolsResponse = Array<OCIPool>

export type OCIToken = {
	name: string
	market_cap_usd: string
	rank: string
	pools: Array<{
		name: string
	}>
}

export type OCITokensResponse = OCIToken[]

export const PoolName = 'Ociswap'

const zero = new BigNumber(0)

export class OCIService {
	private baseURL: string = 'https://api.ociswap.com/v1/graphql'

	private options: RequestInit = {
		method: 'POST',
		// mode: 'no-cors',
		headers: {
			'Content-Type': 'application/json',
		},
	}

	calculateSwap = async (
		fromRRI: string,
		toRRI: string,
		amount: BigNumber,
		recieve: BigNumber,
	): Promise<CalculateSwapResponse> => {
		const resp = await this.doRequest<{ data: { calculate_swap: CalculateSwapResponse } }>(
			JSON.stringify({
				query: `query calculateSwap {
					calculate_swap(
					  ${amount.gt(0) ? `input_amount: "${amount.toString()}"` : ``}
					  ${recieve.gt(0) ? `output_amount: "${recieve.toString()}"` : ``}
					  input_rri: "${fromRRI}"
					  output_rri: "${toRRI}"
					  slippage: 0.05
					) {
					  fee_exchange {
						rri
						amount
					  }
					  fee_liquidity_provider {
						rri
						amount
					  }
					  ${amount.gt(0) ? `minimum_output {
						rri
						amount
					  }`: ``}
					  ${recieve.gt(0) ? `input {
						rri
						amount
					  }`: ``}
					  price_impact
					}
				  }`,
			}),
		)
		return resp?.data?.calculate_swap
	}

	calculateSwapFromAmount = (fromRRI: string, toRRI: string, amount: BigNumber): Promise<CalculateSwapResponse> =>
		this.calculateSwap(fromRRI, toRRI, amount, zero)

	calculateSwapFromRecieve = (fromRRI: string, toRRI: string, recieve: BigNumber): Promise<CalculateSwapResponse> =>
		this.calculateSwap(fromRRI, toRRI, zero, recieve)

	getPools = async (): Promise<OCIPoolsResponse> => {
		const resp = await this.doRequest<{ data: { pools: OCIPoolsResponse } }>(
			JSON.stringify({
				query: `query getPools {
					pools {
					  rank
					  name
					  wallet_address
					  slug
					  token_a {
						rri
					  }
					  token_b {
						rri
					  }
					}
				  }`,
			}),
		)
		return resp?.data?.pools || []
	}

	private doRequest = async <T>(body: string): Promise<T> => {
		const options = {
			...this.options,
			body,
		}
		const response = await fetch(this.baseURL, options)
		if (response.status !== 200) {
			throw new Error(`Invalid request: ${response.status} recieved`)
		}

		const data = await response.json()
		if (data?.errors?.[0]?.message) {
			throw new Error(data.errors[0].message)
		}

		return data
	}
}

const service = new OCIService()
export default service
