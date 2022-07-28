import BigNumber from 'bignumber.js'

export type Fee = {
	amount: string
	rri: string
	usd: string
}

export type CalculateSwapResponse = {
	fee_exchange: Fee[]
	fee_liquidity_provider: Fee[]
	minimum_output_amount: string
	minimum_output_amount_usd: string
	output_amount_usd: string
	output_amount: string
	price_impact: string
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

export class OCIService {
	private baseURL: string = 'https://api.ociswap.com/v1/graphql'

	private options: RequestInit = {
		method: 'POST',
		mode: 'no-cors',
		headers: {
			'Content-Type': 'application/json',
		},
	}

	getLastTransaction = async (): Promise<unknown> => {
		// @TODO: handle subscription correctly
		const resp = await this.doRequest<{ data: { pool_last_transaction: unknown } }>(
			JSON.stringify({
				query: `subscription getTransaction {
					pool_last_transaction {
					  pool_id
					  transaction_id
					  liquidity_a
					  liquidity_b
					}
				  }`,
			}),
		)
		return resp?.data?.pool_last_transaction
	}

	calculateSwap = async (fromRRI: string, toRRI: string, amount: BigNumber): Promise<CalculateSwapResponse> => {
		// From yourside the implementation will be nearly identical. Instead of input_amount you are sending output_amount to the calculate_swap endpoint
		const resp = await this.doRequest<{ data: { calculate_swap: CalculateSwapResponse } }>(
			JSON.stringify({
				query: `query calculateSwap {
					calculate_swap(
					  input_amount: "${amount.toString()}"
					  input_rri: "${fromRRI}"
					  output_rri: "${toRRI}"
					) {
					  fee_exchange {
						amount
						rri
						usd
					  }
					  fee_liquidity_provider {
						amount
						rri
						usd
					  }
					  minimum_output_amount
					  minimum_output_amount_usd
					  output_amount_usd
					  output_amount
					  price_impact
					}
				  }`,
			}),
		)
		return resp?.data?.calculate_swap
	}

	getTokens = async (): Promise<OCITokensResponse> => {
		const resp = await this.doRequest<{ data: { tokens_ranked_mc: OCITokensResponse } }>(
			JSON.stringify({
				query: `query getTokens {
					tokens_ranked_mc(order_by: { rank: asc }) {
					  name
					  market_cap_usd
					  rank
					  icons {
						large
					  }
					  popularity {
						created_at
					  }
					  price {
						usd
						usd_7d
						usd_24h
					  }
					  volume {
						usd_7d
						usd_24h
					  }
					  pools {
						name
						liquidity {
						  usd
						}
						volume {
						  usd_24h
						  usd_7d
						}
					  }
					}
				  }`,
			}),
		)
		return resp?.data?.tokens_ranked_mc || []
	}

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
						ticker
						name
						rri
						icons {
						  small
						}
					  }
					  token_b {
						ticker
						name
						rri
						icons {
						  small
						}
					  }
					  transactions {
						id
						amount_a
						amount_b
						price_a_usd
						price_b_usd
						created_at
					  }
					  liquidity {
						a
						b
						a_24h
						b_24h
						a_7d
						b_7d
						usd
						usd_24h
						usd_7d
					  }
					  volume {
						usd_24h
						usd_7d
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
