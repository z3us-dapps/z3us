export type Token = {
	address: string
	symbol: string
	name: string
	description: string
	iconUrl: string
	infoUrl: string
	divisibility: number
	tokenPriceXRD: number
	tokenPriceUSD: number
	diff24H: number
	diff24HUSD: number
	diff7Days: number
	diff7DaysUSD: number
	icon_url: string
}

export type TokensResponse = { [key: string]: Token }

export type SwapResponse = {
	inputTokens?: number
	outputTokens?: number
	priceImpact: number
	swapFee: number
	manifest: string
}

export class AstrolescentService {
	private baseURL: string = 'https://api.astrolescent.com/partner/z3us'

	private options: RequestInit = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	}

	getTokens = async (): Promise<TokensResponse> => {
		const url = new URL(`${this.baseURL}/prices`)
		const path = url.toString()
		const response = await fetch(path, this.options)
		if (response.status !== 200) {
			throw new Error(`Invalid request: ${response.status} received`)
		}

		return response.json()
	}

	getSwap = async (
		fromAddress: string,
		tokenIn: string,
		tokenOut: string,
		type: 'send' | 'receive',
		amount: string,
	): Promise<SwapResponse> => {
		const url = new URL(`${this.baseURL}/swap`)
		url.searchParams.set('tokenIn', tokenIn)
		url.searchParams.set('tokenOut', tokenOut)
		url.searchParams.set('fromAddress', fromAddress)
		switch (type) {
			case 'send':
				url.searchParams.set('tokenInAmount', amount)
				break
			case 'receive':
			default:
				url.searchParams.set('tokenOutAmount', amount)
				break
		}
		const path = url.toString()
		const response = await fetch(path, this.options)
		if (response.status !== 200) {
			const json = await response.json()
			if (json.error) {
				throw new Error(json.error)
			} else {
				throw new Error(`Invalid request: ${response.status} received`)
			}
		}

		return response.json()
	}
}

const service = new AstrolescentService()
export default service
