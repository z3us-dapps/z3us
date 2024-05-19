import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import type { QueryClient } from '@tanstack/react-query'
import { Hydrate } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import React, { type PropsWithChildren } from 'react'

import { domExists } from 'ui/src/utils/dom'

const cacheKey = 'z3us:cache'
const persister = createSyncStoragePersister({
	key: cacheKey,
	throttleTime: 1 * 1000, // To avoid localStorage spamming, pass a time in ms to throttle saving the cache to disk
	storage: domExists() ? window?.localStorage : undefined,
})

type Props = { queryClient: QueryClient; dehydratedState?: any }

export const ReactQueryProvider: React.FC<PropsWithChildren & Props> = ({ children, queryClient, dehydratedState }) => (
	<PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
		<Hydrate state={dehydratedState}>{children}</Hydrate>
	</PersistQueryClientProvider>
)
