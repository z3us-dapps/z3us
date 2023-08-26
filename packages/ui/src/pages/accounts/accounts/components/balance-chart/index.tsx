import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { useGlobalResourceBalances } from 'packages/ui/src/hooks/dapp/use-balances'
import React, { useState } from 'react'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { HeightAnimatePanel } from 'ui/src/components/height-animate-panel'
import { Z3usLoading } from 'ui/src/components/z3us-loading'
import { animatePageVariants } from 'ui/src/constants/page'

import { Chart } from './components/chart'
import { ListRow } from './components/list-row'
import * as styles from './styles.css'

const defaultRowsShown = 3

export const BalanceChart: React.FC = () => {
	const [showFullAccountList, setShowFullAccountList] = useState<boolean>(false)
	// const [measureRef, { width: chartWrapperWidth, height: chartWrapperHeight }] = useMeasure()

	const { balances, isLoading } = useGlobalResourceBalances()

	const handleToggleFullAccountList = () => {
		setShowFullAccountList(!showFullAccountList)
	}

	return (
		<Box className={styles.allChartWrapper}>
			<Box className={styles.allChartInnerWrapper}>
				<AnimatePresence initial={false}>
					{isLoading && (
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
					{!isLoading && (
						<motion.div
							className={styles.motionWrapper}
							initial="hidden"
							animate="visible"
							variants={animatePageVariants}
						>
							<Box className={styles.pieChartWrapper}>
								<Chart balances={balances} />
							</Box>
							<Box className={styles.accountsListWrapper}>
								<Box display="flex" flexDirection="column" gap="xsmall" width="full">
									<HeightAnimatePanel>
										<Box>
											{(showFullAccountList ? balances : balances.slice(0, defaultRowsShown)).map(resource => (
												<ListRow key={resource.address} {...resource} />
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
