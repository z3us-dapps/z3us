import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import React, { forwardRef, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useTimeout } from 'usehooks-ts'

import { Avatar } from 'ui/src/components/avatar'
import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { Text } from 'ui/src/components/typography'
import { ChevronRightIcon } from 'ui/src/components/icons'

import { Link } from '@src/components/link'
import * as skeletonStyles from '@src/components/styles/skeleton-loading.css'
import Translation from '@src/components/translation'
import { animtePageVariants } from '@src/constants'

import * as styles from './account-index-assets.css'

interface IAccountIndexAssetsProps {
	className?: string
	scrollableNode: HTMLElement | null
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
			<Box ref={ref} className={clsx(styles.indexAssetsOuterWrapper, className)}>
				<Box className={styles.indexAssetsTitleWrapper}>
					<Text size="xlarge" color="strong" weight="medium" truncate>
						<Translation capitalizeFirstLetter text="accounts.home.assetsBadgesTitle" />
					</Text>
				</Box>
				<Box className={styles.indexAssetsWrapper}>
					{[
						{ name: t('accounts.home.assetsCoinsTokens') },
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
										variants={animtePageVariants}
										className={styles.indexAssetLinkRowLoading}
									>
										<Box className={styles.indexAssetLinkRowLoadingGrid}>
											<Box
												display="flex"
												flexDirection="column"
												alignItems="flex-start"
												justifyContent="center"
												gap="small"
											>
												<Box
													className={skeletonStyles.tokenListSkeleton}
													style={{ width: idx % 2 === 0 ? '35%' : '55%', height: '13px' }}
												/>
												<Box
													className={skeletonStyles.tokenListSkeleton}
													style={{ width: idx % 2 === 0 ? '25%' : '45%', height: '13px' }}
												/>
											</Box>
											<Box className={styles.indexAssetLinkRowLoadingAssetCircles}>
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
									<motion.div initial="hidden" animate="visible" variants={animtePageVariants}>
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
													<Box display="flex" alignItems="center" className={styles.textMaxWidthWrapper}>
														<Text capitalizeFirstLetter size="medium" color="strong" truncate>
															{name}
														</Text>
														<Box paddingLeft="xsmall">
															<Text size="medium">(12)</Text>
														</Box>
													</Box>
													<Box
														marginTop="xsmall"
														display="flex"
														alignItems="center"
														gap="xsmall"
														className={styles.textMaxWidthWrapper}
													>
														<Text size="small" color="strong" weight="strong" truncate>
															$12,40112,40112,40112,40112,40112,40112,40112,40112,40112,401
															$12,40112,40112,40112,40112,40112,40112,40112,40112,40112,401
														</Text>
														<Text weight="medium" size="xsmall" color={idx % 2 === 0 ? 'green' : 'red'}>
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
													<Button
														// eslint-disable-next-line
														key={i}
														className={styles.indexAssetCircle}
														onMouseOver={() => setHoveredLink(name)}
														href="/accounts/all/tokens887878"
														styleVariant="avatar"
														sizeVariant="medium"
														iconOnly
														rounded
													>
														<Avatar
															fallback="asdf"
															src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
															alt="Colm Tuite"
														/>
													</Button>
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
