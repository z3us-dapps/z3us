import clsx from 'clsx'
import React from 'react'
import { useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Text } from 'ui/src/components/typography'
import { DECIMAL_STYLES } from 'ui/src/constants/number'

import * as styles from './styles.css'

interface IProps {
	value?: number
}

export const AssetAmountCell: React.FC<IProps> = props => {
	const intl = useIntl()

	const { value } = props

	return (
		<Box className={styles.assetStatisticCellWrapper}>
			<Box className={clsx(styles.assetStatisticCellContentWrapper, 'td-cell')}>
				<ToolTip message={value}>
					<Box>
						<Text size="small" color="strong" truncate>
							{value ? intl.formatNumber(value, DECIMAL_STYLES) : ''}
						</Text>
					</Box>
				</ToolTip>
			</Box>
		</Box>
	)
}
