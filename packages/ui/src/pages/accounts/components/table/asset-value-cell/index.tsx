import clsx from 'clsx'
import React from 'react'
import { useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Text } from 'ui/src/components/typography'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'

import * as styles from './styles.css'

interface IProps {
	value?: number
}

export const AssetValueCell: React.FC<IProps> = props => {
	const intl = useIntl()

	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))

	const { value } = props

	if (!value) return null

	const formattedValue = intl.formatNumber(value, {
		style: 'currency',
		currency,
	})

	return (
		<Box className={styles.assetStatisticCellWrapper}>
			<Box className={clsx(styles.assetStatisticCellContentWrapper, 'td-cell')}>
				<ToolTip message={formattedValue}>
					<Box>
						<Text size="small" color="strong" truncate>
							{formattedValue}
						</Text>
					</Box>
				</ToolTip>
			</Box>
		</Box>
	)
}
