import React from 'react'

import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'

import * as styles from './chart-tool-tip.css'

type IChartToolTipProps = {
	name: string
	value: string
}

export const ChartToolTip: React.FC<IChartToolTipProps> = props => {
	const { name, value } = props

	return (
		<Box className={styles.chartTooltipWrapper}>
			<Box display="flex" alignItems="center" gap="small">
				<Box className={styles.chartTooltipColorCircle} />
				<Text size="xsmall" color="strong">
					{name}
				</Text>
			</Box>
			<Text size="xsmall">{value}</Text>
		</Box>
	)
}
