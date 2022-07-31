export type CaviarPool = {
	id: string
	name: string
	wallet: string
	balances: { [rri: string]: number }
}

export type CaviarPoolsResponse = CaviarPool[]

export const PoolName = 'CaviarSwap'

export class CaviarService {
	private baseURL: string = 'https://pjhht6w8p9.execute-api.eu-west-2.amazonaws.com/prod'

	private options: RequestInit = {
		method: 'GET',
		// mode: 'no-cors',
		headers: {
			'Content-Type': 'application/json',
		},
	}

	getPools = async (): Promise<CaviarPoolsResponse> => {
		const response = await fetch(`${this.baseURL}/pools-web`, this.options)
		if (response.status !== 200) {
			throw new Error(`Invalid request: ${response.status} recieved`)
		}

		return response.json()
	}
}

const service = new CaviarService()
export default service
