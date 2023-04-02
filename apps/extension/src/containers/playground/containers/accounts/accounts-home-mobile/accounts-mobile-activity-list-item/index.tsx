import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import React, { forwardRef, useContext } from 'react'
import { useTimeout } from 'usehooks-ts'
import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'
import { ChevronRightIcon } from 'ui/src/components/icons'

import { Link } from '@src/components/link'
import * as skeletonStyles from '@src/containers/playground/components/styles/skeleton-loading.css'
import { animtePageVariants, routes } from '@src/containers/playground/config'
import { useAccountParams } from '@src/containers/playground/hooks/use-account-params'

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

		// const { account, assetType, asset } = useAccountParams()
		const { account } = useAccountParams()

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
							variants={animtePageVariants}
							style={{ position: 'absolute', top: '0', left: '0', right: '0', bottom: '0' }}
						>
							<Box
								paddingX="medium"
								width="full"
								height="full"
								display="flex"
								gap="small"
								flexDirection="column"
								justifyContent="center"
							>
								<Box display="flex">
									<Box
										className={skeletonStyles.tokenListSkeleton}
										style={{ height: '20px', width: index % 2 === 0 ? '25%' : '35%' }}
									/>
									<Box display="flex" flexGrow={1} justifyContent="flex-end">
										<Box className={skeletonStyles.tokenListSkeleton} style={{ height: '20px', width: '20px' }} />
									</Box>
								</Box>
								<Box display="flex">
									<Box
										display="flex"
										flexGrow={1}
										justifyContent="flex-start"
										className={skeletonStyles.tokenListGridCircleSmallWrapper}
									>
										{[...Array(index % 2 === 0 ? 3 : 5)].map((x, i) => (
											<Box
												// eslint-disable-next-line
												key={i}
												className={clsx(skeletonStyles.tokenListSkeleton, skeletonStyles.tokenListGridCircleSmall)}
											/>
										))}
									</Box>
									<Box display="flex" flexGrow={1} justifyContent="flex-end">
										<Box
											className={skeletonStyles.tokenListSkeleton}
											style={{ height: '20px', width: index % 2 === 0 ? '35%' : '45%' }}
										/>
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
								to={`/${routes.ACCOUNTS}/${account}/`}
								className={styles.mobileAccountsActivityLink}
							>
								<motion.div
									initial="hidden"
									animate="visible"
									variants={animtePageVariants}
									className={styles.mobileAccountsActivityMotionWrapper}
								>
									<Box className={clsx(styles.mobileAccountsActivityInner)}>
										<Box display="flex">
											<Box display="flex" alignItems="center" flexGrow={1} gap="xsmall">
												<Text size="small" weight="strong" color="strong">
													{name}
												</Text>
												<Text size="small" weight="medium">
													asdf
												</Text>
											</Box>
											<Box display="flex" alignItems="center">
												<ChevronRightIcon />
											</Box>
										</Box>
										<Box display="flex" alignItems="center" marginTop="small">
											<Box display="flex" alignItems="center" className={styles.mobileAccountsActivitySplit} />
											<Box
												display="flex"
												flexDirection="column"
												alignItems="flex-end"
												justifyContent="center"
												gap="xxsmall"
												className={styles.mobileAccountsActivitySplit}
											>
												<Text size="xsmall" weight="strong" color="strong">
													$10,430.45
												</Text>
												<Text size="xsmall" weight="regular" color="green">
													+0.26%
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
	},
)

AccountsMobileActivityListItem.defaultProps = defaultProps
