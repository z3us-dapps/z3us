import clsx from 'clsx'
import Loader from 'packages/ui/src/components/loader'
import { useEntitiesDetails, useEntityDetails } from 'packages/ui/src/hooks/dapp/use-entity-details'
import { getStringMetadata } from 'packages/ui/src/services/metadata'
import React from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import { Text } from 'ui/src/components/typography'
import { useIsMobileWidth } from 'ui/src/hooks/use-is-mobile'
import type { ResourceBalance, ResourceBalanceKind, ResourceBalanceType } from 'ui/src/types/types'

import * as styles from './styles.css'

const messages = defineMessages({
	unknown: {
		id: 'accounts.table.pool_cell.unknown',
		defaultMessage: 'Unknown',
	},
})

interface IProps {
	value?: string
	row?: { original: ResourceBalance[ResourceBalanceType.POOL_UNIT] }
}

export const PoolCell: React.FC<IProps> = props => {
	const {
		value,
		row: { original },
	} = props
	const { pool } = original

	const intl = useIntl()
	const isMobile = useIsMobileWidth()
	const { data, isLoading } = useEntityDetails(pool)
	const { data: entities, isLoading: isLoadingResources } = useEntitiesDetails(
		data?.details?.state?.vaults.map(vault => vault.resource_address),
	)

	const name = getStringMetadata('name', data?.metadata?.items) || intl.formatMessage(messages.unknown)
	const symbols = entities?.map(entity => getStringMetadata('symbol', entity?.metadata?.items).toUpperCase()) || []

	if (isLoading || isLoadingResources) return <Loader />

	return (
		<Box className={styles.assetNameCellWrapper}>
			<Box className={clsx(styles.assetNameCellContentWrapper, 'td-cell')}>
				<ResourceImageIcon size={isMobile ? 'large' : 'xlarge'} address={value} />
				<Box className={styles.assetNameCellStatsWrapper}>
					<Box className={styles.assetNameCellNameWrapper}>
						<Text className="tr-text-elem" capitalizeFirstLetter size="small" color="strong" truncate weight="medium">
							{`${name} (${symbols.join(', ')})`}
						</Text>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}
