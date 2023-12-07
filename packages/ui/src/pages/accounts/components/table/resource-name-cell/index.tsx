import clsx from 'clsx'
import React from 'react'
import { useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Text } from 'ui/src/components/typography'
import { DECIMAL_STYLES } from 'ui/src/constants/number'
import type { ResourceBalance, ResourceBalanceKind, ResourceBalanceType } from 'ui/src/types'

import * as styles from '../styles.css'

interface IProps {
	value?: string
	row?: { original: ResourceBalanceKind }
}

export const ResourceNameCell: React.FC<IProps> = props => {
	const {
		value,
		row: { original },
	} = props

	const { symbol, name, amount } = original as ResourceBalance[ResourceBalanceType.FUNGIBLE]

	const intl = useIntl()
	const displayName = symbol ? `${symbol.toUpperCase()} - ${name}` : name

	return (
		<Box className={styles.cellWrapper}>
			<Box className={clsx(styles.cellContentWrapper, 'td-cell')}>
				<ResourceImageIcon size={{ mobile: 'large', tablet: 'large' }} address={value} toolTipEnabled />
				<Box display="flex" flexDirection="column">
					<ToolTip side="top" message={displayName}>
						<Box>
							<Text capitalizeFirstLetter size="small" color="strong" truncate weight="medium">
								{displayName}
							</Text>
						</Box>
					</ToolTip>
					<ToolTip side="top" message={amount}>
						<Box>
							<Text capitalizeFirstLetter size="xsmall" truncate>
								{intl.formatNumber(Number.parseFloat(amount), DECIMAL_STYLES)}
							</Text>
						</Box>
					</ToolTip>
				</Box>
			</Box>
		</Box>
	)
}
