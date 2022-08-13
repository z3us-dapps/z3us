import BigNumber from 'bignumber.js'

export type Price = {
	amount: string
	rri: string
}

export type CalculateSwapResponse = {
	fee_exchange: Price
	fee_liquidity_provider: Price
	input: Price
	minimum_output: Price
	price_impact: string
	pool_address: string
}

export type Pool = {
	wallet_address: string
	token_a: {
		rri: string
	}
	token_b: {
		rri: string
	}
}

export type PoolsResponse = Array<Pool>

export type Token = {
	name: string
	rri: string
}

export type TokensResponse = Array<Token>

export const PoolName = 'Ociswap'

const zero = new BigNumber(0)

export class OCIService {
	private baseURL: string = 'https://api.ociswap.com/v1/graphql'

	private options: RequestInit = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
	}

	calculateSwap = async (
		fromRRI: string,
		toRRI: string,
		amount: BigNumber,
		recieve: BigNumber,
		slippage: number = 0.05,
	): Promise<CalculateSwapResponse> => {
		const resp = await this.doRequest<{ data: { calculate_swap: CalculateSwapResponse } }>(
			JSON.stringify({
				query: `query calculateSwap {
					calculate_swap(
					  ${amount.gt(0) ? `input_amount: "${amount.toString()}"` : ``}
					  ${recieve.gt(0) ? `output_amount: "${recieve.toString()}"` : ``}
					  input_rri: "${fromRRI}"
					  output_rri: "${toRRI}"
					  slippage: ${slippage}
					) {
					  fee_exchange {
						rri
						amount
					  }
					  fee_liquidity_provider {
						rri
						amount
					  }
					  ${
							amount.gt(0)
								? `minimum_output {
						rri
						amount
					  }`
								: ``
						}
					  ${
							recieve.gt(0)
								? `input {
						rri
						amount
					  }`
								: ``
						}
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

	getPools = async (): Promise<PoolsResponse> => {
		const resp = await this.doRequest<{ data: { pools: PoolsResponse } }>(
			JSON.stringify({
				query: `query getPools {
					pools {
						wallet_address
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

	getTokens = async (): Promise<TokensResponse> => {
		const resp = await this.doRequest<{ data: { tokens: TokensResponse } }>(
			JSON.stringify({
				query: `query getTokens {
					tokens(order_by: {rank: asc}) {
					  name
					  rri
					}
				  }`,
			}),
		)
		return resp?.data?.tokens || []
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
