import { QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			cacheTime: 1000 * 60 * 60 * 24 * 7, // 7 days
			staleTime: 60 * 1000, // cache for 1 minute
			refetchInterval: 60 * 1000, // automatically refetch every minute
			refetchIntervalInBackground: true,
			keepPreviousData: true,
		},
	},
})

export default queryClient
