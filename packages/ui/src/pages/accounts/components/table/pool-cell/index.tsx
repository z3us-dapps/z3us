import clsx from 'clsx'
import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { FallbackLoading } from 'ui/src/components/fallback-renderer'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import { ResourceSnippet } from 'ui/src/components/snippet/resource'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Text } from 'ui/src/components/typography'
import { useEntityDetails } from 'ui/src/hooks/dapp/use-entity-details'
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
	const { pool, amount } = original as ResourceBalance[ResourceBalanceType.FUNGIBLE]

	const intl = useIntl()

	const { data } = useEntityDetails(pool)
	const { data: poolData, isLoading } = useEntityDetails(value)

	const name = findMetadataValue('name', poolData?.metadata?.items)
	const resources = useMemo(
		() =>
			data?.details?.type === 'Component'
				? (data?.details?.state as any)?.vaults.map(vault => vault.resource_address) || []
				: [],
		[data],
	)

	if (isLoading) return <FallbackLoading />

	return (
		<Box className={styles.assetNameCellWrapper}>
			<Box className={clsx(styles.assetNameCellContentWrapper, 'td-cell')}>
				<ResourceImageIcon size={{ mobile: 'large', tablet: 'xlarge' }} address={poolData?.address} />
				<Box className={styles.assetNameCellStatsWrapper}>
					<Box className={styles.assetNameCellNameWrapper}>
						<ToolTip side="top" message={name}>
							<Box>
								<Text capitalizeFirstLetter size="small" color="strong" truncate weight="medium">
									{name}
								</Text>
							</Box>
						</ToolTip>
						{amount && (
							<Box>
								<Text
									capitalizeFirstLetter
									size="xsmall"
									truncate
									weight="strong"
									className={styles.assetNameCellBalanceWrapper}
								>
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
							{resources.map(resource => (
								<ResourceSnippet key={resource} address={resource} size="small" />
							))}
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}
