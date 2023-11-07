import type { StateEntityDetailsOptIns, StateEntityDetailsResponseItem } from '@radixdlt/babylon-gateway-api-sdk'
import { ResourceAggregationLevel } from '@radixdlt/babylon-gateway-api-sdk'
import { useQuery } from '@tanstack/react-query'

import { defaultFungiblesOptIns, defaultNonFungiblesOptIns } from './use-entity-balances'
import { useGatewayClient } from './use-gateway-client'
import { useNetworkId } from './use-network-id'

const defaultOptIns: StateEntityDetailsOptIns = {
	ancestor_identities: true,
	component_royalty_vault_balance: true,
	package_royalty_vault_balance: true,
	non_fungible_include_nfids: true,
	explicit_metadata: [
		...defaultFungiblesOptIns.explicit_metadata,
		...defaultNonFungiblesOptIns.explicit_metadata,
	].filter((value: string, index: number, array: string[]) => array.indexOf(value) === index),
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
		staleTime: 30 * 1000,
		refetchInterval: 30 * 1000,
	})
}

export const useEntityDetails = (
	address: string,
	aggregation: ResourceAggregationLevel = ResourceAggregationLevel.Vault,
	optIns: StateEntityDetailsOptIns = defaultOptIns,
) => {
	const { data, ...rest } = useEntitiesDetails(address ? [address] : [], aggregation, optIns)
	return { ...rest, data: (data?.[0] || null) as StateEntityDetailsResponseItem }
}
