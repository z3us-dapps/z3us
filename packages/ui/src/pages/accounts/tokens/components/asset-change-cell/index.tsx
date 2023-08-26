import type BigNumber from 'bignumber.js'
import clsx from 'clsx'
import { formatChange } from 'packages/ui/src/utils/formatters'
import React from 'react'

import { Box } from 'ui/src/components/box'
import { Text } from 'ui/src/components/typography'

import * as styles from './styles.css'

interface IProps {
	value?: BigNumber
}

export const AssetChangeCell: React.FC<IProps> = props => {
	const { value } = props

	return (
		<Box className={styles.assetStatisticCellWrapper}>
			<Box className={clsx(styles.assetStatisticCellContentWrapper, 'td-cell')}>
				<Text size="small" color={value && value.gt(0) ? 'green' : 'red'} truncate>
					{formatChange(value)}
				</Text>
			</Box>
		</Box>
	)
}
