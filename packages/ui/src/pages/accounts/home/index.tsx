import clsx from 'clsx'
import { Change } from 'packages/ui/src/components/change'
import Loader from 'packages/ui/src/components/loader'
import { ResourceImageIcon } from 'packages/ui/src/components/resource-image-icon'
import { useScroll } from 'packages/ui/src/components/scroll-area-radix/use-scroll'
import { useFungibleResourceBalances, useNonFungibleResourceBalances } from 'packages/ui/src/hooks/dapp/use-balances'
import { useNoneSharedStore } from 'packages/ui/src/hooks/use-store'
import { formatBigNumber } from 'packages/ui/src/utils/formatters'
import React from 'react'
import { Link, useParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import * as tableHeadStyles from 'ui/src/components/styles/table-head-shadow.css'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'

import { AssetsHeader } from '../components/assets-header'
import { MobileScrollingBackground } from '../components/mobile-scrolling-background'
import { MobileScrollingButtons } from '../components/mobile-scrolling-buttons'
import * as styles from './styles.css'

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

	return (
		<Box
			className={clsx(styles.accountRoutesWrapper, !isLoading && !isScrolledTop && tableHeadStyles.accountTheadShadow)}
		>
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

							<Box className={styles.assetsHomeList}>
								<Box>
									<Box flexGrow={1}>
										<Box display="flex" gap="xxsmall">
											<Text className="tr-text-elem" weight="medium" size="small" color="strong" truncate>
												<Translation capitalizeFirstLetter text="accounts.home.fungiblesTitle" />
											</Text>
											{fungibleBalances.length > 0 && (
												<Text size="small" truncate>
													({fungibleBalances.length})
												</Text>
											)}
										</Box>
										<Box display="flex" gap="xxsmall">
											<Text weight="strong" size="small" color="strong" truncate>
												{formatBigNumber(fungibleTotalValue, currency, 2)}
											</Text>
											<Text size="small" color="green" truncate>
												<Change change={fungibleTotalChange} />
											</Text>
										</Box>
									</Box>
									<Box>
										<Box>
											{fungibleBalances.map(resource => (
												<Link className={styles.assetsHomeListLink} to={`/accounts/${accountId}/fungibles`}>
													<ResourceImageIcon size="large" address={resource.address} />
												</Link>
											))}
										</Box>
									</Box>
								</Box>
								<Box>
									<Box flexGrow={1}>
										<Box display="flex" gap="xxsmall">
											<Text className="tr-text-elem" weight="medium" size="small" color="strong" truncate>
												<Translation capitalizeFirstLetter text="accounts.home.nonFungiblesTitle" />
											</Text>
											{nonFungibleBalances.length > 0 && (
												<Text size="small" truncate>
													({nonFungibleBalances.length})
												</Text>
											)}
										</Box>
										<Box display="flex" gap="xxsmall">
											<Text weight="strong" size="small" color="strong" truncate>
												{formatBigNumber(nonFungibleTotalValue, currency, 2)}
											</Text>
											<Text size="small" color="green" truncate>
												<Change change={nonFungibleTotalChange} />
											</Text>
										</Box>
									</Box>
									<Box>
										<Box>
											{nonFungibleBalances.map(resource => (
												<Link to={`/accounts/${accountId}/fungibles`}>
													<ResourceImageIcon size="large" address={resource.address} />
												</Link>
											))}
										</Box>
									</Box>
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
