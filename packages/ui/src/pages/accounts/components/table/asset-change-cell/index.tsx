import clsx from 'clsx'
import React from 'react'
import { useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Text } from 'ui/src/components/typography'

import * as styles from './styles.css'

interface IProps {
	value?: number
}

export const AssetChangeCell: React.FC<IProps> = props => {
	const intl = useIntl()

	const { value } = props

	return (
		<Box className={styles.assetStatisticCellWrapper}>
			<ToolTip message={value}>
				<Box className={clsx(styles.assetStatisticCellContentWrapper, 'td-cell')}>
					<Text size="small" color={value && value > 0 ? 'green' : 'red'} truncate>
						{intl.formatNumber(value, {
							style: 'percent',
							maximumFractionDigits: 2,
						})}
					</Text>
				</Box>
			</ToolTip>
		</Box>
	)
}
