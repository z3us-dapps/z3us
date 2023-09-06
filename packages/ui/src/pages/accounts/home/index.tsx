import React from 'react'
import { useParams } from 'react-router-dom'
import useMeasure from 'react-use-measure'
import { useWindowSize } from 'usehooks-ts'

import { Box } from 'ui/src/components/box'
import Loader from 'ui/src/components/loader'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
import { useSelectedAccounts } from 'ui/src/hooks/dapp/use-accounts'
import { useBalances } from 'ui/src/hooks/dapp/use-balances'
import { useIsMobileWidth } from 'ui/src/hooks/use-is-mobile'

import { AssetsList } from '../components/assets-list'
import { HomeScrollShadow } from '../components/home-scroll-shadow'
import { HorizontalAccountsScrollList } from '../components/horizontal-accounts-scroll-list'
import * as styles from './styles.css'

const Home: React.FC = () => {
	const { accountId = '-' } = useParams()
	const [wrapperRef, { width: horizontalScrollWidth, top }] = useMeasure()
	const { height } = useWindowSize()
	const isMobile = useIsMobileWidth()
	const mobileMinHeight = height - top - 48

	const selectedAccounts = useSelectedAccounts()
	const {
		isLoading,
		fungibleBalances,
		fungibleChange,
		fungibleValue,
		nonFungibleBalances,
		nonFungibleChange,
		nonFungibleValue,
	} = useBalances(...selectedAccounts)

	if (isLoading) return <Loader />

	return (
		<Box
			ref={wrapperRef}
			className={styles.assetsHomeWrapper}
			style={{ ...(isMobile ? { minHeight: `${mobileMinHeight}px` } : {}) }}
		>
			<HomeScrollShadow />
			<HorizontalAccountsScrollList horizontalScrollWidth={horizontalScrollWidth} />
			<Box className={styles.homeAssetsTitleWrapper}>
				<Text capitalizeFirstLetter color="strong" weight="strong" size="medium">
					<Translation text="accounts.home.allAssets" />
				</Text>
			</Box>
			<AssetsList
				accountId={accountId}
				fungibleBalances={fungibleBalances}
				fungibleValue={fungibleValue}
				fungibleChange={fungibleChange}
				nonFungibleBalances={nonFungibleBalances}
				nonFungibleValue={nonFungibleValue}
				nonFungibleChange={nonFungibleChange}
			/>
		</Box>
	)
}

export default Home
