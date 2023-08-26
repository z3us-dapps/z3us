import clsx from 'clsx'
import React, { useState } from 'react'

import { Box } from 'ui/src/components/box'
import { Link } from 'ui/src/components/router-link'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
import { useWalletAccounts } from 'ui/src/hooks/use-wallet-account'

import { AccountTotalValue } from '../components/account-total-value'
import { MobileScrollingBackground } from '../components/mobile-scrolling-background'
import { MobileScrollingButtons } from '../components/mobile-scrolling-buttons'
import * as styles from '../styles.css'
import AccountRow from './components/account-row'

const Home: React.FC = () => {
	const [hoveredLink, setHoveredLink] = useState<string | null>(null)
	const accounts = useWalletAccounts()

	return (
		<Box className={clsx(styles.accountRoutesWrapper)}>
			<Box className={styles.accountRoutesScrollingWrapper}>
				<MobileScrollingBackground />
				<MobileScrollingButtons />
				<AccountTotalValue />
				<Box className={styles.assetsHomeWrapper}>
					<Box>
						<Box className={styles.assetsHomeTitleWrapper}>
							<Text capitalizeFirstLetter color="strong" weight="strong" size="medium">
								All
							</Text>
						</Box>
						<Box className={styles.assetsHomeAssetTileWrapper}>
							<Link to="/accounts?tx=7878" className={styles.assetsHomeAssetTile}>
								<Text capitalizeFirstLetter color="strong" weight="strong" size="medium">
									TX demo
								</Text>
							</Link>
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
								<AccountRow
									key={account.address}
									account={account}
									isHovered={account.address === hoveredLink}
									onSelect={setHoveredLink}
								/>
							))}
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

export default Home
