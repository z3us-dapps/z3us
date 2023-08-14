import type { StateEntityDetailsOptIns, StateEntityDetailsResponseItem } from '@radixdlt/babylon-gateway-api-sdk'
import { ResourceAggregationLevel } from '@radixdlt/babylon-gateway-api-sdk'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { useGatewayClient } from './use-gateway-client'
import { useNetworkId } from './use-network-id'
import { useRdtState } from './use-rdt-state'

export const useSelectedAccounts = (): string[] => {
	const { accountId } = useParams()
	const { accounts = [], persona } = useRdtState()

	return useMemo(
		() => accounts?.map(({ address }) => address).filter(address => !accountId || accountId === address),
		[accountId, persona?.identityAddress],
	)
}

const defaultOptIns: StateEntityDetailsOptIns = {
	ancestor_identities: false,
	component_royalty_vault_balance: true,
	package_royalty_vault_balance: true,
	non_fungible_include_nfids: true,
	explicit_metadata: ['name', 'symbol', 'description', 'tags', 'icon_url', 'info_url', 'key_image_url', 'validator'],
}

export const useAccounts = (
	addresses: string[],
	aggregation: ResourceAggregationLevel = ResourceAggregationLevel.Global,
	optIns: StateEntityDetailsOptIns = defaultOptIns,
) => {
	const networkId = useNetworkId()
	const { state } = useGatewayClient()!

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
