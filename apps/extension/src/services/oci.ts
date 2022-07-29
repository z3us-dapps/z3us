import BigNumber from 'bignumber.js'

export type Fee = {
	amount: string
	rri: string
}

export type CalculateSwapResponse = {
	fee_exchange: Fee[]
	fee_liquidity_provider: Fee[]
	input_amount: string
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
		// From yourside the implementation will be nearly identical. Instead of input_amount you are sending output_amount to the calculate_swap endpoint
		const resp = await this.doRequest<{ data: { calculate_swap: CalculateSwapResponse } }>(
			JSON.stringify({
				query: `query calculateSwap {
					calculate_swap(
					  ${amount.isGreaterThan(0) ? `input_amount: "${amount.toString()}"` : ``}
					  ${recieve.isGreaterThan(0) ? `output_amount: "${recieve.toString()}"` : ``}
					  input_rri: "${fromRRI}"
					  output_rri: "${toRRI}"
					) {
					  fee_exchange {
						amount
						rri
					  }
					  fee_liquidity_provider {
						amount
						rri
					  }
					  ${amount.isGreaterThan(0) ? `output_amount` : ``}
					  ${recieve.isGreaterThan(0) ? `input_amount` : ``}
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
