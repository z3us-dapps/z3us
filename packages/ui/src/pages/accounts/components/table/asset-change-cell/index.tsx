import clsx from 'clsx'
import React from 'react'
import { useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { ToolTip } from 'ui/src/components/tool-tip'
import { RedGreenText } from 'ui/src/components/typography'
import { PERCENTAGE_STYLES } from 'ui/src/constants/number'

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
					<RedGreenText size="small" change={value} truncate>
						{intl.formatNumber(value, { signDisplay: 'exceptZero', ...PERCENTAGE_STYLES })}
					</RedGreenText>
				</Box>
			</ToolTip>
		</Box>
	)
}
