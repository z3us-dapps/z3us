export type Token = {
	rri: string
	name: string
	symbol: string
}

export type Tokens = {
	[rri: string]: Token
}

export class RadixScanService {
	private baseURL: string = 'https://www.radixscan.io/stable/z3us/v0'

	private options: RequestInit = {
		method: 'GET',
		// mode: 'no-cors',
		headers: {
			'Content-Type': 'application/json',
		},
	}

	getKnownTokens = async (): Promise<Tokens> => {
		const response = await fetch(`${this.baseURL}/tokenlist/`, this.options)
		if (response.status !== 200) {
			throw new Error(`Invalid request: ${response.status} recieved`)
		}

		return response.json()
	}
}
