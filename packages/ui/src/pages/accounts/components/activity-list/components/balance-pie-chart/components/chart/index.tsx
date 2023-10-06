import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import useMeasure from 'react-use-measure'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

import { Box } from 'ui/src/components/box'
import { ChartToolTip } from 'ui/src/components/chart-tool-tip'
import { useIsMobileWidth } from 'ui/src/hooks/use-is-mobile'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'

const COLORS = [
	{ start: '#9e54ed', end: '#5c4cb6' },
	{ start: '#34c3ff', end: '#2876bd' },
	{ start: '#da9d35', end: '#e96935' },
]

type Data = {
	address: string
	name: string
	value: number
}

interface IProps {
	data: Data[]
}

export const Chart: React.FC<IProps> = ({ data }) => {
	const [measureRef, { width: chartWidth }] = useMeasure()
	const intl = useIntl()

	const isMobile = useIsMobileWidth()
	const { currency } = useNoneSharedStore(state => ({ currency: state.currency }))
	const [hoveredCellIndex, setHoveredCellIndex] = useState<number>(-1)

	const renderCustomTooltip = ({ payload }) => {
		if (payload && payload.length) {
			const { name, value } = payload[0].payload

			return <ChartToolTip name={name} value={intl.formatNumber(value, { style: 'currency', currency })} />
		}
		return null
	}

	return (
		<Box width="full" height="full" ref={measureRef}>
			<ResponsiveContainer width="99%">
				<PieChart>
					<defs>
						{data.map((entry, index) => (
							<linearGradient key={entry.address} id={`myGradient${index}`}>
								<stop offset="0%" stopColor={COLORS[index % COLORS.length].start} />
								<stop offset="100%" stopColor={COLORS[index % COLORS.length].end} />
							</linearGradient>
						))}
					</defs>
					<Pie
						dataKey="value"
						startAngle={0}
						endAngle={360}
						data={data}
						cx="50%"
						cy="50%"
						outerRadius={isMobile ? chartWidth * 0.27 : 100}
						innerRadius={isMobile ? chartWidth * 0.1 : 30}
						isAnimationActive={false}
					>
						{data.map((entry, index) => (
							<Cell
								key={`cell-${entry.address}`}
								fill={`url(#myGradient${index})`}
								stroke={COLORS[index % COLORS.length].start}
								strokeWidth={index === hoveredCellIndex ? 2 : 1}
								style={{
									filter: `drop-shadow(0px 0px ${index === hoveredCellIndex ? '4' : '0'}px ${
										COLORS[index % COLORS.length].start
									}`,
								}}
								onMouseOver={() => setHoveredCellIndex(index)}
								onMouseOut={() => setHoveredCellIndex(-1)}
							/>
						))}
					</Pie>
					<Tooltip content={renderCustomTooltip} />
				</PieChart>
			</ResponsiveContainer>
		</Box>
	)
}
