import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { HeightAnimatePanel } from 'ui/src/components/height-animate-panel'
import { Z3usLoading } from 'ui/src/components/z3us-loading'
import { animatePageVariants } from 'ui/src/constants/page'
import { useBalances } from 'ui/src/hooks/dapp/use-balances'
import { useSelectedAccounts } from 'ui/src/hooks/use-accounts'
import { useIsMobileWidth } from 'ui/src/hooks/use-is-mobile'
import { useResourceType } from 'ui/src/pages/accounts/hooks/use-resource-type'

import { Chart } from './components/chart'
import { ListRow } from './components/list-row'
import * as styles from './styles.css'

const defaultRowsShown = 3

export const BalanceChart: React.FC = () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { accountId } = useParams()

	const isMobile = useIsMobileWidth()
	const resourceType = useResourceType()

	const [showFullAccountList, setShowFullAccountList] = useState<boolean>(false)

	const selectedAccounts = useSelectedAccounts()
	const { balances, fungibleBalances, nonFungibleBalances, isLoading } = useBalances(...selectedAccounts)

	const selectedBalances = useMemo(() => {
		if (resourceType === 'nfts') return nonFungibleBalances
		if (resourceType === 'tokens') return fungibleBalances
		return balances
	}, [resourceType, isLoading])

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
								<Chart balances={selectedBalances} />
							</Box>
							<Box className={styles.accountsListWrapper}>
								<Box display="flex" flexDirection="column" gap="xsmall" width="full">
									<HeightAnimatePanel>
										<Box>
											{(showFullAccountList ? selectedBalances : selectedBalances.slice(0, defaultRowsShown)).map(
												resource => (
													<ListRow key={resource.address} {...resource} />
												),
											)}
										</Box>
									</HeightAnimatePanel>
								</Box>
								{selectedBalances?.length > defaultRowsShown && (
									<Box display="flex" flexDirection="column" gap="xsmall" width="full" paddingTop="medium">
										<Button styleVariant={isMobile ? 'tertiary' : 'secondary'} onClick={handleToggleFullAccountList}>
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
