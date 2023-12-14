// https://api-stag.ociswap.com/tokens/xrd
export type Token = {
	name: string
	address: string
	symbol: string
	slug: string
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

export type SwapPreview = {
	input_address: string
	input_amount: {
		token: string
		xrd: string
		usd: string
	}
	output_address: string
	output_amount: {
		token: string
		xrd: string
		usd: string
	}
	input_fee_lp: {
		token: string
		xrd: string
		usd: string
	}
	price_impact: string
	swaps: [
		{
			pool_address: string
			input_address: string
			input_amount: {
				token: string
				xrd: string
				usd: string
			}
			output_address: string
			output_amount: {
				token: string
				xrd: string
				usd: string
			}
			input_fee_lp: {
				token: string
				xrd: string
				usd: string
			}
			price_impact: string
		},
	]
}

export type UdfConfig = {
	supported_resolutions: string[]
	supports_group_request: boolean
	supports_marks: boolean
	supports_search: boolean
	supports_timescale_marks: boolean
	supports_time: boolean
	currency_codes: [
		{
			id: string
			code: string
			logoUrl: string
		},
	]
}

export type UdfSymbol = {
	name: string
	ticker: string
	description: string
	type: string
	session: string
	exchange: string
	listed_exchange: string
	timezone: string
	minmov: number
	minmove2: number
	pricescale: number
	supported_resolutions: string[]
	currency_code: string
	original_currency_code: string
	has_intraday: boolean
	has_empty_bars: boolean
	visible_plots_set: string
}

export type UdfHistory = {
	s: 'ok' | 'no_data' | 'error'
	errmsg: string
	nextTime: number
	t: number[] | null
	c: string[] | null
	o: string[] | null
	h: string[] | null
	l: string[] | null
	v: string[] | null
}

export class OCIService {
	private baseURL: string = 'https:/api.ociswap.com'

	private options: RequestInit = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	}

	getToken = async (address: string): Promise<Token> => {
		const path = `${this.baseURL}/tokens/${address}`
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

	previewSwap = async (from: string, to: string, side: 'send' | 'receive', amount: number): Promise<SwapPreview> => {
		const path = `${this.baseURL}/preview/swap?input_address=${from}&output_address=${to}&${
			side === 'send' ? 'input_amount' : 'output_amount'
		}=${encodeURIComponent(amount)}`

		const response = await fetch(path, this.options)
		if (response.status !== 200) {
			try {
				const json = await response.json()
				if (json.error) throw new Error(json.error)
			} catch (_) {
				throw new Error(`Invalid request: ${response.status} received`)
			}
		}

		return response.json()
	}

	getUdfConfig = async (): Promise<UdfConfig> => {
		const path = `${this.baseURL}/udf/config`
		const response = await fetch(path, this.options)
		if (response.status !== 200) {
			throw new Error(`Invalid request: ${response.status} received`)
		}

		return response.json()
	}

	getUdfSymbol = async (address: string): Promise<UdfSymbol> => {
		const path = `${this.baseURL}/udf/symbols?symbol=${encodeURIComponent(address)}`
		const response = await fetch(path, this.options)
		if (response.status !== 200) {
			throw new Error(`Invalid request: ${response.status} received`)
		}

		return response.json()
	}

	getUdfHistory = async (address: string, resolution: string, from: number, to: number): Promise<UdfHistory> => {
		const path = `${this.baseURL}/udf/history?symbol=${encodeURIComponent(
			address,
		)}&resolution=${resolution}&from=${from}&to=${to}&currencyCode=XRD`

		const response = await fetch(path, this.options)
		if (response.status !== 200) {
			throw new Error(`Invalid request: ${response.status} received`)
		}

		const data: UdfHistory = await response.json()
		if (data.s === 'error') {
			throw new Error(`Invalid request: ${data.errmsg}`)
		}
		return data
	}
}

const service = new OCIService()
export default service
