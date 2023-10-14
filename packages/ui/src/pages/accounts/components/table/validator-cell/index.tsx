import clsx from 'clsx'
import React from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { FallbackLoading } from 'ui/src/components/fallback-renderer'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import { Text } from 'ui/src/components/typography'
import { useEntityDetails } from 'ui/src/hooks/dapp/use-entity-details'
import { useIsMobileWidth } from 'ui/src/hooks/use-is-mobile'
import { getStringMetadata } from 'ui/src/services/metadata'
import type { ResourceBalance, ResourceBalanceType } from 'ui/src/types'

import * as styles from './styles.css'

const messages = defineMessages({
	unknown: {
		id: 'accounts.table.validator_cell.unknown',
		defaultMessage: `{hasName, select,
			true {{name}}
			other {Unknown}
		}`,
	},
})

interface IProps {
	value?: string
	row?: { original: ResourceBalance[ResourceBalanceType.LIQUIDITY_POOL_TOKEN] }
}

export const ValidatorCell: React.FC<IProps> = props => {
	const {
		value,
		row: { original },
	} = props
	const { symbol, validator } = original

	const intl = useIntl()
	const isMobile = useIsMobileWidth()
	const { data, isLoading } = useEntityDetails(validator)

	const name = getStringMetadata('name', data?.metadata?.items)

	if (isLoading) return <FallbackLoading />

	return (
		<Box className={styles.assetNameCellWrapper}>
			<Box className={clsx(styles.assetNameCellContentWrapper, 'td-cell')}>
				<ResourceImageIcon size={isMobile ? 'large' : 'xlarge'} address={value} />
				<Box className={styles.assetNameCellStatsWrapper}>
					<Box className={styles.assetNameCellNameWrapper}>
						<Text capitalizeFirstLetter size="small" color="strong" truncate weight="medium">
							{symbol && `${symbol.toUpperCase()} - `}
							{intl.formatMessage(messages.unknown, { hasName: !!name, name })}
						</Text>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}
