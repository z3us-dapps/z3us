export type Config = {
	minOrderSize: number
	maxOrderSize: number
	stakingMaxOrders: {
		'1000': string
		'10000': string
		'100000': string
		'1000000': string
	}
	stakingOrderLimits: {
		'1000': number
		'10000': number
		'100000': number
		'1000000': number
	}
	stakerMaxOrderSize: number
	swapTransferFeeXrd: number
	swapRefundFeeXrd: number
	exchangeFee: number
}

export type QuoteQuery = {
	from: string
	to: string
	maxSlippage: string
	amountFrom: string | null
	amountTo: string | null
}

export type Quote = {
	sentAmount: string
	receivedAmount: string
	minAmount: string
	price: string
	priceImpact: string
	resultingPrice: string
	error: null | string
}

export type Pool = {
	account: string
	heroImageUrl: string
	rri: string
	token: {
		symbol: string
		name: string
		rri: string
		iconUrl: string
	}
}

export const PoolName = 'DogeCubeX'

export class DogeCubeXService {
	private baseURL: string = 'https://dogecubex.live'

	private options: RequestInit = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	}

	getConfig = async (): Promise<Config> => {
		const response = await fetch(`${this.baseURL}/config/get-config?q=${new Date().getTime()}`, this.options)
		if (response.status !== 200) {
			throw new Error(`Invalid request: ${response.status} recieved`)
		}

		return response.json()
	}

	getQuote = async (query: QuoteQuery): Promise<Quote> => {
		const response = await fetch(`${this.baseURL}/swap/quote?q=${new Date().getTime()}`, {
			...this.options,
			method: 'POST',
			body: JSON.stringify(query),
		})
		if (response.status !== 200) {
			throw new Error(`Invalid request: ${response.status} recieved`)
		}

		return response.json()
	}

	getPools = async (): Promise<Pool[]> => {
		const response = await fetch(`${this.baseURL}/api/pools-info.json`, this.options)
		if (response.status !== 200) {
			throw new Error(`Invalid request: ${response.status} recieved`)
		}

		return response.json()
	}
}

const service = new DogeCubeXService()
export default service
