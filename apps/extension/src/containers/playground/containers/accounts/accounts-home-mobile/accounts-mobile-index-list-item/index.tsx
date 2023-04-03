import * as AvatarPrimitive from '@radix-ui/react-avatar'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import React, { forwardRef, useContext, useEffect } from 'react'
import { useTimeout } from 'usehooks-ts'

import { AvatarFallback, AvatarImage } from 'ui/src/components-v2/avatar'
import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'
import { ChevronRightIcon } from 'ui/src/components/icons'

import { Link } from '@src/components/link'
import * as skeletonStyles from '@src/containers/playground/components/styles/skeleton-loading.css'
import { animtePageVariants, routes } from '@src/containers/playground/config'
import { useAccountParams } from '@src/containers/playground/hooks/use-account-params'

import { Context } from '../context'
import { TListItem } from '../types'
import * as styles from './accounts-mobile-index-list-item.css'

interface IAccountsMobileIndexListItemRequiredProps {
	id: string
	index: number
	loaded: boolean
	name: string
	assetType: TListItem
}

interface IAccountsMobileIndexListItemOptionalProps {
	className?: number
	isImageSquare?: boolean
	count?: number
}

interface IAccountsMobileIndexListItemProps
	extends IAccountsMobileIndexListItemRequiredProps,
		IAccountsMobileIndexListItemOptionalProps {}

const defaultProps: IAccountsMobileIndexListItemOptionalProps = {
	className: undefined,
	isImageSquare: false,
	count: 0,
}

export const AccountsMobileIndexListItem = forwardRef<HTMLElement, IAccountsMobileIndexListItemProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { setItems } = useContext(Context)
		const { id, index, className, loaded, name, isImageSquare, count, assetType } = props

		// const { account, assetType, asset } = useAccountParams()
		const { account } = useAccountParams()

		// demo for timing
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

		// demo for language change
		// useEffect(() => {
		// 	setTimeout(() => {
		// 		if (!loaded) {
		// 			setItems(items =>
		// 				items.map(item => {
		// 					if (item.id === id) {
		// 						item.loaded = true
		// 					}
		// 					return item
		// 				}),
		// 			)
		// 		}
		// 	}, 2000)
		// }, [loaded])

		return (
			<Box ref={ref} className={clsx(styles.mobileAccountsIndex, className)}>
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
						<Box className={styles.mobileAccountsIndexWrapper}>
							<Link
								underline="never"
								to={`/${routes.ACCOUNTS}/${account}/${assetType}`}
								className={styles.mobileAccountsIndexLink}
							>
								<motion.div
									initial="hidden"
									animate="visible"
									variants={animtePageVariants}
									className={styles.mobileAccountsIndexMotionWrapper}
								>
									<Box className={clsx(styles.mobileAccountsIndexInner)}>
										<Box display="flex">
											<Box display="flex" alignItems="center" flexGrow={1} gap="xsmall">
												<Text size="small" weight="strong" color="strong">
													{name}
												</Text>
												<Text size="small" weight="medium">
													({count})
												</Text>
											</Box>
											<Box display="flex" alignItems="center">
												<ChevronRightIcon />
											</Box>
										</Box>
										<Box display="flex" alignItems="center" marginTop="small">
											<Box display="flex" alignItems="center" className={styles.mobileAccountsIndexSplit} />
											<Box
												display="flex"
												flexDirection="column"
												alignItems="flex-end"
												justifyContent="center"
												gap="xxsmall"
												className={styles.mobileAccountsIndexSplit}
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
							<Box className={styles.mobileAccountsIndexAbsoluteAssetsWrapper}>
								{[...Array(4)].map((x, i) => (
									<Link
										// eslint-disable-next-line
										key={i}
										to={`/${routes.ACCOUNTS}/${account}/${assetType}/xrd`}
										className={
											isImageSquare ? styles.mobileAccountsIndexAssetSquare : styles.mobileAccountsIndexAssetCircle
										}
										underline="never"
									>
										<Box>
											<AvatarPrimitive.Root
												className={
													isImageSquare
														? styles.mobileAccountsIndexAssetSquareAvatar
														: styles.mobileAccountsIndexAssetCirclAvatar
												}
											>
												<AvatarImage
													src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
													alt="Colm Tuite"
												/>
												<AvatarFallback delayMs={600}>CT</AvatarFallback>
											</AvatarPrimitive.Root>
										</Box>
									</Link>
								))}
								<Box marginLeft="small">
									<Text size="xsmall" weight="regular">
										+7
									</Text>
								</Box>
							</Box>
						</Box>
					)}
				</AnimatePresence>
			</Box>
		)
	},
)

AccountsMobileIndexListItem.defaultProps = defaultProps
