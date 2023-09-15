import React, { useState } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

import { ChartToolTip } from 'ui/src/components/chart-tool-tip'
import type { ResourceBalance, ResourceBalanceKind, ResourceBalanceType } from 'ui/src/types/types'

const COLORS = [
	{ start: '#9e54ed', end: '#5c4cb6' },
	{ start: '#34c3ff', end: '#2876bd' },
	{ start: '#da9d35', end: '#e96935' },
]

interface IProps {
	balances: ResourceBalanceKind[]
}

export const Chart: React.FC<IProps> = ({ balances }) => {
	const [hoveredCellIndex, setHoveredCellIndex] = useState<number>(-1)

	const renderCustomTooltip = ({ payload }) => {
		if (payload && payload.length) {
			const { name, value } = payload[0].payload

			return <ChartToolTip name={name} value={value} />
		}
		return null
	}

	return (
		<ResponsiveContainer width="100%" height="100%">
			<PieChart width={400} height={400}>
				<defs>
					{balances.map((entry, index) => (
						<linearGradient key={entry.address} id={`myGradient${index}`}>
							<stop offset="0%" stopColor={COLORS[COLORS.length % index].start} />
							<stop offset="100%" stopColor={COLORS[COLORS.length % index].end} />
						</linearGradient>
					))}
				</defs>
				<Pie
					dataKey="value"
					startAngle={0}
					endAngle={360}
					data={balances.map(resource => ({
						name: (resource as ResourceBalance[ResourceBalanceType.FUNGIBLE]).symbol || resource.name || 'Unknown', // @TODO: need a component here {resource address + amount}
						value: resource.value.toNumber(),
					}))}
					cx="50%"
					cy="50%"
					outerRadius={100}
					innerRadius={40}
					isAnimationActive={false} // Disable initial animation on mount
				>
					{balances.map((entry, index) => (
						<Cell
							key={`cell-${entry.address}`}
							fill={`url(#myGradient${index})`}
							stroke={COLORS[COLORS.length % index].start}
							strokeWidth={index === hoveredCellIndex ? 2 : 1}
							style={{
								filter: `drop-shadow(0px 0px ${index === hoveredCellIndex ? '4' : '0'}px ${
									COLORS[COLORS.length % index].start
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
	)
}
