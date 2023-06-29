/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import React, { forwardRef, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { useTimeout } from 'usehooks-ts'

import { Box } from 'ui/src/components/box'
import { Link } from 'ui/src/components/router-link'
import * as skeletonStyles from 'ui/src/components/styles/skeleton-loading.css'
import { TransactionIcon } from 'ui/src/components/transaction-icon'
import { Text } from 'ui/src/components/typography'
import { animatePageVariants } from 'ui/src/constants/page'
import { SEARCH_ACTIVITY_PARAM } from 'ui/src/constants/routes'
import { useAccountParams } from 'ui/src/hooks/use-account-params'

import { Context } from '../context'
import * as styles from './accounts-mobile-asset-list-item.css'

interface IAccountsMobileAssetListItemProps {
	id: string
	index: number
	loaded: boolean
	name: string
	symbol: string
}

export const AccountsMobileAssetListItem: React.FC<IAccountsMobileAssetListItemProps> = props => {
	const { setItems } = useContext(Context)
	const { id, index, loaded, name, symbol } = props

	// const { account, assetType, asset } = useAccountParams()
	const { account } = useAccountParams()
	const { pathname } = useLocation()

	useTimeout(() => {
		setItems(items =>
			items.map(item => {
				if (item.id === id) {
					item.loaded = true
				}
				return item
			}),
		)
	}, 1000)

	return (
		<Box className={styles.mobileAccountsAssetItem}>
			<AnimatePresence initial={false}>
				{!loaded && (
					<motion.div
						initial="hidden"
						animate="visible"
						variants={animatePageVariants}
						style={{ position: 'absolute', top: '0', left: '0', right: '0', bottom: '0' }}
					>
						<Box
							paddingX="large"
							width="full"
							height="full"
							display="flex"
							gap="small"
							flexDirection="column"
							justifyContent="center"
						>
							<Box display="flex" width="full">
								<Box
									display="flex"
									alignItems="center"
									justifyContent="flex-start"
									flexShrink={0}
									gap="small"
									width="full"
									flexGrow={1}
								>
									<Box className={clsx(skeletonStyles.tokenListSkeleton, skeletonStyles.tokenListGridCircleSmall)} />
									<Box display="flex" flexDirection="column" gap="small" width="full" flexGrow={1}>
										<Box
											className={skeletonStyles.tokenListSkeleton}
											style={{ height: '15px', width: index % 2 === 0 ? '55%' : '65%' }}
										/>
										<Box
											className={skeletonStyles.tokenListSkeleton}
											style={{ height: '15px', width: index % 2 === 0 ? '45%' : '55%' }}
										/>
									</Box>
									<Box
										display="flex"
										flexDirection="column"
										gap="small"
										width="full"
										flexGrow={1}
										alignItems="flex-end"
									>
										<Box
											className={skeletonStyles.tokenListSkeleton}
											style={{ height: '15px', width: index % 2 === 0 ? '25%' : '35%' }}
										/>
										<Box
											className={skeletonStyles.tokenListSkeleton}
											style={{ height: '15px', width: index % 2 === 0 ? '20%' : '15%' }}
										/>
									</Box>
								</Box>
							</Box>
						</Box>
					</motion.div>
				)}
			</AnimatePresence>
			<AnimatePresence initial={false}>
				{loaded && (
					<Box className={styles.mobileAccountsAssetWrapper}>
						<Link
							underline="never"
							to={`${pathname}/${symbol}?${SEARCH_ACTIVITY_PARAM}=true`}
							className={styles.mobileAccountsAssetLink}
						>
							<motion.div
								initial="hidden"
								animate="visible"
								variants={animatePageVariants}
								className={styles.mobileAccountsAssetMotionWrapper}
							>
								<Box className={clsx(styles.mobileAccountsAssetInner)}>
									<Box className={styles.indicatorCircle}>
										<TransactionIcon transactionType="deposit" />
									</Box>
									<Box display="flex" flexDirection="column" flexGrow={1}>
										<Box display="flex" gap="xxsmall">
											<Text weight="stronger" size="small" color="strong">
												Radix
											</Text>
											<Text size="small">(XRD)</Text>
										</Box>
										<Box>
											<Text size="xsmall">4,110</Text>
										</Box>
									</Box>
									<Box display="flex" flexDirection="column" alignItems="flex-end" flexGrow={1}>
										<Box display="flex" gap="xxsmall">
											<Text weight="stronger" size="small" color="strong">
												$4,110
											</Text>
										</Box>
										<Box>
											<Text size="xsmall" color="green">
												+0.24%
											</Text>
										</Box>
									</Box>
								</Box>
							</motion.div>
						</Link>
					</Box>
				)}
			</AnimatePresence>
		</Box>
	)
}
