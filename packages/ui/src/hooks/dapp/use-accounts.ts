import { ResourceAggregationLevel } from '@radixdlt/babylon-gateway-api-sdk'
import { useQuery } from '@tanstack/react-query'

import type { SelectedAddresses } from '../../types/types'
import { useGatewayClient } from './use-gateway-client'
import { useNetworkId } from './use-network-id'
import { useRdtState } from './use-rdt-state'

export const useAccounts = (
	selected: SelectedAddresses = null,
	aggregation: ResourceAggregationLevel = ResourceAggregationLevel.Global,
) => {
	const networkId = useNetworkId()
	const { state } = useGatewayClient()!
	const { walletData } = useRdtState()

	const addresses = walletData.accounts
		.map(({ address }) => address)
		.filter(address => !selected || address in selected)

	return useQuery({
		queryKey: ['useAccount', networkId, aggregation, ...addresses],
		queryFn: () =>
			addresses.length > 0
				? state.innerClient
						.stateEntityDetails({
							stateEntityDetailsRequest: { addresses, aggregation_level: aggregation },
						})
						.then(resp => resp.items)
				: [],
		enabled: !!state,
	})
}
