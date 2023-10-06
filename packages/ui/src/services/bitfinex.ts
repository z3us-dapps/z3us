import type { Ticker } from 'ui/src/types/types'

// https://docs.bitfinex.com/reference#rest-public-ticker
const parseTicker = (ticker: Array<string | number>) => ({
	change: ((ticker[5] || 0) as number) * 100,
	last_price: (ticker[6] || 0) as number,
	volume: (ticker[7] || 0) as number,
	// bid: (ticker[0] || 0) as number,
	// ask: (ticker[2] || 0) as number,
	// low: (ticker[9] || 0) as number,
	// high: (ticker[9] || 0) as number,
})

export class BitFinexService {
	private baseURL: string = 'https://api.bitfinex.com'

	private options: RequestInit = {
		method: 'GET',
		// mode: 'no-cors',
		headers: {
			'Content-Type': 'application/json',
		},
	}

	getTicker = async (currency: string, asset: string): Promise<Ticker> => {
		const path = `${this.baseURL}/v2/ticker/t${asset.toUpperCase()}${currency.toUpperCase()}`

		const response = await fetch(path, this.options)
		if (response.status !== 200) {
			throw new Error(`Invalid request: ${response.status} recieved`)
		}

		const data = await response.json()

		return { ...parseTicker(data as Array<string | number>), currency, asset }
	}

	getTickers = async (currency: string, assets: string[]): Promise<{ [key: string]: Ticker }> => {
		const url = new URL(`${this.baseURL}/v2/ticker/tickers`)
		url.searchParams.set('symbols', assets.map(asset => `t${asset.toUpperCase()}${currency.toUpperCase()}`).join(','))
		const path = url.toString()

		const response = await fetch(path, this.options)
		if (response.status !== 200) {
			throw new Error(`Invalid request: ${response.status} recieved`)
		}

		const data = await response.json()

		return (data as Array<Array<string | number>>).reduce((map, ticker, idx) => {
			map[assets[idx]] = {
				...parseTicker(ticker),
				currency,
				asset: assets[idx],
			}
			return map
		}, {})
	}
}
