import { Ticker } from '@src/types'

const parseTicker = (ticker: any, currency: string) => ({
	last_price: ticker[currency.toLowerCase()] as number,
	change: ticker[`${currency.toLowerCase()}_24h_change`] as number,
	volume: ticker[`${currency.toLowerCase()}_24h_vol`] as number,
})

// https://docs.google.com/spreadsheets/d/1wTTuxXt8n9q7C4NDXqQpI3wpKu1_5bGVmP9Xz0XGSyU/edit#gid=0
const assetToCoingeckoIdMap = {
	dgc: 'dogecube',
	xrd: 'radix',
}

export class CoinGeckoService {
	private baseURL: string = 'https://api.coingecko.com/api'

	private apiVersion: string = 'v3'

	private options: RequestInit = {
		method: 'GET',
		mode: 'no-cors',
		headers: {
			'Content-Type': 'application/json',
		},
	}

	getTicker = async (currency: string, asset: string): Promise<Ticker> => {
		const tickers = await this.getTickers(currency, [asset])
		if (!tickers || !tickers[asset]) {
			throw new Error('Not found')
		}
		return tickers[asset]
	}

	getTickers = async (currency: string, assets: string[]): Promise<{ [key: string]: Ticker }> => {
		const ids = assets.flatMap(asset => (assetToCoingeckoIdMap[asset] ? [assetToCoingeckoIdMap[asset]] : []))
		if (ids.length === 0) {
			return {}
		}

		const url = new URL(`${this.baseURL}/${this.apiVersion}/simple/price`)
		url.searchParams.set('ids', ids.join(','))
		url.searchParams.set('vs_currencies', currency)
		url.searchParams.set('include_24hr_vol', 'true')
		url.searchParams.set('include_24hr_change', 'true')
		url.searchParams.set('include_market_cap', 'false')
		url.searchParams.set('include_last_updated_at', 'false')
		const path = url.toString()

		const response = await fetch(path, this.options)
		if (response.status !== 200) {
			throw new Error(`Invalid request: ${response.status} recieved`)
		}

		const data = await response.json()

		return Object.keys(data).reduce((map, key, idx) => {
			map[assets[idx]] = {
				...parseTicker(data[key], currency),
				currency,
				asset: assets[idx],
			}
			return map
		}, {})
	}

	/**
	 *
	 * @param currency
	 * @param asset
	 * @param days
	 * @param interval
	 * @returns [
	 * 		[
	 * 			1653955200000,
	 * 			0.08696098529035991
	 * 		],
	 * 		[
	 * 			1654041600000,
	 * 			0.08719793590425542
	 * 		],
	 * 	]
	 */
	getMarketChart = async (
		currency: string,
		asset: string,
		days: number = 14,
		interval: string = 'daily',
	): Promise<number[][]> => {
		const id = assetToCoingeckoIdMap[asset]
		if (!id) {
			return []
		}

		const url = new URL(`${this.baseURL}/${this.apiVersion}/coins/${id}/market_chart`)
		url.searchParams.set('vs_currency', currency)
		url.searchParams.set('interval', interval)
		url.searchParams.set('days', `${days}`)
		const path = url.toString()

		const response = await fetch(path, this.options)
		if (response.status !== 200) {
			throw new Error(`Invalid request: ${response.status} recieved`)
		}

		const data = await response.json()

		return data?.prices || []
	}
}
