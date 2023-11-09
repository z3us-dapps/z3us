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

export const AssetAmountCell: React.FC<IProps> = props => {
	const intl = useIntl()

	const { value } = props

	const v = value
		? intl.formatNumber(value, {
				style: 'decimal',
				maximumFractionDigits: 18,
		  })
		: ''

	return (
		<Box className={styles.assetStatisticCellWrapper}>
			<Box className={clsx(styles.assetStatisticCellContentWrapper, 'td-cell')}>
				<ToolTip message={v}>
					<Box>
						<Text size="small" color="strong" truncate>
							{v}
						</Text>
					</Box>
				</ToolTip>
			</Box>
		</Box>
	)
}
