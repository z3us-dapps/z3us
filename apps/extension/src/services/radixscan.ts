import { KnownTokens } from '@src/types'

export class RadixScanService {
	private baseURL: string = 'https://www.radixscan.io/raw'

	private options: RequestInit = {
		method: 'GET',
		// mode: 'no-cors',
		headers: {
			'Content-Type': 'application/json',
		},
	}

	getKnownTokens = async (): Promise<KnownTokens> => {
		const response = await fetch(`${this.baseURL}/knowntokens/`, this.options)
		if (response.status !== 200) {
			throw new Error(`Invalid request: ${response.status} recieved`)
		}

		return response.json()
	}
}
