import { ResourceAggregationLevel } from '@radixdlt/babylon-gateway-api-sdk'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useGatewayClient } from './use-gateway-client'
import { useRdtState } from './use-rdt-state'

type SelectedAdresses = { [address: string]: null } | null

export const useAccounts = (
	selected: SelectedAdresses = null,
	aggregation: ResourceAggregationLevel = ResourceAggregationLevel.Global,
) => {
	const { state } = useGatewayClient()!
	const { accounts = [] } = useRdtState()!

	const addresses = useMemo(
		() => accounts.map(({ address }) => address).filter(address => !selected || !!selected[address]),
		[Object.keys(selected || {})],
	)

	return useQuery({
		queryKey: ['useAccount', ...addresses],
		queryFn: () =>
			state.innerClient
				.stateEntityDetails({
					stateEntityDetailsRequest: { addresses, aggregation_level: aggregation },
				})
				.then(resp => resp.items),
		enabled: !!state && addresses.length > 0,
	})
}
