import type { StateEntityDetailsOptIns } from '@radixdlt/babylon-gateway-api-sdk'
import { ResourceAggregationLevel } from '@radixdlt/babylon-gateway-api-sdk'
import { useQueries, useQuery } from '@tanstack/react-query'

import { useGatewayClient } from './use-gateway-client'
import { useNetworkId } from './use-network-id'

const defaultFungiblesOptIns: StateEntityDetailsOptIns = {
	ancestor_identities: false,
	component_royalty_vault_balance: false,
	package_royalty_vault_balance: false,
	non_fungible_include_nfids: true,
	explicit_metadata: ['name', 'symbol', 'description', 'tags', 'icon_url', 'info_url'],
}

export const useEntityFungibles = (
	address: string,
	cursor: string = null,
	limit: number = null,
	aggregation: ResourceAggregationLevel = ResourceAggregationLevel.Vault,
	optIns: StateEntityDetailsOptIns = defaultFungiblesOptIns,
) => {
	const networkId = useNetworkId()
	const { state } = useGatewayClient()!

	return useQuery({
		queryKey: ['useEntityFungibles', networkId, address],
		queryFn: () =>
			state.innerClient
				.entityFungiblesPage({
					stateEntityFungiblesPageRequest: {
						address,
						cursor,
						limit_per_page: limit,
						aggregation_level: aggregation,
						opt_ins: optIns,
					},
				})
				.then(resp => resp.items),
		enabled: !!state && !!address,
	})
}

export const useEntitiesFungibles = (
	addresses: string[],
	cursor: string = null,
	limit: number = null,
	aggregation: ResourceAggregationLevel = ResourceAggregationLevel.Vault,
	optIns: StateEntityDetailsOptIns = defaultFungiblesOptIns,
) => {
	const networkId = useNetworkId()
	const { state } = useGatewayClient()!

	const queries = addresses.map(address => ({
		queryKey: ['useEntityFungibles', networkId, address],
		queryFn: () =>
			state.innerClient
				.entityFungiblesPage({
					stateEntityFungiblesPageRequest: {
						address,
						cursor,
						limit_per_page: limit,
						aggregation_level: aggregation,
						opt_ins: optIns,
					},
				})
				.then(resp => resp.items),
		enabled: !!state && !!address,
	}))

	return useQueries({ queries })
}

const defaultNonFungiblesOptIns: StateEntityDetailsOptIns = {
	ancestor_identities: false,
	component_royalty_vault_balance: false,
	package_royalty_vault_balance: false,
	non_fungible_include_nfids: true,
	explicit_metadata: ['name', 'description', 'key_image_url'],
}

export const useEntityNonFungibles = (
	address: string,
	cursor: string = null,
	limit: number = null,
	aggregation: ResourceAggregationLevel = ResourceAggregationLevel.Vault,
	optIns: StateEntityDetailsOptIns = defaultNonFungiblesOptIns,
) => {
	const networkId = useNetworkId()
	const { state } = useGatewayClient()!

	return useQuery({
		queryKey: ['useEntityNonFungibles', networkId, address],
		queryFn: () =>
			state.innerClient
				.entityNonFungiblesPage({
					stateEntityNonFungiblesPageRequest: {
						address,
						cursor,
						limit_per_page: limit,
						aggregation_level: aggregation,
						opt_ins: optIns,
					},
				})
				.then(resp => resp.items),
		enabled: !!state && !!address,
	})
}

export const useEntitiesNonFungibles = (
	addresses: string[],
	cursor: string = null,
	limit: number = null,
	aggregation: ResourceAggregationLevel = ResourceAggregationLevel.Vault,
	optIns: StateEntityDetailsOptIns = defaultFungiblesOptIns,
) => {
	const networkId = useNetworkId()
	const { state } = useGatewayClient()!

	const queries = addresses.map(address => ({
		queryKey: ['useEntityNonFungibles', networkId, address],
		queryFn: () =>
			state.innerClient
				.entityNonFungiblesPage({
					stateEntityNonFungiblesPageRequest: {
						address,
						cursor,
						limit_per_page: limit,
						aggregation_level: aggregation,
						opt_ins: optIns,
					},
				})
				.then(resp => resp.items),
		enabled: !!state && !!address,
	}))

	return useQueries({ queries })
}
