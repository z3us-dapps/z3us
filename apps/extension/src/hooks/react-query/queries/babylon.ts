import { useQuery } from 'react-query'

export const useBabylonStatus = () =>
	useQuery(['useBabylonStatus'], async (): Promise<number> => {
		const response = await fetch(`https://mainnet.radixdlt.com/status/gateway-status`, {
			method: 'POST',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
			},
		})
		if (response.status !== 200) {
			return 0
		}

		const resp = (await response.json()) as any
		return resp?.ledger_state?.epoch || 0
	})
