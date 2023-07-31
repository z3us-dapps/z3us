import type { StateEntityDetailsOptIns, StateEntityDetailsResponseItem } from '@radixdlt/babylon-gateway-api-sdk'
import { ResourceAggregationLevel } from '@radixdlt/babylon-gateway-api-sdk'
import { useQuery } from '@tanstack/react-query'

import type { SelectedAddresses } from '../../types/types'
import { useGatewayClient } from './use-gateway-client'
import { useNetworkId } from './use-network-id'
import { useRdtState } from './use-rdt-state'

const defaultOptIns: StateEntityDetailsOptIns = {
	ancestor_identities: false,
	component_royalty_vault_balance: true,
	package_royalty_vault_balance: true,
	non_fungible_include_nfids: true,
	explicit_metadata: ['name', 'symbol', 'description', 'tags', 'icon_url', 'info_url'],
}

export const useAccounts = (
	selected: SelectedAddresses = null,
	aggregation: ResourceAggregationLevel = ResourceAggregationLevel.Global,
	optIns: StateEntityDetailsOptIns = defaultOptIns,
) => {
	const networkId = useNetworkId()
	const { state } = useGatewayClient()!
	const { accounts = [] } = useRdtState()

	const addresses = accounts?.map(({ address }) => address).filter(address => !selected || address in selected)

	return useQuery({
		queryKey: ['useAccount', networkId, aggregation, ...addresses],
		queryFn: async (): Promise<StateEntityDetailsResponseItem[]> =>
			addresses.length === 0
				? []
				: state.innerClient
						.stateEntityDetails({
							stateEntityDetailsRequest: {
								addresses,
								aggregation_level: aggregation,
								opt_ins: optIns,
							},
						})
						.then(resp => resp.items),
		enabled: !!state,
	})
}
