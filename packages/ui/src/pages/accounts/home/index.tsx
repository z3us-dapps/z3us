/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from 'clsx'
import { Change } from 'packages/ui/src/components/change'
import Loader from 'packages/ui/src/components/loader'
import { ResourceImageIcon } from 'packages/ui/src/components/resource-image-icon'
import { useFungibleResourceBalances, useNonFungibleResourceBalances } from 'packages/ui/src/hooks/dapp/use-balances'
import { useNoneSharedStore } from 'packages/ui/src/hooks/use-store'
import { formatBigNumber } from 'packages/ui/src/utils/formatters'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { Link } from 'ui/src/components/router-link'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
import { useWalletAccounts } from 'ui/src/hooks/use-wallet-account'

import { AssetsPrice } from '../components/assets-price'
import { MobileScrollingBackground } from '../components/mobile-scrolling-background'
import { MobileScrollingButtons } from '../components/mobile-scrolling-buttons'
import { OverlayAssetIcons } from '../components/overlay-asset-icons'
import * as styles from '../styles.css'

const Home: React.FC = () => {
	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))
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

	const accounts = useWalletAccounts()

	return (
		<Box className={clsx(styles.accountRoutesWrapper)}>
			<Box className={styles.accountRoutesScrollingWrapper}>
				<MobileScrollingBackground />
				<MobileScrollingButtons />
				<AssetsPrice />
				<Box className={styles.assetsHomeWrapper}>
					{isLoading ? (
						<Loader />
					) : (
						<Box>
							<Box className={styles.assetsHomeTitleWrapper}>
								<Text capitalizeFirstLetter color="strong" weight="strong" size="medium">
									All
								</Text>
							</Box>
							<Box className={styles.assetsHomeAssetTileWrapper}>
								<Link to="/accounts/-/tokens" className={styles.assetsHomeAssetTile}>
									<Text capitalizeFirstLetter color="strong" weight="strong" size="medium">
										All tokens
									</Text>
								</Link>
								<Link to="/accounts/-/nfts" className={styles.assetsHomeAssetTile}>
									<Text capitalizeFirstLetter color="strong" weight="strong" size="medium">
										All nfts
									</Text>
								</Link>
							</Box>
							<Box className={styles.assetsHomeTitleWrapper}>
								<Text capitalizeFirstLetter color="strong" weight="strong" size="medium">
									all <Translation text="global.accounts" />
								</Text>
							</Box>
							<Box component="ul" className={styles.assetsHomeList}>
								{Object.values(accounts).map(account => (
									<Box key={account.address} component="li" className={styles.assetsHomeListLi}>
										<Link
											to={`/accounts/${account.address}`}
											className={clsx(
												styles.assetsHomeListLink,
												hoveredLink === account.address && styles.assetsHomeListLinkHover,
											)}
											onMouseOver={() => setHoveredLink(account.address)}
											onMouseLeave={() => setHoveredLink(null)}
											underline="never"
										>
											<Box className={styles.assetsHomeListTitleWrapper}>
												<ResourceImageIcon size="large" address={account.address} />
												<Box>
													<Text capitalizeFirstLetter color="strong" weight="medium" size="small">
														{account.name}
													</Text>
													<Box className={styles.assetsHomeListTitleWrapper}>
														<Text weight="strong" size="small" color="strong" truncate>
															{formatBigNumber(fungibleTotalValue, currency, 2)}
														</Text>
														<Text size="small" color="green" truncate>
															<Change change={fungibleTotalChange} />
														</Text>
													</Box>
												</Box>
											</Box>
										</Link>
										<OverlayAssetIcons
											balances={fungibleBalances}
											accountId={accountId}
											onButtonMouseOver={() => setHoveredLink(account.address)}
										/>
									</Box>
								))}
							</Box>
						</Box>
					)}
				</Box>
			</Box>
		</Box>
	)
}

export default Home
