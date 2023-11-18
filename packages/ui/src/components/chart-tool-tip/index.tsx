import React from 'react'

import { Box } from 'ui/src/components/box'
import { Text } from 'ui/src/components/typography'

import * as styles from './chart-tool-tip.css'

type IChartToolTipProps = {
	name: string
	value: string
	color: string
}

export const ChartToolTip: React.FC<IChartToolTipProps> = ({ name, value, color }) => (
	<Box className={styles.chartTooltipWrapper}>
		<Box display="flex" alignItems="center" gap="small">
			<Box className={styles.chartTooltipColorCircle} style={{ backgroundColor: color }} />
			<Text size="xsmall" color="strong" truncate>
				{name}
			</Text>
		</Box>
		<Text size="xsmall">{value}</Text>
	</Box>
)
