import clsx from 'clsx'
import React from 'react'
import { useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { Text } from 'ui/src/components/typography'

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
				<Text size="small" color="strong" truncate>
					{value &&
						intl.formatNumber(value, {
							style: 'decimal',
							maximumFractionDigits: 8,
						})}
				</Text>
			</Box>
		</Box>
	)
}
