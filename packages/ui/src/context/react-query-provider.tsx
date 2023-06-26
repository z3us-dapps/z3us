import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { Hydrate, QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import React, { type PropsWithChildren } from 'react'

import { domExists } from 'ui/src/utils/dom-exists'

const client = new QueryClient({
	defaultOptions: {
		queries: {
			cacheTime: 1000 * 60 * 60 * 24 * 7, // 7 days
			staleTime: 60 * 1000, // cache for 1 minute
			refetchInterval: 60 * 1000, // automatically refetch every minute
			refetchIntervalInBackground: true,
		},
	},
})

const persister = createSyncStoragePersister({
	storage: domExists() ? window?.localStorage : undefined,
})

type Props = { dehydratedState?: any }

export const ReactQueryProvider: React.FC<PropsWithChildren & Props> = ({ children, dehydratedState }) => (
	<PersistQueryClientProvider client={client} persistOptions={{ persister }}>
		<Hydrate state={dehydratedState}>{children}</Hydrate>
	</PersistQueryClientProvider>
)
