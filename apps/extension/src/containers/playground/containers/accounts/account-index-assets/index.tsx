import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import React, { forwardRef, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useTimeout } from 'usehooks-ts'

import { Avatar, AvatarFallback, AvatarImage } from 'ui/src/components-v2/avatar'
import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'
import { ChevronRightIcon } from 'ui/src/components/icons'

import { Link } from '@src/components/link'
import Translation from '@src/components/translation'
import * as skeletonStyles from '@src/containers/playground/components/styles/skeleton-loading.css'
import { AccountSearch } from '@src/containers/playground/containers/accounts/account-search'

import * as styles from './account-index-assets.css'

const variants = {
	visible: {
		opacity: 1,
		transition: {
			type: 'spring',
			stiffness: 200,
			damping: 20,
		},
	},
	hidden: {
		opacity: 0,
		transition: {
			type: 'spring',
			stiffness: 200,
			damping: 20,
		},
	},
}

interface IAccountIndexAssetsRequiredProps {
	scrollableNode: HTMLElement | null
}

interface IAccountIndexAssetsOptionalProps {
	className?: string
}

interface IAccountIndexAssetsProps extends IAccountIndexAssetsRequiredProps, IAccountIndexAssetsOptionalProps {}

const defaultProps: IAccountIndexAssetsOptionalProps = {
	className: undefined,
}

export const AccountIndexAssets = forwardRef<HTMLElement, IAccountIndexAssetsProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { className, scrollableNode } = props

		const { t } = useTranslation()

		const [hoveredLink, setHoveredLink] = useState<string | null>(null)
		const [loaded, setLoaded] = useState<boolean>(false)

		useEffect(() => {
			if (scrollableNode) {
				scrollableNode.scrollTop = 0
			}
		}, [])

		useTimeout(() => {
			setLoaded(true)
		}, 1000)

		return (
			<Box ref={ref} paddingBottom="xlarge" className={className}>
				<Box display="flex" paddingBottom="small" paddingTop="large" paddingX="xlarge" alignItems="center" gap="large">
					<Box>
						<Text size="xlarge" color="strong" weight="medium">
							<Translation text="accounts.home.assetsBadgesTitle" />
						</Text>
					</Box>
					<Box flexGrow={1}>
						<AccountSearch
							placeholder="Search"
							onChange={_value => {
								// eslint-disable-next-line
								console.log(_value)
							}}
						/>
					</Box>
				</Box>
				<Box className={styles.indexAssetsWrapper}>
					{[
						{ name: t('accounts.home.assetsTokens') },
						{ name: t('accounts.home.assetsNfts') },
						{ name: t('accounts.home.assetsLpTokens') },
						{ name: t('accounts.home.assetsBadges') },
					].map(({ name }, idx) => (
						<Box key={name} className={styles.indexAssetWrapper}>
							<AnimatePresence initial={false}>
								{!loaded && (
									<motion.div
										initial="hidden"
										animate="visible"
										variants={variants}
										className={styles.indexAssetLinkRowLoading}
									>
										<Box className={styles.indexAssetLinkRowLoadingGrid}>
											<Box display="flex" alignItems="center">
												<Box
													className={skeletonStyles.tokenListSkeleton}
													style={{ width: idx % 2 === 0 ? '45%' : '65%', height: '50%' }}
												/>
											</Box>
											<Box display="flex" alignItems="center" justifyContent="flex-end">
												{[...Array(idx % 2 === 0 ? 4 : 5)].map((_, i) => (
													<Box
														// eslint-disable-next-line react/no-array-index-key
														key={i}
														className={clsx(skeletonStyles.tokenListSkeleton, skeletonStyles.tokenListGridCircle)}
														style={{ marginRight: '-8px' }}
													/>
												))}
											</Box>
										</Box>
									</motion.div>
								)}
							</AnimatePresence>
							<AnimatePresence initial={false}>
								{loaded && (
									<motion.div initial="hidden" animate="visible" variants={variants}>
										<Box>
											<Link
												to="/accounts/all/tokens"
												underline="never"
												className={clsx(
													styles.indexAssetLinkRow,
													name === hoveredLink && styles.indexAssetLinkRowHover,
												)}
											>
												<Box
													className={styles.indexAssetLinkRowInner}
													onMouseOver={() => setHoveredLink(name)}
													onMouseLeave={() => setHoveredLink(null)}
												>
													<Box display="flex" alignItems="center">
														<Text size="medium" color="strong">
															{name}
														</Text>
														<Box paddingLeft="xsmall">
															<Text size="medium">(12)</Text>
														</Box>
													</Box>
													<Box display="flex" alignItems="center" gap="xsmall">
														<Text size="small" color="strong" weight="strong">
															$12,401
														</Text>
														<Text size="xsmall" color="green">
															+1.23%
														</Text>
													</Box>
												</Box>
											</Link>
											<Box className={styles.indexAssetRowOverlay}>
												<Box display="flex" alignItems="center" marginRight="large">
													<Text size="xsmall" weight="medium">
														+7
													</Text>
												</Box>
												{[...Array(4)].map((x, i) => (
													// eslint-disable-next-line
													<Link key={i} to="/accounts/all/tokens" className={styles.indexAssetCircle} underline="never">
														<Box onMouseOver={() => setHoveredLink(name)}>
															<Avatar>
																<AvatarImage
																	src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
																	alt="Colm Tuite"
																/>
																<AvatarFallback delayMs={600}>CT</AvatarFallback>
															</Avatar>
														</Box>
													</Link>
												))}
												<Box paddingLeft="xsmall">
													<ChevronRightIcon />
												</Box>
											</Box>
										</Box>
									</motion.div>
								)}
							</AnimatePresence>
						</Box>
					))}
				</Box>
			</Box>
		)
	},
)

AccountIndexAssets.defaultProps = defaultProps
