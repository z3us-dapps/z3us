import { useQuery } from '@tanstack/react-query'

import type { Token } from 'ui/src/services/swap/oci'
import oci from 'ui/src/services/swap/oci'

export const useTokens = () =>
	useQuery(['oci', 'useTokens'], async (): Promise<{ [key: string]: Token }> => {
		try {
			const tokens = await oci.getTokens()
			return tokens.reduce((a, token) => ({ ...a, [token.ticker]: token }), {})
		} catch (error: any) {
			return {}
		}
	})
