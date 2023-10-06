// https://api-stag.ociswap.com/tokens/xrd
export type Token = {
	name: string
	address: string
	symbol: string
	price: {
		usd: {
			'1h': string
			'24h': string
			'7d': string
			now: string
		}
		xrd: {
			'1h': string
			'24h': string
			'7d': string
			now: string
		}
	}
}

export type TokensResponse = Array<Token>

export class OCIService {
	private baseURL: string = 'https:/api.ociswap.com'

	private options: RequestInit = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	}

	getToken = async (symbol: string): Promise<Token> => {
		const path = `${this.baseURL}/tokens/${symbol.toLowerCase()}`

		const response = await fetch(path, this.options)
		if (response.status !== 200) {
			throw new Error(`Invalid request: ${response.status} received`)
		}

		return response.json()
	}

	getTokens = async (cursor: number = 0, limit: number = 100): Promise<{ data: Token[]; next_cursor: number }> => {
		const path = `${this.baseURL}/tokens?cursor=${encodeURIComponent(cursor)}&limit=${encodeURIComponent(
			Math.min(limit, 100),
		)}`

		const response = await fetch(path, this.options)
		if (response.status !== 200) {
			throw new Error(`Invalid request: ${response.status} received`)
		}

		return response.json()
	}
}

const service = new OCIService()
export default service
