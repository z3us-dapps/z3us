import type BigNumber from 'bignumber.js'
import clsx from 'clsx'
import React from 'react'
import { FormattedNumber } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { Text } from 'ui/src/components/typography'

import * as styles from './styles.css'

interface IProps {
	value?: BigNumber
}

export const AssetAmountCell: React.FC<IProps> = props => {
	const { value } = props

	return (
		<Box className={styles.assetStatisticCellWrapper}>
			<Box className={clsx(styles.assetStatisticCellContentWrapper, 'td-cell')}>
				<Text size="small" color="strong" truncate>
					{value && <FormattedNumber value={value.toNumber()} style="currency" maximumFractionDigits={8} />}
				</Text>
			</Box>
		</Box>
	)
}
