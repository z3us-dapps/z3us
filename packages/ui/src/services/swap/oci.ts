export type Token = {
	name: string
	rri: string
	ticker: string
	price: {
		xrd: string
		xrd_24h: string
		usd: string
		usd_24h: string
	}
	volume: {
		usd_24h: string
		xrd_24h: string
	}
}

export type TokensResponse = Array<Token>

export class OCIService {
	private baseURL: string = 'https://api.ociswap.com/v1/graphql'

	private options: RequestInit = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
	}

	getTokens = async (): Promise<TokensResponse> => {
		const resp = await this.doRequest<{ data: { tokens_ranked_mc: TokensResponse } }>(
			JSON.stringify({
				query: `query getTokens {
					tokens_ranked_mc(order_by: {rank: asc}) {
					  name
					  rri
					  ticker
					  price {
						xrd
						xrd_24h
						usd
						usd_24h
					  }
					  volume {
						xrd_24h
						usd_24h
					  }
					}
				  }`,
			}),
		)
		return resp?.data?.tokens_ranked_mc || []
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
			const error = data.errors[0].message.toString().trim()
			if (error.includes('Input too low for minimum fee')) {
				throw new Error('Input too low for minimum fee')
			}
			throw new Error(error)
		}

		return data
	}
}

const service = new OCIService()
export default service
