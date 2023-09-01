import React from 'react'
import useMeasure from 'react-use-measure'

import { Box } from 'ui/src/components/box'
import {
	ScrollAreaRoot,
	ScrollAreaScrollbar,
	ScrollAreaThumb,
	ScrollAreaViewport,
} from 'ui/src/components/scroll-area-radix'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
import { useWalletAccounts } from 'ui/src/hooks/use-wallet-account'

import { HomeScrollShadow } from '../components/home-scroll-shadow'
import { AccountHomeCard } from './components/account-home-card'
import { AccountsList } from './components/accounts-list'
import * as styles from './styles.css'

const Home: React.FC = () => {
	const accounts = useWalletAccounts()
	const [wrapperRef, { width: horizontalScrollWidth }] = useMeasure()

	return (
		<Box ref={wrapperRef} className={styles.assetsHomeWrapper}>
			<HomeScrollShadow />
			<Box className={styles.accountsHorizontalWrapper}>
				<ScrollAreaRoot style={{ maxWidth: `${horizontalScrollWidth}px` }}>
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
			<Box className={styles.homeAssetsTitleWrapper}>
				<Text capitalizeFirstLetter color="strong" weight="strong" size="medium">
					<Translation text="accounts.home.allAssets" />
				</Text>
			</Box>
			<AccountsList />
		</Box>
	)
}

export default Home
