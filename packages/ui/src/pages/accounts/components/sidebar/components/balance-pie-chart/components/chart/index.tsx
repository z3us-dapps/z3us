import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

import { Box } from 'ui/src/components/box'
import { ChartToolTip } from 'ui/src/components/chart-tool-tip'
import { CURRENCY_STYLES, DECIMAL_STYLES } from 'ui/src/constants/number'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'

const COLORS = [
	{ start: '#9e54ed', end: '#5c4cb6' },
	{ start: '#34c3ff', end: '#2876bd' },
	{ start: '#da9d35', end: '#e96935' },
	{ start: '#D73D82', end: '#E35595' },
	{ start: '#1449EF', end: '#14C8EF' },
	{ start: '#009769', end: '#5AD158' },
	{ start: '#FFABD0', end: '#FFB199' },
	{ start: '#7D16FF', end: '#FF85C7' },
	{ start: '#B53600', end: '#F5568F' },
	{ start: '#FFB7A5', end: '#FFF8B6' },
	{ start: '#FFF4AA', end: '#FFBDBD' },
	{ start: '#F6613A', end: '#F7866A' },
]

type Data = {
	index: number
	address: string
	name: string
	value: number
}

interface IProps {
	format: 'currency' | 'decimal'
	data: Data[]
}

export const Chart: React.FC<IProps> = ({ format, data }) => {
	const intl = useIntl()
	const { currency } = useNoneSharedStore(state => ({ currency: state.currency }))
	const [hoveredCellIndex, setHoveredCellIndex] = useState<number>(-1)

	const renderCustomTooltip = ({ payload }) => {
		if (payload && payload.length) {
			const { name, value, index } = payload[0].payload

			return (
				<ChartToolTip
					color={COLORS[index % COLORS.length].start}
					name={name}
					value={intl.formatNumber(value, format === 'currency' ? { currency, ...CURRENCY_STYLES } : DECIMAL_STYLES)}
				/>
			)
		}
		return null
	}

	return (
		<Box width="full" height="full">
			<ResponsiveContainer width="99%">
				<PieChart>
					<defs>
						{data.map(entry => (
							<linearGradient key={entry.address} id={`myGradient${entry.index}`}>
								<stop offset="0%" stopColor={COLORS[entry.index % COLORS.length].start} />
								<stop offset="100%" stopColor={COLORS[entry.index % COLORS.length].end} />
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
						outerRadius={100}
						innerRadius={40}
						isAnimationActive={false}
					>
						{data.map(entry => (
							<Cell
								key={`cell-${entry.address}`}
								fill={`url(#myGradient${entry.index})`}
								stroke={COLORS[entry.index % COLORS.length].start}
								strokeWidth={entry.index === hoveredCellIndex ? 2 : 1}
								style={{
									filter: `drop-shadow(0px 0px ${entry.index === hoveredCellIndex ? '4' : '0'}px ${
										COLORS[entry.index % COLORS.length].start
									}`,
								}}
								onMouseOver={() => setHoveredCellIndex(entry.index)}
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
