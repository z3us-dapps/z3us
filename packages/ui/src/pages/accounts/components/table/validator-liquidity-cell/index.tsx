import type {
	FungibleResourcesCollectionItemVaultAggregated,
	StateEntityDetailsResponseFungibleResourceDetails,
	StateEntityDetailsResponseItem,
	StateNonFungibleDetailsResponseItem,
} from '@radixdlt/babylon-gateway-api-sdk'
import type { KnownAddresses } from '@radixdlt/radix-engine-toolkit'
import { decimal } from '@radixdlt/radix-engine-toolkit'
import clsx from 'clsx'
import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { FallbackLoading } from 'ui/src/components/fallback-renderer'
import { ResourceSnippet } from 'ui/src/components/snippet/resource'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Text } from 'ui/src/components/typography'
import { DECIMAL_STYLES } from 'ui/src/constants/number'
import { useEntityDetails } from 'ui/src/hooks/dapp/use-entity-details'
import { useNonFungiblesData } from 'ui/src/hooks/dapp/use-entity-nft'
import { useKnownAddresses } from 'ui/src/hooks/dapp/use-known-addresses'
import { findFieldValue } from 'ui/src/services/metadata'
import type { ResourceBalance, ResourceBalanceKind } from 'ui/src/types'
import { ResourceBalanceType } from 'ui/src/types'

import * as styles from '../styles.css'

export const ZERO = decimal(0).value

export const getStakedAmount = (data: StateEntityDetailsResponseItem, knownAddresses: KnownAddresses) =>
	data?.fungible_resources.items
		.filter(({ resource_address }) => resource_address === knownAddresses?.resourceAddresses.xrd)
		.reduce(
			(total, { vaults }: FungibleResourcesCollectionItemVaultAggregated) =>
				total.add(
					vaults.items
						.filter(({ vault_address }) => vault_address === (data.details as any).state.stake_xrd_vault.entity_address)
						.reduce((sum, { amount: vaultAmount }) => sum.add(decimal(vaultAmount).value), ZERO),
				),
			ZERO,
		) || ZERO

export const getUnStakeAmount = (items: Array<StateNonFungibleDetailsResponseItem>) =>
	items?.reduce((total, { data }) => {
		const dataJson = data?.programmatic_json as any
		const amount = findFieldValue('claim_amount', dataJson?.fields)

		return total.add(amount || 0)
	}, ZERO) || ZERO

interface IProps {
	row?: { original: ResourceBalanceKind }
}

export const ValidatorLiquidityCell: React.FC<IProps> = props => {
	const {
		row: { original },
	} = props
	const { amount, address, validator, ids, type } = original as ResourceBalance[ResourceBalanceType.FUNGIBLE] & {
		ids?: string[]
	}

	const intl = useIntl()
	const { data, isLoading } = useEntityDetails(validator)
	const { data: tokenData, isLoading: isLoadingResource } = useEntityDetails(address)
	const { data: knownAddresses, isLoading: isLoadingKnownAddresses } = useKnownAddresses()
	const { data: nfts = [] } = useNonFungiblesData(address, ids || [])

	const xrdAmount = useMemo(() => {
		if (type === ResourceBalanceType.FUNGIBLE) {
			const stakedAmount = getStakedAmount(data, knownAddresses)
			return decimal(amount)
				.value.div((tokenData?.details as StateEntityDetailsResponseFungibleResourceDetails)?.total_supply || 0)
				.mul(stakedAmount)
		}
		return getUnStakeAmount(nfts)
	}, [type, amount, data, tokenData, knownAddresses, nfts])

	if (isLoading || isLoadingResource || isLoadingKnownAddresses) return <FallbackLoading />

	return (
		<Box className={styles.cellWrapper}>
			<Box className={clsx(styles.cellContentWrapper, 'td-cell')}>
				<Box display="flex" flexDirection="column">
					<ToolTip message={amount}>
						<Box display="flex" gap="xsmall" width="full">
							<Box display="flex" flexShrink={0}>
								<ResourceSnippet address={address} size="small" /> &nbsp;-{' '}
							</Box>
							<Text size="small" color="strong" truncate>
								{intl.formatNumber(Number.parseFloat(amount), DECIMAL_STYLES)}
							</Text>
						</Box>
					</ToolTip>
					<ToolTip message={xrdAmount.toString()}>
						<Box display="flex" gap="xsmall" width="full">
							<Box display="flex" flexShrink={0}>
								<ResourceSnippet address={knownAddresses.resourceAddresses.xrd} size="small" /> &nbsp;-{' '}
							</Box>
							<Text size="small" color="strong" truncate>
								{intl.formatNumber(xrdAmount.toNumber(), DECIMAL_STYLES)}
							</Text>
						</Box>
					</ToolTip>
				</Box>
			</Box>
		</Box>
	)
}
