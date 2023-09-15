import type { StateEntityDetailsOptIns } from '@radixdlt/babylon-gateway-api-sdk'
import { ResourceAggregationLevel } from '@radixdlt/babylon-gateway-api-sdk'
import { useQuery } from '@tanstack/react-query'

import { useGatewayClient } from './use-gateway-client'
import { useNetworkId } from './use-network-id'

const defaultOptIns: StateEntityDetailsOptIns = {
	ancestor_identities: true,
	component_royalty_vault_balance: true,
	package_royalty_vault_balance: true,
	non_fungible_include_nfids: true,
	explicit_metadata: ['name', 'symbol', 'description', 'tags', 'icon_url', 'info_url', 'key_image_url', 'validator'],
}

export const useEntitiesDetails = (
	addresses: string[],
	aggregation: ResourceAggregationLevel = ResourceAggregationLevel.Vault,
	optIns: StateEntityDetailsOptIns = defaultOptIns,
) => {
	const networkId = useNetworkId()
	const { state } = useGatewayClient()!

	return useQuery({
		queryKey: ['useEntitiesDetails', networkId, ...addresses],
		queryFn: () =>
			addresses.length > 0
				? state.innerClient
						.stateEntityDetails({
							stateEntityDetailsRequest: {
								addresses,
								aggregation_level: aggregation,
								opt_ins: optIns,
							},
						})
						.then(resp => resp.items)
				: [],
		enabled: !!state,
	})
}

export const useEntityDetails = (
	address: string,
	aggregation: ResourceAggregationLevel = ResourceAggregationLevel.Vault,
	optIns: StateEntityDetailsOptIns = defaultOptIns,
) => useEntitiesDetails([address], aggregation, optIns)
