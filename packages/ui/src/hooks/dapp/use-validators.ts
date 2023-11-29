import type {
	FungibleResourcesCollectionItemVaultAggregated,
	// NonFungibleResourcesCollectionItemVaultAggregated,
} from '@radixdlt/radix-dapp-toolkit'
import { decimal } from '@radixdlt/radix-engine-toolkit'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'

import { findMetadataValue } from 'ui/src/services/metadata'

import { useEntitiesDetails } from './use-entity-details'
import { useNetworkId } from './use-network-id'

const ZERO = decimal(0).value

const collectResourceValidators = (
	container: string[],
	item: FungibleResourcesCollectionItemVaultAggregated,
): string[] => {
	const metadata = item.explicit_metadata?.items
	const validator = findMetadataValue('validator', metadata)
	if (validator) container.push(validator)
	return container
}

const useAccountValidators = (accounts, at?: Date) => {
	const addresses = useMemo(() => {
		if (!accounts) return []
		return accounts
			.map(({ fungible_resources }) => fungible_resources.items.reduce(collectResourceValidators, []))
			.reduce((a, b) => a.concat(b), [])
			.filter((value, index, array) => array.indexOf(value) === index)
	}, [accounts])
	return useEntitiesDetails(addresses, undefined, undefined, at)
}

export const useValidators = (addresses: string[]) => {
	const networkId = useNetworkId()

	const { data: accounts, isLoading: isLoadingAccounts } = useEntitiesDetails(addresses)

	const [before, setBefore] = useState<Date>(new Date())
	useEffect(() => {
		before.setDate(before.getDate() - 1)
		before.setHours(0, 0, 0, 0)
		setBefore(before)
	}, [])

	const { data: validators, isLoading: isLoadingValidators } = useAccountValidators(accounts)
	const { data: validatorsBefore, isLoading: isLoadingPoolsBefore } = useAccountValidators(accounts, before)

	const validatorResources = useMemo(
		() => validators?.map(validator => validator.details.state.stake_unit_resource_address) || [],
		[validators],
	)
	const { data: units, isLoading: isLoadingValidatorUnits } = useEntitiesDetails(validatorResources)

	const validatorResourcesBefore = useMemo(
		() => validatorsBefore?.map(validator => validator.details.state.stake_unit_resource_address) || [],
		[validatorsBefore],
	)
	const { data: unitsBefore, isLoading: isLoadingValidatorUnitsBefore } = useEntitiesDetails(
		validatorResourcesBefore,
		undefined,
		undefined,
		before,
	)

	const validatorNFT = useMemo(
		() => validators?.map(validator => validator.details.state.claim_token_resource_address) || [],
		[validators],
	)
	const { data: claims, isLoading: isLoadingValidatorClaims } = useEntitiesDetails(validatorNFT)

	const validatorNFTBefore = useMemo(
		() => validatorsBefore?.map(validator => validator.details.state.claim_token_resource_address) || [],
		[validatorsBefore],
	)
	const { data: claimsBefore, isLoading: isLoadingValidatorClaimsBefore } = useEntitiesDetails(
		validatorNFTBefore,
		undefined,
		undefined,
		before,
	)

	const isLoading =
		isLoadingValidators ||
		isLoadingAccounts ||
		isLoadingValidatorUnits ||
		isLoadingValidatorUnitsBefore ||
		isLoadingValidatorClaims ||
		isLoadingValidatorClaimsBefore ||
		isLoadingPoolsBefore
	const enabled = !isLoading && addresses.length > 0 && !!validators && !!validatorsBefore && !!units && !!unitsBefore

	const queryFn = () => {
		const validatorsBeforeMap = validatorsBefore.reduce((map, validator) => {
			map[validator.address] = validator
			return map
		}, {})

		const unitsSupply = units.reduce((m, unit) => {
			m[unit.address] = unit.details.total_supply
			return m
		}, {})

		const unitsSupplyBefore = unitsBefore.reduce((m, unit) => {
			m[unit.address] = unit.details.total_supply
			return m
		}, {})

		const claimsSupply = claims.reduce((m, claim) => {
			m[claim.address] = claim.details.total_supply
			return m
		}, {})

		const claimsSupplyBefore = claimsBefore.reduce((m, claim) => {
			m[claim.address] = claim.details.total_supply
			return m
		}, {})

		return (
			validators.reduce((map, validator) => {
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
				const resourceAmountsBefore = validatorsBeforeMap[validator.address]?.fungible_resources.items.reduce(
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

				// const resourceClaims = validator.non_fungible_resources.items.reduce(
				// 	(m, { resource_address, vaults }: NonFungibleResourcesCollectionItemVaultAggregated) => {
				// 		m[resource_address] = vaults.items
				// 			.reduce((sum, { total_count }) => sum.add(decimal(total_count).value), ZERO)
				// 			.add(m[resource_address] || 0)

				// 		return m
				// 	},
				// 	{},
				// )
				// const resourceClaimsBefore = validatorsBeforeMap[validator.address]?.non_fungible_resources.items.reduce(
				// 	(m, { resource_address, vaults }: NonFungibleResourcesCollectionItemVaultAggregated) => {
				// 		m[resource_address] = vaults.items
				// 			.reduce((sum, { total_count }) => sum.add(decimal(total_count).value), ZERO)
				// 			.add(m[resource_address] || 0)

				// 		return m
				// 	},
				// 	{},
				// )

				validator.resourceAmounts = resourceAmounts || {}
				validator.resourceAmountsBefore = resourceAmountsBefore || {}
				validator.validatorUnitTotalSupply = unitsSupply[validator.details.state.stake_unit_resource_address] || '0'
				validator.validatorUnitTotalSupplyBefore =
					unitsSupplyBefore[validator.details.state.stake_unit_resource_address] || '0'
				validator.validatorClaimTotalSupply = claimsSupply[validator.details.state.claim_token_resource_address] || '0'
				validator.validatorClaimTotalSupplyBefore =
					claimsSupplyBefore[validator.details.state.claim_token_resource_address] || '0'

				map[validator.address] = validator
				return map
			}, {}) || {}
		)
	}

	return useQuery({
		queryKey: ['useValidators', networkId, addresses, before],
		enabled,
		queryFn,
	})
}
