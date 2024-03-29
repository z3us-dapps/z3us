import type {
	FungibleResourcesCollectionItemVaultAggregated,
	StateEntityDetailsResponseFungibleResourceDetails,
} from '@radixdlt/babylon-gateway-api-sdk'
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
import type { ResourceBalance, ResourceBalanceKind, ResourceBalanceType } from 'ui/src/types'

import * as styles from '../styles.css'

interface IProps {
	row?: { original: ResourceBalanceKind }
}

export const PoolLiquidityCell: React.FC<IProps> = props => {
	const {
		row: { original },
	} = props
	const { pool, amount, address } = original as ResourceBalance[ResourceBalanceType.FUNGIBLE]

	const intl = useIntl()
	const { data: tokenData, isLoading: isLoadingUnit } = useEntityDetails(address)
	const { data, isLoading } = useEntityDetails(pool)

	const poolResourceAmounts = useMemo(
		() =>
			data?.fungible_resources.items.reduce(
				(m, { resource_address, vaults }: FungibleResourcesCollectionItemVaultAggregated) => {
					m[resource_address] = vaults.items
						.reduce((sum, { amount: vaultAmount }) => sum.add(decimal(vaultAmount).value), decimal(0).value)
						.add(m[resource_address] || 0)

					return m
				},
				{},
			),
		[data],
	)

	const fraction = useMemo(
		() =>
			decimal(amount).value.div(
				(tokenData?.details as StateEntityDetailsResponseFungibleResourceDetails)?.total_supply || 0,
			),
		[amount, tokenData],
	)

	if (isLoading || isLoadingUnit) return <FallbackLoading />

	return (
		<Box className={styles.cellWrapper}>
			<Box className={clsx(styles.cellContentWrapper, 'td-cell')}>
				<Box display="flex" flexDirection="column">
					{Object.keys(poolResourceAmounts).map(resourceAddress => (
						<ToolTip key={resourceAddress} message={fraction.mul(poolResourceAmounts[resourceAddress]).toString()}>
							<Box display="flex" gap="xsmall" width="full">
								<Box display="flex" flexShrink={0}>
									<ResourceSnippet address={resourceAddress} size="small" /> &nbsp;-{' '}
								</Box>
								<Text size="small" color="strong" truncate>
									{intl.formatNumber(fraction.mul(poolResourceAmounts[resourceAddress]).toNumber(), DECIMAL_STYLES)}
								</Text>
							</Box>
						</ToolTip>
					))}
				</Box>
			</Box>
		</Box>
	)
}
