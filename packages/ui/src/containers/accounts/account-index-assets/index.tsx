import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { Change } from 'packages/ui/src/components/change'
import { useGlobalResourceBalances } from 'packages/ui/src/hooks/dapp/use-balances'
import { useNoneSharedStore } from 'packages/ui/src/hooks/use-store'
import { ResourceBalanceType } from 'packages/ui/src/types/types'
import { formatBigNumber } from 'packages/ui/src/utils/formatters'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Avatar } from 'ui/src/components/avatar'
import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { ChevronRightIcon } from 'ui/src/components/icons'
import { Link } from 'ui/src/components/router-link'
import * as skeletonStyles from 'ui/src/components/styles/skeleton-loading.css'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
import { animatePageVariants } from 'ui/src/constants/page'

import * as styles from './account-index-assets.css'

const defaultRowsShown = 4

interface IAccountIndexAssetsProps {
	scrollableNode: HTMLElement | null
}

export const AccountIndexAssets: React.FC<IAccountIndexAssetsProps> = ({ scrollableNode }) => {
	const { t } = useTranslation()
	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))
	const { balances, fungibleChange, nonFungibleChange, fungibleValue, nonFungibleValue, isLoading } =
		useGlobalResourceBalances()

	const fungible = balances.filter(b => b.type === ResourceBalanceType.FUNGIBLE)
	const nfts = balances.filter(b => b.type === ResourceBalanceType.NON_FUNGIBLE)

	const [hoveredLink, setHoveredLink] = useState<string | null>(null)

	useEffect(() => {
		if (scrollableNode) {
			scrollableNode.scrollTop = 0
		}
	}, [])

	return (
		<Box className={styles.indexAssetsOuterWrapper}>
			<Box className={styles.indexAssetsTitleWrapper}>
				<Text size="xlarge" color="strong" weight="medium" truncate>
					<Translation capitalizeFirstLetter text="accounts.home.assetsBadgesTitle" />
				</Text>
			</Box>
			<Box className={styles.indexAssetsWrapper}>
				{[
					{ name: t('accounts.home.assetsTokens'), resources: fungible, value: fungibleValue, change: fungibleChange },
					{ name: t('accounts.home.assetsNfts'), resources: nfts, value: nonFungibleValue, change: nonFungibleChange },
				].map(({ name, resources, value, change }, idx) => (
					<Box key={name} className={styles.indexAssetWrapper}>
						<AnimatePresence initial={false}>
							{isLoading && (
								<motion.div
									initial="hidden"
									animate="visible"
									variants={animatePageVariants}
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
							{!isLoading && (
								<motion.div initial="hidden" animate="visible" variants={animatePageVariants}>
									<Box>
										<Link
											to="/accounts/tokens"
											underline="never"
											className={clsx(styles.indexAssetLinkRow, name === hoveredLink && styles.indexAssetLinkRowHover)}
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
														<Text size="medium">({resources.length})</Text>
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
														{formatBigNumber(value, currency, 2)}
													</Text>
													<Text weight="medium" size="xsmall" color={change.gte(0) ? 'green' : 'red'}>
														<Change change={change} />
													</Text>
												</Box>
											</Box>
										</Link>
										<Box className={styles.indexAssetRowOverlay}>
											{resources.length > defaultRowsShown && (
												<Box display="flex" alignItems="center" marginRight="large">
													<Text size="xsmall" weight="medium">
														+{resources.length - defaultRowsShown}
													</Text>
												</Box>
											)}
											{resources.slice(0, defaultRowsShown).map(resource => (
												<Button
													key={resource.address}
													className={styles.indexAssetCircle}
													onMouseOver={() => setHoveredLink(name)}
													href={`/accounts/tokens?asset=${resource.address}`}
													styleVariant="avatar"
													sizeVariant="medium"
													iconOnly
													rounded
												>
													<Avatar
														fallback={resource.symbol || resource.name}
														src={resource.imageUrl}
														alt={resource.name}
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
}
