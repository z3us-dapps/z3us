import type { QueryClient } from '@tanstack/react-query'

import { config } from 'ui/src/constants/config'
import { knownAddressesQuery } from 'ui/src/hooks/dapp/use-known-addresses'
import { tokensQuery as astrolescentTokensQuery } from 'ui/src/hooks/queries/astrolescent'
import { tokensQuery as ociTokensQuery } from 'ui/src/hooks/queries/oci'

export const loader =
	(queryClient: QueryClient) =>
	async ({ request }) => {
		await Promise.all([
			// queryClient.prefetchQuery(knownAddressesQuery(config.defaultNetworkId)),
			// queryClient.prefetchQuery(astrolescentTokensQuery),
			// queryClient.prefetchQuery(ociTokensQuery),
		])
		return request
	}
