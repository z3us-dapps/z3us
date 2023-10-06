import type { Ticker } from 'ui/src/types/types'

const parseTicker = (ticker: any, currency: string) => ({
	last_price: (ticker[currency.toLowerCase()] || 0) as number,
	change: (ticker[`${currency.toLowerCase()}_24h_change`] || 0) as number,
	volume: (ticker[`${currency.toLowerCase()}_24h_vol`] || 0) as number,
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
		// mode: 'no-cors',
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
		days: number | string = 14,
		interval: string = 'daily',
	): Promise<number[][]> => {
		const id = assetToCoingeckoIdMap[asset.toLocaleLowerCase()]
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

	getMarketChartRange = async (
		currency: string,
		asset: string,
		from: Date,
		to: Date,
	): Promise<{
		prices: number[][]
		market_caps: number[][]
		total_volumes: number[][]
	}> => {
		const id = assetToCoingeckoIdMap[asset]
		if (!id) {
			return {
				prices: [],
				market_caps: [],
				total_volumes: [],
			}
		}

		const url = new URL(`${this.baseURL}/${this.apiVersion}/coins/${id}/market_chart/range`)
		url.searchParams.set('vs_currency', currency)
		url.searchParams.set('from', `${Math.floor(from.getTime() / 1000)}`)
		url.searchParams.set('to', `${Math.floor(to.getTime() / 1000)}`)
		const path = url.toString()

		const response = await fetch(path, this.options)
		if (response.status !== 200) {
			throw new Error(`Invalid request: ${response.status} recieved`)
		}

		const data = await response.json()
		return (
			data || {
				prices: [],
				market_caps: [],
				total_volumes: [],
			}
		)
	}

	getSupportedCurrencies = async (): Promise<string[]> => {
		const url = new URL(`${this.baseURL}/${this.apiVersion}/simple/supported_vs_currencies`)
		const path = url.toString()

		const response = await fetch(path, this.options)
		if (response.status !== 200) {
			throw new Error(`Invalid request: ${response.status} recieved`)
		}

		const data = await response.json()

		return data || []
	}

	getXRDPriceOnDay = async (date: Date, currency: string, coin: string = 'radix'): Promise<number | null> => {
		const url = new URL(`${this.baseURL}/${this.apiVersion}/coins/${coin}/history`)
		url.searchParams.set('date', `${date.getUTCDate()}-${date.getUTCMonth() + 1}-${date.getUTCFullYear()}`)
		const path = url.toString()

		const response = await fetch(path, this.options)
		if (response.status !== 200) {
			throw new Error(`Invalid request: ${response.status} recieved`)
		}

		const data = await response.json()
		if (data?.id !== coin) {
			return null
		}
		return data?.market_data?.current_price[currency.toLocaleLowerCase()] || null
	}
}
