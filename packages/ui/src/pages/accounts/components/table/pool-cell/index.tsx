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
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import { ResourceSnippet } from 'ui/src/components/snippet/resource'
import { ToolTip } from 'ui/src/components/tool-tip'
import { RedGreenText, Text } from 'ui/src/components/typography'
import { useEntityDetails } from 'ui/src/hooks/dapp/use-entity-details'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import { findMetadataValue } from 'ui/src/services/metadata'
import type { ResourceBalance, ResourceBalanceKind, ResourceBalanceType } from 'ui/src/types'

import * as styles from './styles.css'

interface IProps {
	value?: string
	row?: { original: ResourceBalanceKind }
}

export const PoolCell: React.FC<IProps> = props => {
	const {
		value,
		row: { original },
	} = props
	const { pool, amount, change, value: tokenValue } = original as ResourceBalance[ResourceBalanceType.FUNGIBLE]

	const intl = useIntl()
	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))

	const { data: tokenData, isLoading } = useEntityDetails(value)
	const { data, isLoading: isLoadingPool } = useEntityDetails(pool)

	const name = findMetadataValue('name', tokenData?.metadata?.items)

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

	if (isLoading || isLoadingPool) return <FallbackLoading />

	return (
		<Box className={styles.assetNameCellWrapper}>
			<Box className={clsx(styles.assetNameCellContentWrapper, 'td-cell')}>
				<ResourceImageIcon size={{ mobile: 'large', tablet: 'large' }} address={value} />
				<Box className={styles.assetNameCellStatsWrapper}>
					<Box className={styles.assetNameCellNameWrapper}>
						<ToolTip message={name}>
							<Box>
								<Text capitalizeFirstLetter size="small" color="strong" truncate weight="medium">
									{name}
								</Text>
							</Box>
						</ToolTip>
						{amount && (
							<Box>
								<Text capitalizeFirstLetter size="xsmall" truncate className={styles.assetNameCellBalanceWrapper}>
									{intl.formatNumber(Number.parseFloat(amount), {
										style: 'decimal',
										maximumFractionDigits: 18,
									})}
								</Text>
							</Box>
						)}
					</Box>
					<Box className={styles.assetNameCellPriceWrapper}>
						<Box className={styles.assetNameCellPriceTextWrapper}>
							{Object.keys(poolResourceAmounts).map(resourceAddress => {
								const liq = intl.formatNumber(fraction.mul(poolResourceAmounts[resourceAddress]).toNumber(), {
									style: 'decimal',
									maximumFractionDigits: 18,
								})

								return (
									<ToolTip key={resourceAddress} message={liq}>
										<Box display="flex" gap="xsmall" width="full">
											<Box display="flex" flexShrink={0}>
												<ResourceSnippet address={resourceAddress} size="small" /> &nbsp;-{' '}
											</Box>
											<Text size="small" color="strong" truncate>
												{liq}
											</Text>
										</Box>
									</ToolTip>
								)
							})}
						</Box>
					</Box>
					<Box className={styles.assetNameCellPriceWrapper}>
						<Box className={styles.assetNameCellPriceTextWrapper}>
							<Text capitalizeFirstLetter size="small" color="strong" truncate weight="medium" align="right">
								{tokenValue &&
									intl.formatNumber(tokenValue, {
										style: 'currency',
										currency,
									})}
							</Text>
							<RedGreenText
								change={change}
								capitalizeFirstLetter
								size="xsmall"
								color="strong"
								truncate
								weight="medium"
								align="right"
							>
								{change &&
									intl.formatNumber(change, {
										style: 'percent',
										maximumFractionDigits: 2,
									})}
							</RedGreenText>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}
