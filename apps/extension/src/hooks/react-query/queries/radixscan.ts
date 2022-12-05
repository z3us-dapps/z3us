import { useQuery } from 'react-query'
import { RadixScanService } from '@src/services/radixscan'

const service = new RadixScanService()

export const useKnownTokens = () =>
	useQuery(['useKnownTokens'], service.getKnownTokens, {
		staleTime: 60 * 1000,
		refetchInterval: 60 * 1000,
	})
