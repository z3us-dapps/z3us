import { QueryClient } from '@tanstack/react-query'

import retry from './retry'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			cacheTime: 1000 * 60 * 60 * 24 * 7, // 7 days
			staleTime: 5 * 60 * 1000, // cache for 1 minute
			keepPreviousData: true,
			retry,
		},
	},
})

export default queryClient
