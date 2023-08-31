import clsx from 'clsx'
import React from 'react'
import useMeasure from 'react-use-measure'

import { Box } from 'ui/src/components/box'
import {
	ScrollAreaRoot,
	ScrollAreaScrollbar,
	ScrollAreaThumb,
	ScrollAreaViewport,
} from 'ui/src/components/scroll-area-radix'
import { useScroll } from 'ui/src/components/scroll-area-radix/use-scroll'
import * as scrollingShadowStyles from 'ui/src/components/styles/scrolling-shadow.css'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
import { useWalletAccounts } from 'ui/src/hooks/use-wallet-account'

import { AccountHomeCard } from './components/account-home-card'
import { AccountsList } from './components/accounts-list'
import * as styles from './styles.css'

const Home: React.FC = () => {
	const accounts = useWalletAccounts()
	const { scrollableNode, isScrolledTop } = useScroll()
	const nodeBounding = scrollableNode?.getBoundingClientRect()
	const [wrapperRef, { width: horizontalScrollWidth }] = useMeasure()
	const [scrollShadowRef, { top, height }] = useMeasure()
	const stickyTop = top - nodeBounding.y + height

	return (
		<Box ref={wrapperRef} className={styles.assetsHomeWrapper}>
			<Box
				ref={scrollShadowRef}
				style={{ top: `${stickyTop}px` }}
				className={clsx(
					scrollingShadowStyles.accountHeadShadow,
					!isScrolledTop && scrollingShadowStyles.accountHeadShadowScrolled,
				)}
			/>
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
