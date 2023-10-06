import type BigNumber from 'bignumber.js'
import clsx from 'clsx'
import React from 'react'
import { FormattedNumber } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { Text } from 'ui/src/components/typography'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'

import * as styles from './styles.css'

interface IProps {
	value?: BigNumber
}

export const AssetValueCell: React.FC<IProps> = props => {
	const { value } = props

	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))

	return (
		<Box className={styles.assetStatisticCellWrapper}>
			<Box className={clsx(styles.assetStatisticCellContentWrapper, 'td-cell')}>
				<Text size="small" color="strong" truncate>
					{value && <FormattedNumber value={value.toNumber()} style="currency" currency={currency} />}
				</Text>
			</Box>
		</Box>
	)
}
