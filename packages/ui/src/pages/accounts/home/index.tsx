import clsx from 'clsx'
import { useScroll } from 'packages/ui/src/components/scroll-area-radix/use-scroll'
import { useFungibleResourceBalances, useNonFungibleResourceBalances } from 'packages/ui/src/hooks/dapp/use-balances'
import React from 'react'
import { Link, useParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import * as tableHeadStyles from 'ui/src/components/styles/table-head-shadow.css'

import { AssetsHeader } from '../components/assets-header'
import { MobileScrollingBackground } from '../components/mobile-scrolling-background'
import { MobileScrollingButtons } from '../components/mobile-scrolling-buttons'
import * as styles from './styles.css'

const Home: React.FC = () => {
	const { scrollableNode, isScrolledTop } = useScroll()
	const { accountId = '-' } = useParams()

	const { balances: fungibleBalances, isLoading: fungibleIsLoading } = useFungibleResourceBalances()
	const { balances: nonFungibleBalances, isLoading: nonFungibleIsLoading } = useNonFungibleResourceBalances()

	const isLoading = fungibleIsLoading || nonFungibleIsLoading

	return (
		<Box
			className={clsx(styles.accountRoutesWrapper, !isLoading && !isScrolledTop && tableHeadStyles.accountTheadShadow)}
		>
			<Box className={styles.accountRoutesScrollingWrapper}>
				<MobileScrollingBackground scrollableNode={scrollableNode} />
				<MobileScrollingButtons scrollableNode={scrollableNode} />
				<AssetsHeader isScrolledTop={isScrolledTop} scrollableNode={scrollableNode} />
				<Box className={styles.assetsTableWrapper}>
					<ul>
						<Link to={`/accounts/${accountId}/fungibles`}>
							<li>Fungibles {fungibleBalances.length}</li>
						</Link>
						<Link to={`/accounts/${accountId}/non-fungibles`}>
							<li>Non-Fungibles {nonFungibleBalances.length}</li>
						</Link>
					</ul>
				</Box>
			</Box>
		</Box>
	)
}

export default Home
