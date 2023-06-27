/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import React, { forwardRef, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { useTimeout } from 'usehooks-ts'

import { Box } from 'ui/src/components/box'
import { ShareIcon } from 'ui/src/components/icons'
import { Button } from 'ui/src/components/router-button'
import { Link } from 'ui/src/components/router-link'
import * as skeletonStyles from 'ui/src/components/styles/skeleton-loading.css'
import { TransactionIcon } from 'ui/src/components/transaction-icon'
import { Text } from 'ui/src/components/typography'
import { animatePageVariants } from 'ui/src/constants/page'
import { SEARCH_ACTIVITY_PARAM } from 'ui/src/constants/routes'

import { Context } from '../context'
import * as styles from './accounts-mobile-activity-list-item.css'

interface IAccountsMobileActivityListItemRequiredProps {
	id: string
	index: number
	loaded: boolean
	name: string
}

interface IAccountsMobileActivityListItemOptionalProps {
	className?: number
}

interface IAccountsMobileActivityListItemProps
	extends IAccountsMobileActivityListItemRequiredProps,
		IAccountsMobileActivityListItemOptionalProps {}

const defaultProps: IAccountsMobileActivityListItemOptionalProps = {
	className: undefined,
}

export const AccountsMobileActivityListItem = forwardRef<HTMLElement, IAccountsMobileActivityListItemProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { setItems } = useContext(Context)
		const { id, index, className, loaded, name } = props

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
			<Box ref={ref} className={clsx(styles.mobileAccountsActivityItem, className)}>
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
										gap="medium"
										width="full"
										flexGrow={1}
									>
										<Box className={clsx(skeletonStyles.tokenListSkeleton, skeletonStyles.tokenListGridCircleSmall)} />
										<Box display="flex" flexDirection="column" gap="small" width="full">
											<Box
												className={skeletonStyles.tokenListSkeleton}
												style={{ height: '15px', width: index % 2 === 0 ? '35%' : '45%' }}
											/>
											<Box
												className={skeletonStyles.tokenListSkeleton}
												style={{ height: '15px', width: index % 2 === 0 ? '45%' : '55%' }}
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
						<Box className={styles.mobileAccountsActivityWrapper}>
							<Link
								underline="never"
								to={`${pathname}?${SEARCH_ACTIVITY_PARAM}=true&asset=xrd&transactionId=1eaf53c4256c384d76ca72c0f18ef37a2e4441d4e6bae450e2b8507f42faa5b6`}
								className={styles.mobileAccountsActivityLink}
							>
								<motion.div
									initial="hidden"
									animate="visible"
									variants={animatePageVariants}
									className={styles.mobileAccountsActivityMotionWrapper}
								>
									<Box className={clsx(styles.mobileAccountsActivityInner)}>
										<Box className={styles.indicatorCircle}>
											<TransactionIcon transactionType="deposit" />
										</Box>
										<Box display="flex" flexDirection="column" flexGrow={1}>
											<Text weight="stronger" size="small" color="strong">
												+1.249 XRD
											</Text>
											<Text size="xsmall">29 Aug, 10est, 2023</Text>
										</Box>
									</Box>
								</motion.div>
							</Link>
							<Button
								className={styles.activityItemExternalLinkButton}
								sizeVariant="small"
								styleVariant="ghost"
								iconOnly
								to="https://explorer.radixdlt.com/"
								target="_blank"
							>
								<ShareIcon />
							</Button>
						</Box>
					)}
				</AnimatePresence>
			</Box>
		)
	},
)

AccountsMobileActivityListItem.defaultProps = defaultProps
