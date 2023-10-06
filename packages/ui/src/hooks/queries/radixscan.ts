import { useQuery } from '@tanstack/react-query'

import { RadixScanService } from 'ui/src/services/radixscan'

const service = new RadixScanService()

export const getKnownTokensQueryKey = () => ['useKnownTokens']

export const useKnownTokens = () =>
	useQuery(getKnownTokensQueryKey(), service.getKnownTokens, {
		staleTime: 60 * 1000,
		refetchInterval: 60 * 1000,
	})
