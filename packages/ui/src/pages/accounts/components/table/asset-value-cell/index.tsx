import clsx from 'clsx'
import React from 'react'
import { useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Text } from 'ui/src/components/typography'
import { CURRENCY_STYLES, TOOLTIP_CURRENCY_STYLES } from 'ui/src/constants/number'
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

	return (
		<Box className={styles.assetStatisticCellWrapper}>
			<Box className={clsx(styles.assetStatisticCellContentWrapper, 'td-cell')}>
				<ToolTip message={intl.formatNumber(value, { currency, ...TOOLTIP_CURRENCY_STYLES })}>
					<Box>
						<Text size="small" color="strong" truncate>
							{intl.formatNumber(value, { currency, ...CURRENCY_STYLES })}
						</Text>
					</Box>
				</ToolTip>
			</Box>
		</Box>
	)
}
