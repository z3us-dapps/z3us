import clsx from 'clsx'
import React from 'react'
import { useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { ToolTip } from 'ui/src/components/tool-tip'
import { RedGreenText, Text } from 'ui/src/components/typography'
import { CURRENCY_STYLES, PERCENTAGE_STYLES } from 'ui/src/constants/number'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import type { ResourceBalance, ResourceBalanceKind, ResourceBalanceType } from 'ui/src/types'

import * as styles from '../styles.css'

interface IProps {
	value?: number
	row?: { original: ResourceBalanceKind }
}

export const ResourceValueCell: React.FC<IProps> = props => {
	const intl = useIntl()

	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))

	const {
		value,
		row: { original },
	} = props

	const { change } = original as ResourceBalance[ResourceBalanceType.FUNGIBLE]

	if (!value) return null

	return (
		<Box className={styles.cellWrapper}>
			<Box className={clsx(styles.cellContentWrapper, 'td-cell')}>
				<Box display="flex" flexDirection="column">
					<ToolTip message={value}>
						<Box>
							<Text size="small" color="strong" weight="medium" align="right" truncate>
								{intl.formatNumber(value, { currency, ...CURRENCY_STYLES })}
							</Text>
						</Box>
					</ToolTip>
					<RedGreenText
						change={change}
						capitalizeFirstLetter
						size="xsmall"
						color="strong"
						truncate
						weight="medium"
						align="right"
					>
						{change && intl.formatNumber(change, { signDisplay: 'exceptZero', ...PERCENTAGE_STYLES })}
					</RedGreenText>
				</Box>
			</Box>
		</Box>
	)
}
