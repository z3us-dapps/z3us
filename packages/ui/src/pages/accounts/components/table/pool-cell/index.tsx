import clsx from 'clsx'
import React from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { FallbackLoading } from 'ui/src/components/fallback-renderer'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import { Text } from 'ui/src/components/typography'
import { useEntitiesDetails, useEntityDetails } from 'ui/src/hooks/dapp/use-entity-details'
import { findMetadataValue } from 'ui/src/services/metadata'

import * as styles from './styles.css'

const messages = defineMessages({
	unknown: {
		id: 'EqfQEG',
		defaultMessage: `{hasName, select,
			true {{name}}
			other {Unknown}
		}`,
	},
})

interface IProps {
	value?: string
	// row?: { original: ResourceBalance[ResourceBalanceType.POOL_UNIT] }
}

export const PoolCell: React.FC<IProps> = props => {
	const { value } = props

	const intl = useIntl()
	const { data, isLoading } = useEntityDetails(value)
	const { data: entities, isLoading: isLoadingResources } = useEntitiesDetails(
		data?.details?.type === 'Component'
			? (data?.details?.state as any)?.vaults.map(vault => vault.resource_address) || []
			: [],
	)

	const name = findMetadataValue('name', data?.metadata?.items)
	const symbols = entities?.map(entity => findMetadataValue('symbol', entity?.metadata?.items).toUpperCase()) || []

	if (isLoading || isLoadingResources) return <FallbackLoading />

	return (
		<Box className={styles.assetNameCellWrapper}>
			<Box className={clsx(styles.assetNameCellContentWrapper, 'td-cell')}>
				<ResourceImageIcon size={{ mobile: 'large', tablet: 'xlarge' }} address={value} />
				<Box className={styles.assetNameCellStatsWrapper}>
					<Box className={styles.assetNameCellNameWrapper}>
						<Text capitalizeFirstLetter size="small" color="strong" truncate weight="medium">
							{`${intl.formatMessage(messages.unknown, { hasName: !!name, name })} (${symbols.join(', ')})`}
						</Text>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}
