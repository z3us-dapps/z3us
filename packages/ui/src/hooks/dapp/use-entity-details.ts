import type { StateEntityDetailsOptIns, StateEntityDetailsResponseItem } from '@radixdlt/babylon-gateway-api-sdk'
import { ResourceAggregationLevel } from '@radixdlt/babylon-gateway-api-sdk'
import { useQueries } from '@tanstack/react-query'

import { splitArrayIntoChunks } from 'ui/src/utils/array-chunk'
import { formatDateTime } from 'ui/src/utils/date'

import { useGatewayClient } from './use-gateway-client'
import { useNetworkId } from './use-network'

export const defaultFungiblesOptIns: StateEntityDetailsOptIns = {
	ancestor_identities: false,
	component_royalty_vault_balance: false,
	package_royalty_vault_balance: false,
	non_fungible_include_nfids: true,
	explicit_metadata: ['name', 'symbol', 'description', 'tags', 'icon_url', 'info_url', 'validator', 'pool'],
}

export const defaultNonFungiblesOptIns: StateEntityDetailsOptIns = {
	ancestor_identities: false,
	component_royalty_vault_balance: false,
	package_royalty_vault_balance: false,
	non_fungible_include_nfids: true,
	explicit_metadata: ['name', 'description', 'key_image_url'],
}

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
	at?: Date,
) => {
	const networkId = useNetworkId()
	const { state } = useGatewayClient()!

	const queryFn = (chunk: string[]) =>
		state.innerClient
			.stateEntityDetails({
				stateEntityDetailsRequest: {
					addresses: chunk,
					aggregation_level: aggregation,
					opt_ins: optIns,
					at_ledger_state: at ? { timestamp: at } : null,
				},
			})
			.then(resp => resp.items)

	const queries = splitArrayIntoChunks(addresses, 20).map(chunk => ({
		queryKey: ['useEntitiesDetails', networkId, aggregation, optIns, chunk, formatDateTime(at)],
		queryFn: () => queryFn(chunk),
		enabled: !!state && chunk.length > 0,
		staleTime: 30 * 1000,
	}))

	const results = useQueries({ queries })

	const combinedResult = results.reduce(
		(container, result) => ({
			data: container.data.concat(result.data || []),
			isLoading: container.isLoading || result.isLoading,
			error: container.error || result.error,
			status: container.status || result.status,
		}),
		{ data: [], isLoading: false, error: null, status: 'idle' },
	)

	return combinedResult
}

export const useEntityDetails = (
	address: string,
	aggregation: ResourceAggregationLevel = ResourceAggregationLevel.Vault,
	optIns: StateEntityDetailsOptIns = defaultOptIns,
	at?: Date,
) => {
	const { data = [], ...rest } = useEntitiesDetails(address ? [address] : [], aggregation, optIns, at)
	return { ...rest, data: (data[0] || null) as StateEntityDetailsResponseItem }
}
