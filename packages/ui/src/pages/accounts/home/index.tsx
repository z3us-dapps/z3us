import React from 'react'
import { useParams } from 'react-router-dom'
import useMeasure from 'react-use-measure'

import { Box } from 'ui/src/components/box'
import Loader from 'ui/src/components/loader'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
import { useSelectedAccounts } from 'ui/src/hooks/dapp/use-accounts'
import { useBalances } from 'ui/src/hooks/dapp/use-balances'

import { AssetsList } from '../components/assets-list'
import { HomeScrollShadow } from '../components/home-scroll-shadow'
import { HorizontalAccountsScrollList } from '../components/horizontal-accounts-scroll-list'
import * as styles from './styles.css'

const Home: React.FC = () => {
	const { accountId = '-' } = useParams()
	const [wrapperRef, { width: horizontalScrollWidth }] = useMeasure()

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
		<Box ref={wrapperRef} className={styles.assetsHomeWrapper}>
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
