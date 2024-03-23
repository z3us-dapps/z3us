import { QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 3,
			cacheTime: 1000 * 60 * 60 * 24 * 7, // 7 days
			staleTime: 5 * 60 * 1000, // cache for 1 minute
			keepPreviousData: true,
		},
	},
})

export default queryClient
