import React from 'react'
import useMeasure from 'react-use-measure'

import { Box } from 'ui/src/components/box'
import Loader from 'ui/src/components/loader'
import {
	ScrollAreaRoot,
	ScrollAreaScrollbar,
	ScrollAreaThumb,
	ScrollAreaViewport,
} from 'ui/src/components/scroll-area-radix'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
import { useFungibleResourceBalances, useNonFungibleResourceBalances } from 'ui/src/hooks/dapp/use-balances'
import { useWalletAccounts } from 'ui/src/hooks/use-wallet-account'

import { AssetsList } from '../components/assets-list'
import { HomeScrollShadow } from '../components/home-scroll-shadow'
import { AccountHomeCard } from './components/account-home-card'
import * as styles from './styles.css'

const Home: React.FC = () => {
	const accounts = useWalletAccounts()
	const [wrapperRef, { width: horizontalScrollWidth }] = useMeasure()

	const accountId = '-'

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

	if (isLoading) return <Loader />

	return (
		<Box ref={wrapperRef} className={styles.assetsHomeWrapper}>
			<HomeScrollShadow />
			<Box className={styles.accountsHorizontalWrapper}>
				<Box className={styles.accountsHorizontalAbsoluteWrapper}>
					<ScrollAreaRoot style={{ maxWidth: `${horizontalScrollWidth}px`, width: '100%' }}>
						<ScrollAreaViewport>
							<Box className={styles.accountsHorizontalCardsWrapper}>
								{Object.values(accounts).map(({ address, name }) => (
									<AccountHomeCard key={address} name={name} address={address} />
								))}
							</Box>
						</ScrollAreaViewport>
						<ScrollAreaScrollbar orientation="horizontal">
							<ScrollAreaThumb />
						</ScrollAreaScrollbar>
					</ScrollAreaRoot>
				</Box>
			</Box>
			<Box className={styles.homeAssetsTitleWrapper}>
				<Text capitalizeFirstLetter color="strong" weight="strong" size="medium">
					<Translation text="accounts.home.allAssets" />
				</Text>
			</Box>
			<AssetsList
				accountId={accountId}
				fungibleBalances={fungibleBalances}
				fungibleTotalValue={fungibleTotalValue}
				fungibleTotalChange={fungibleTotalChange}
				nonFungibleBalances={nonFungibleBalances}
				nonFungibleTotalValue={nonFungibleTotalValue}
				nonFungibleTotalChange={nonFungibleTotalChange}
			/>
		</Box>
	)
}

export default Home
