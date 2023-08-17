import clsx from 'clsx'
import { Change } from 'packages/ui/src/components/change'
import Loader from 'packages/ui/src/components/loader'
import { useScroll } from 'packages/ui/src/components/scroll-area-radix/use-scroll'
import { useFungibleResourceBalances, useNonFungibleResourceBalances } from 'packages/ui/src/hooks/dapp/use-balances'
import { useNoneSharedStore } from 'packages/ui/src/hooks/use-store'
import { formatBigNumber } from 'packages/ui/src/utils/formatters'
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'

import { AssetsHeader } from '../components/assets-header'
import { MobileScrollingBackground } from '../components/mobile-scrolling-background'
import { MobileScrollingButtons } from '../components/mobile-scrolling-buttons'
import { OverlayAssetIcons } from './components/overlay-asset-icons'
import * as styles from './styles.css'

const FUNGIBLES_PATH = 'fungibles'
const NON_FUNGIBLES_PATH = 'non-fungibles'

const Home: React.FC = () => {
	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))
	const { scrollableNode, isScrolledTop } = useScroll()
	const { accountId = '-' } = useParams()

	const {
		balances: fungibleBalances,
		isLoading: fungibleIsLoading,
		totalChange: fungibleTotalChange,
		totalValue: fungibleTotalValue,
	} = useFungibleResourceBalances()
	const {
		balances: nonFungibleBalances,
		isLoading: nonFungibleIsLoading,
		totalChange: nonFungibleTotalChange,
		totalValue: nonFungibleTotalValue,
	} = useNonFungibleResourceBalances()
	const isLoading = fungibleIsLoading || nonFungibleIsLoading
	const [hoveredLink, setHoveredLink] = useState<string | null>(null)

	return (
		<Box className={clsx(styles.accountRoutesWrapper)}>
			<Box className={styles.accountRoutesScrollingWrapper}>
				<MobileScrollingBackground scrollableNode={scrollableNode} />
				<MobileScrollingButtons scrollableNode={scrollableNode} />
				<AssetsHeader isScrolledTop={isScrolledTop} scrollableNode={scrollableNode} />
				<Box className={styles.assetsHomeWrapper}>
					{isLoading ? (
						<Loader />
					) : (
						<>
							<Box className={styles.assetsHomeTitleWrapper}>
								<Text capitalizeFirstLetter color="strong" weight="strong" size="medium">
									<Translation text="global.assets" />
								</Text>
							</Box>
							<Box component="ul" className={styles.assetsHomeList}>
								<Box component="li" className={styles.assetsHomeListLi}>
									<Link
										to={`/accounts/${accountId}/fungibles`}
										className={clsx(
											styles.assetsHomeListLink,
											hoveredLink === FUNGIBLES_PATH && styles.assetsHomeListLinkHover,
										)}
										onMouseOver={() => setHoveredLink(FUNGIBLES_PATH)}
										onMouseLeave={() => setHoveredLink(null)}
									>
										<Box className={styles.assetsHomeListTitleWrapper}>
											<Text capitalizeFirstLetter color="strong" weight="medium" size="small">
												<Translation capitalizeFirstLetter text="accounts.home.fungiblesTitle" />{' '}
											</Text>
											<Text capitalizeFirstLetter weight="medium" size="small">
												- <Translation capitalizeFirstLetter text="accounts.home.fungiblesSubTitle" />
											</Text>
											{fungibleBalances.length > 0 && (
												<Text size="small" truncate>
													({fungibleBalances.length})
												</Text>
											)}
										</Box>
										<Box className={styles.assetsHomeListTitleWrapper}>
											<Text weight="strong" size="small" color="strong" truncate>
												{formatBigNumber(fungibleTotalValue, currency, 2)}
											</Text>
											<Text size="small" color="green" truncate>
												<Change change={fungibleTotalChange} />
											</Text>
										</Box>
									</Link>
									<OverlayAssetIcons
										balances={fungibleBalances}
										href={`/accounts/${accountId}/fungibles`}
										onButtonMouseOver={() => setHoveredLink(FUNGIBLES_PATH)}
									/>
								</Box>
								<Box component="li" className={styles.assetsHomeListLi}>
									<Link
										to={`/accounts/${accountId}/non-fungibles`}
										className={clsx(
											styles.assetsHomeListLink,
											hoveredLink === NON_FUNGIBLES_PATH && styles.assetsHomeListLinkHover,
										)}
										onMouseOver={() => setHoveredLink(NON_FUNGIBLES_PATH)}
										onMouseLeave={() => setHoveredLink(null)}
									>
										<Box className={styles.assetsHomeListTitleWrapper}>
											<Text capitalizeFirstLetter color="strong" weight="medium" size="small">
												<Translation capitalizeFirstLetter text="accounts.home.nonFungiblesTitle" />
											</Text>
											<Text capitalizeFirstLetter weight="medium" size="small">
												- <Translation capitalizeFirstLetter text="accounts.home.nonFungiblesSubTitle" />
											</Text>
											{nonFungibleBalances.length > 0 && (
												<Text size="small" truncate>
													({nonFungibleBalances.length})
												</Text>
											)}
										</Box>
										<Box className={styles.assetsHomeListTitleWrapper}>
											<Text weight="strong" size="small" color="strong" truncate>
												{formatBigNumber(nonFungibleTotalValue, currency, 2)}
											</Text>
											<Text size="small" color="green" truncate>
												<Change change={nonFungibleTotalChange} />
											</Text>
										</Box>
									</Link>
									<OverlayAssetIcons
										balances={nonFungibleBalances}
										accountId={accountId}
										onButtonMouseOver={() => setHoveredLink(FUNGIBLES_PATH)}
									/>
								</Box>
							</Box>
						</>
					)}
				</Box>
			</Box>
		</Box>
	)
}

export default Home
