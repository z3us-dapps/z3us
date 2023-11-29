import type {
	FungibleResourcesCollectionItemVaultAggregated,
	StateEntityDetailsResponseFungibleResourceDetails,
	StateEntityDetailsResponseItem,
} from '@radixdlt/babylon-gateway-api-sdk'
import type { KnownAddresses } from '@radixdlt/radix-engine-toolkit'
import { decimal } from '@radixdlt/radix-engine-toolkit'
import clsx from 'clsx'
import { useKnownAddresses } from 'packages/ui/src/hooks/dapp/use-known-addresses'
import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { FallbackLoading } from 'ui/src/components/fallback-renderer'
import { ResourceSnippet } from 'ui/src/components/snippet/resource'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Text } from 'ui/src/components/typography'
import { useEntityDetails } from 'ui/src/hooks/dapp/use-entity-details'
import type { ResourceBalance, ResourceBalanceKind, ResourceBalanceType } from 'ui/src/types'

import * as styles from './styles.css'

const ZERO = decimal(0).value

const getStakedAmount = (data: StateEntityDetailsResponseItem, knownAddresses: KnownAddresses) =>
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

// pending_xrd_withdraw_vault

interface IProps {
	row?: { original: ResourceBalanceKind }
}

export const ValidatorLiquidityCell: React.FC<IProps> = props => {
	const {
		row: { original },
	} = props
	const { validator, amount, address } = original as ResourceBalance[ResourceBalanceType.FUNGIBLE]

	const intl = useIntl()
	const { data: knownAddresses, isLoading: isLoadingKnownAddresses } = useKnownAddresses()
	const { data: tokenData, isLoading: isLoadingUnit } = useEntityDetails(address)
	const { data, isLoading } = useEntityDetails(validator)

	const liq = useMemo(() => {
		const stakedAmount = getStakedAmount(data, knownAddresses)

		return decimal(amount)
			.value.div((tokenData?.details as StateEntityDetailsResponseFungibleResourceDetails)?.total_supply || 0)
			.mul(stakedAmount)
	}, [data, knownAddresses])

	if (isLoading || isLoadingUnit || isLoadingKnownAddresses) return <FallbackLoading />

	if (tokenData?.details.type === 'NonFungibleResource') {
		return (
			<Box className={styles.assetStatisticCellWrapper}>
				<Box className={clsx(styles.assetStatisticCellContentWrapper, 'td-cell')}>
					<ToolTip message={amount}>
						<Box display="flex" gap="xsmall" width="full">
							<Box display="flex" flexShrink={0}>
								<ResourceSnippet address={address} size="small" /> &nbsp;-{' '}
							</Box>
							<Text size="small" color="strong" truncate>
								{intl.formatNumber(Number.parseFloat(amount), {
									style: 'decimal',
									maximumFractionDigits: 18,
								})}
							</Text>
						</Box>
					</ToolTip>
				</Box>
			</Box>
		)
	}

	return (
		<Box className={styles.assetStatisticCellWrapper}>
			<Box className={clsx(styles.assetStatisticCellContentWrapper, 'td-cell')}>
				<ToolTip message={amount}>
					<Box display="flex" gap="xsmall" width="full">
						<Box display="flex" flexShrink={0}>
							<ResourceSnippet address={address} size="small" /> &nbsp;-{' '}
						</Box>
						<Text size="small" color="strong" truncate>
							{intl.formatNumber(Number.parseFloat(amount), {
								style: 'decimal',
								maximumFractionDigits: 18,
							})}
						</Text>
					</Box>
				</ToolTip>
				<ToolTip message={liq.toString()}>
					<Box display="flex" gap="xsmall" width="full">
						<Box display="flex" flexShrink={0}>
							<ResourceSnippet address={knownAddresses.resourceAddresses.xrd} size="small" /> &nbsp;-{' '}
						</Box>
						<Text size="small" color="strong" truncate>
							{intl.formatNumber(liq.toNumber(), {
								style: 'decimal',
								maximumFractionDigits: 18,
							})}
						</Text>
					</Box>
				</ToolTip>
			</Box>
		</Box>
	)
}
