/* eslint-disable  @typescript-eslint/no-unused-vars */
import { useAccountParam, useAssetParam } from 'packages/ui/src/hooks/use-params'
import React, { useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, type TooltipProps, XAxis, YAxis } from 'recharts'

import { Box } from 'ui/src/components/box'
import { CardButtons } from 'ui/src/components/card-buttons'
import { ChartToolTip } from 'ui/src/components/chart-tool-tip'
import { Close2Icon } from 'ui/src/components/icons'
import { Button } from 'ui/src/components/router-button'
import { ToolTip } from 'ui/src/components/tool-tip'
import { TransactionIcon } from 'ui/src/components/transaction-icon'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'

import * as styles from './account-asset-info.css'

interface IAccountAssetInfoProps {}

const data = [
	{
		name: 'Page A',
		uv: 4000,
		pv: 2400,
		amt: 2400,
	},
	{
		name: 'Page B',
		uv: 3000,
		pv: 1398,
		amt: 2210,
	},
	{
		name: 'Page C',
		uv: 2000,
		pv: 9800,
		amt: 2290,
	},
	{
		name: 'Page D',
		uv: 2780,
		pv: 3908,
		amt: 2000,
	},
	{
		name: 'Page E',
		uv: 1890,
		pv: 4800,
		amt: 2181,
	},
	{
		name: 'Page F',
		uv: 2390,
		pv: 3800,
		amt: 2500,
	},
	{
		name: 'Page G',
		uv: 3490,
		pv: 4300,
		amt: 2100,
	},
]

export const AccountAssetInfo: React.FC<IAccountAssetInfoProps> = () => {
	const { assetType } = useParams()
	const account = useAccountParam()
	const asset = useAssetParam()

	if (!asset) {
		return null
	}

	const renderTooltipContent = ({ active, payload }) => {
		if (active && payload && payload.length) {
			const dataItem = payload[0].payload

			return <ChartToolTip name={dataItem.name} value={dataItem.amt} />
		}

		return null
	}

	return (
		<Box flexShrink={0}>
			<Box display="flex" flexDirection="column" alignItems="center">
				<Box className={styles.assetCloseBtnWrapper}>
					<ToolTip message={<Translation capitalizeFirstLetter text="global.back" />}>
						<Button iconOnly styleVariant="ghost" sizeVariant="small" to={`/accounts/${account}/${assetType}`}>
							<Close2Icon />
						</Button>
					</ToolTip>
				</Box>
				<Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
					<Box paddingBottom="small">
						<TransactionIcon transactionIconSize="large" />
					</Box>
					<Text size="large" color="strong">
						Bitcoin
					</Text>
					<Text size="xxxlarge" weight="medium" color="strong">
						$12,424
					</Text>
					<Text size="xlarge">+4,345 (13.3%)</Text>
				</Box>
				<Box display="flex" paddingTop="large" gap="large" position="relative" paddingBottom="large">
					<CardButtons />
				</Box>
				<Box className={styles.chartBgWrapper}>
					<ResponsiveContainer width="100%" height="100%">
						<AreaChart
							width={500}
							height={400}
							data={data}
							margin={{
								top: 10,
								right: 0,
								left: 0,
								bottom: 0,
							}}
						>
							{/* <CartesianGrid strokeDasharray="3 3" /> */}
							{/* <XAxis dataKey="name" /> */}
							{/* <YAxis /> */}
							<defs>
								<linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
									<stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
									<stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
								</linearGradient>
							</defs>
							<Area
								// type="linear"
								type="monotone"
								dataKey="uv"
								stroke="#8884d8"
								fill="url(#areaGradient)"
								strokeWidth={3} // Adjust the stroke width here
							/>
							<Tooltip content={renderTooltipContent} cursor={false} />
						</AreaChart>
					</ResponsiveContainer>
				</Box>
				<Box className={styles.assetChartBtnsWrapper}>
					{[
						{ id: '1W', title: '1W' },
						{ id: '1M', title: '1M' },
						{ id: '3M', title: '3M' },
						{ id: '6M', title: '6M' },
						{ id: '1Y', title: '1Y' },
						{ id: 'all', title: 'All' },
					].map(({ id, title }) => (
						<Button
							key={id}
							rounded
							styleVariant={id === 'all' ? 'secondary' : 'tertiary'}
							sizeVariant="small"
							onClick={() => {}}
						>
							{title}
						</Button>
					))}
				</Box>
			</Box>
		</Box>
	)
}
