import type {
	FungibleResourcesCollectionItemVaultAggregated,
	StateEntityDetailsResponseItem,
	StateEntityDetailsResponseItemDetails,
} from '@radixdlt/radix-dapp-toolkit'
import { decimal } from '@radixdlt/radix-engine-toolkit'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { findMetadataValue } from 'ui/src/services/metadata'

import { useEntitiesDetails } from './use-entity-details'

const ZERO = decimal(0).value

const collectResourceValidatorAddresses = (
	container: string[],
	item: FungibleResourcesCollectionItemVaultAggregated,
): string[] => {
	const validator = findMetadataValue('validator', item.explicit_metadata?.items)
	if (validator && validator.startsWith('validator_')) container.push(validator)
	return container
}

const collectAccountValidatorAddresses = (accounts: StateEntityDetailsResponseItem[]) => () => {
	if (!accounts) return []
	return accounts
		.map(({ fungible_resources }) => fungible_resources.items.reduce(collectResourceValidatorAddresses, []))
		.reduce((a, b) => a.concat(b), [])
		.filter((value, index, array) => array.indexOf(value) === index)
}

const collectStakeResourceAddresses = (validators: StateEntityDetailsResponseItem[]) => () =>
	validators
		?.map(
			validator =>
				((validator.details as Extract<StateEntityDetailsResponseItemDetails, { type: 'Component' }>).state as any)
					.stake_unit_resource_address,
		)
		.filter(a => !!a) || []

export const useValidators = (accounts: StateEntityDetailsResponseItem[], at: Date) => {
	const addresses = useMemo(collectAccountValidatorAddresses(accounts), [accounts])
	const { data: validators } = useEntitiesDetails(addresses, undefined, undefined, at)

	const stakeResourceAddresses = useMemo(collectStakeResourceAddresses(validators), [validators])
	const { data: units } = useEntitiesDetails(stakeResourceAddresses, undefined, undefined, at)

	const queryFn = () => {
		const unitsSupply = units.reduce((m, unit) => {
			m[unit.address] = unit.details.total_supply
			return m
		}, {})

		return validators.reduce((map, validator) => {
			const resourceAmounts = validator.fungible_resources.items.reduce(
				(m, { resource_address, vaults }: FungibleResourcesCollectionItemVaultAggregated) => {
					m[resource_address] = vaults.items
						.reduce(
							(sum, { amount: vaultAmount, vault_address }) =>
								vault_address === (validator.details as any).state.stake_xrd_vault.entity_address
									? sum.add(decimal(vaultAmount).value)
									: sum,
							ZERO,
						)
						.add(m[resource_address] || 0)

					return m
				},
				{},
			)

			validator.resourceAmounts = resourceAmounts || {}
			validator.unitTotalSupply = unitsSupply[validator.details.state.stake_unit_resource_address] || '0'

			map[validator.address] = validator
			return map
		}, {})
	}

	return useQuery({
		queryKey: ['useValidators', validators, units],
		queryFn,
		enabled: !!validators && !!units,
	})
}
