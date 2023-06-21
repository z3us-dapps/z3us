/* eslint-disable */
// @ts-nocheck
// TODO: fix

/* eslint-disable  @typescript-eslint/no-unused-vars, react/no-array-index-key */
import clsx, { type ClassValue } from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import useMeasure from 'react-use-measure'
import { Cell, Pie, PieChart, ResponsiveContainer, Sector, Tooltip } from 'recharts'
import { useTimeout } from 'usehooks-ts'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { ChartToolTip } from 'ui/src/components/chart-tool-tip'
import { CopyAddressButton } from 'ui/src/components/copy-address-button'
import { HeightAnimatePanel } from 'ui/src/components/height-animate-panel'
import { ArrowLeftIcon, ArrowRightIcon, Close2Icon } from 'ui/src/components/icons'
import { ToolTip } from 'ui/src/components/tool-tip'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
import { Z3usLoading } from 'ui/src/components/z3us-loading'
import { ACCOUNTS_ALL, animtePageVariants } from 'ui/src/containers/accounts/constants'
import { useAccountParams } from 'ui/src/hooks/use-account-params'
import { getShortAddress } from 'ui/src/utils/string-utils'

import * as styles from './account-all-chart.css'
import { AllAccountListRow } from './all-account-list-row'

interface IAccountAllChartProps {}

const COLORS = [
	{ start: '#9e54ed', end: '#5c4cb6' },
	{ start: '#34c3ff', end: '#2876bd' },
	{ start: '#da9d35', end: '#e96935' },
]

const data = [
	{ name: '1', value: 150 },
	{ name: '2', value: 200 },
	{ name: '3', value: 250 },
]

export const AccountAllChart: React.FC<IAccountAllChartProps> = props => {
	const { account, assetType } = useAccountParams()
	const [loaded, setLoaded] = useState<boolean>(false)
	const [showFullAccountList, setShowFullAccountList] = useState<boolean>(false)
	const [hoveredCellIndex, setHoveredCellIndex] = useState<number>(-1)
	const isAllAccount = account === ACCOUNTS_ALL
	// const [measureRef, { width: chartWrapperWidth, height: chartWrapperHeight }] = useMeasure()

	// TODO: temp
	const accountAddress =
		'ardx1qspt0lthflcd45zhwvrxkqdrv5ne5avsgarjcpfatyw7n7n93v38dhcdtlag0sdfalksjdhf7d8f78d7f8d7f8d7f8d7f'

	useTimeout(() => {
		setLoaded(true)
	}, 1000)

	if (!isAllAccount || assetType) {
		return null
	}

	const renderCustomTooltip = ({ payload }) => {
		if (payload && payload.length) {
			const { name, value } = payload[0].payload

			return <ChartToolTip name={name} value={value} />
		}
		return null
	}

	const handleToggleFullAccountList = () => {
		setShowFullAccountList(!showFullAccountList)
	}

	return (
		<Box className={styles.allChartWrapper}>
			<Box className={styles.allChartInnerWrapper}>
				<AnimatePresence initial={false}>
					{!loaded && (
						<motion.div
							className={clsx(styles.motionWrapper, styles.chartLoadingWrapper)}
							initial="hidden"
							animate="visible"
							variants={animtePageVariants}
						>
							<Z3usLoading message="Loading" />
						</motion.div>
					)}
				</AnimatePresence>
				<AnimatePresence initial={false}>
					{loaded && (
						<motion.div
							className={styles.motionWrapper}
							initial="hidden"
							animate="visible"
							variants={animtePageVariants}
						>
							<Box className={styles.pieChartWrapper}>
								<ResponsiveContainer width="100%" height="100%">
									<PieChart width={400} height={400}>
										<defs>
											{data.map((entry, index) => (
												<linearGradient key={entry.name} id={`myGradient${index}`}>
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
											outerRadius={100}
											innerRadius={40}
											isAnimationActive={false} // Disable initial animation on mount
										>
											{data.map((entry, index) => (
												<Cell
													key={`cell-${index}`}
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
							<Box className={styles.accountsListWrapper}>
								<Box display="flex" flexDirection="column" gap="xsmall" width="full">
									<HeightAnimatePanel>
										<Box>
											{[...Array(showFullAccountList ? 10 : 3)].map((x, i) => (
												// eslint-disable-next-line
												<AllAccountListRow key={i} />
											))}
										</Box>
									</HeightAnimatePanel>
								</Box>
								<Box display="flex" flexDirection="column" gap="xsmall" width="full" paddingTop="medium">
									<Button styleVariant="tertiary" onClick={handleToggleFullAccountList}>
										{showFullAccountList ? 'Show less accounts' : 'Show all accounts'}
									</Button>
								</Box>
							</Box>
						</motion.div>
					)}
				</AnimatePresence>
			</Box>
		</Box>
	)
}
