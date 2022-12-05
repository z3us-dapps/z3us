import { VisibleTokens } from '@src/types'

export class RadixScanService {
	private baseURL: string = 'https://www.radixscan.io/stable/z3us/v0'

	private options: RequestInit = {
		method: 'GET',
		// mode: 'no-cors',
		headers: {
			'Content-Type': 'application/json',
		},
	}

	getKnownTokens = async (): Promise<VisibleTokens> => {
		const response = await fetch(`${this.baseURL}/tokenlist/`, this.options)
		if (response.status !== 200) {
			throw new Error(`Invalid request: ${response.status} recieved`)
		}

		return response.json()
	}
}
