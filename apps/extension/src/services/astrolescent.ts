export const PoolName = 'Astrolescent'

export type Token = {
	symbol: string
	rri: string
}

export type TokensResponse = Array<Token>

export class AstrolescentService {
	private baseURL: string = 'https://api.astrolescent.workers.dev'

	private options: RequestInit = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	}

	getTokens = async (): Promise<TokensResponse> => {
		const response = await fetch(`${this.baseURL}/tokens}`, this.options)
		if (response.status !== 200) {
			throw new Error(`Invalid request: ${response.status} received`)
		}

		return response.json()
	}

	// getSwap = async (): Promise<Pool[]> => {
    //     // tokenIn=XRD&tokenOut=OCI&tokenInAmount=50000&fromAddress=rdx1qsp9zwufnrue0uk8fdzkpmd609xd90z3ngc8dxd7h8ugsez29qascrs895xmt
	// 	const response = await fetch(`${this.baseURL}/swap`, this.options)
	// 	if (response.status !== 200) {
	// 		throw new Error(`Invalid request: ${response.status} received`)
	// 	}

	// 	return response.json()
	// }
}

const service = new AstrolescentService()
export default service
