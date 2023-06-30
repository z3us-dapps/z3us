import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { useGlobalResourceBalances } from 'packages/ui/src/hooks/dapp/use-balances'
import React, { useState } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { useTimeout } from 'usehooks-ts'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { ChartToolTip } from 'ui/src/components/chart-tool-tip'
import { HeightAnimatePanel } from 'ui/src/components/height-animate-panel'
import { Z3usLoading } from 'ui/src/components/z3us-loading'
import { animatePageVariants } from 'ui/src/constants/page'
import { ACCOUNTS_ALL } from 'ui/src/constants/routes'
import { useAccountParams } from 'ui/src/hooks/use-account-params'

import * as styles from './account-all-chart.css'
import { AllAccountListRow } from './all-account-list-row'

const COLORS = [
	{ start: '#9e54ed', end: '#5c4cb6' },
	{ start: '#34c3ff', end: '#2876bd' },
	{ start: '#da9d35', end: '#e96935' },
]

const defaultRowsShown = 3

export const AccountAllChart: React.FC = () => {
	const { account, assetType } = useAccountParams()
	const [loaded, setLoaded] = useState<boolean>(false)
	const [showFullAccountList, setShowFullAccountList] = useState<boolean>(false)
	const [hoveredCellIndex, setHoveredCellIndex] = useState<number>(-1)
	const isAllAccount = account === ACCOUNTS_ALL
	// const [measureRef, { width: chartWrapperWidth, height: chartWrapperHeight }] = useMeasure()

	const { balances, isLoading } = useGlobalResourceBalances(!isAllAccount ? { [account]: true } : null)

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
							variants={animatePageVariants}
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
							variants={animatePageVariants}
						>
							<Box className={styles.pieChartWrapper}>
								<ResponsiveContainer width="100%" height="100%">
									<PieChart width={400} height={400}>
										<defs>
											{balances.map((entry, index) => (
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
											data={balances.map(resource => ({ name: resource.symbol, value: resource.value.toNumber() }))}
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
											{(showFullAccountList ? balances : balances.slice(0, defaultRowsShown)).map(resource => (
												<AllAccountListRow key={resource.address} {...resource} />
											))}
										</Box>
									</HeightAnimatePanel>
								</Box>
								{balances?.length > defaultRowsShown && (
									<Box display="flex" flexDirection="column" gap="xsmall" width="full" paddingTop="medium">
										<Button styleVariant="tertiary" onClick={handleToggleFullAccountList}>
											{showFullAccountList ? 'Show less accounts' : 'Show all accounts'}
										</Button>
									</Box>
								)}
							</Box>
						</motion.div>
					)}
				</AnimatePresence>
			</Box>
		</Box>
	)
}
