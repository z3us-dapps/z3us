import React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'
import useMeasure from 'react-use-measure'
import { useWindowSize } from 'usehooks-ts'

import { Box } from 'ui/src/components/box'
import Loader from 'ui/src/components/loader'
import { Text } from 'ui/src/components/typography'
import { useBalances } from 'ui/src/hooks/dapp/use-balances'
import { useSelectedAccounts } from 'ui/src/hooks/use-accounts'
import { useIsMobileWidth } from 'ui/src/hooks/use-is-mobile'

import { AssetsList } from '../components/assets-list'
import { HomeScrollShadow } from '../components/home-scroll-shadow'
import { HorizontalAccountsScrollList } from '../components/horizontal-accounts-scroll-list'
import * as styles from './styles.css'

const messages = defineMessages({
	all_assets: {
		id: 'accounts.home.all_assets',
		defaultMessage: 'All assets',
	},
})

const Home: React.FC = () => {
	const intl = useIntl()
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
					{intl.formatMessage(messages.all_assets)}
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
