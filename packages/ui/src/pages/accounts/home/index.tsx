import React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'
import useMeasure from 'react-use-measure'
import { useWindowSize } from 'usehooks-ts'

import { Box } from 'ui/src/components/box'
import { CopyAddressButton } from 'ui/src/components/copy-address-button'
import { Text } from 'ui/src/components/typography'
import { useWalletAccounts } from 'ui/src/hooks/use-accounts'
import { useIsAllAccounts } from 'ui/src/hooks/use-is-all-accounts'

import { AssetsList } from '../components/assets-list'
import { HomeScrollShadow } from '../components/home-scroll-shadow'
import { HorizontalAccountsScrollList } from '../components/horizontal-accounts-scroll-list'
import { SearchResource } from '../components/scrolling-buttons'
import * as styles from './styles.css'

const messages = defineMessages({
	all_assets: {
		id: 'P3IVGl',
		defaultMessage: 'All assets',
	},
	search: {
		defaultMessage: 'Lookup resource',
		id: 'd9nvEg',
	},
})

const Home: React.FC = () => {
	const intl = useIntl()
	const { accountId = '-' } = useParams()
	const accounts = useWalletAccounts()
	const isAllAccounts = useIsAllAccounts()
	const [wrapperRef, { width: horizontalScrollWidth, top }] = useMeasure()
	const { height } = useWindowSize()
	const mobileMinHeight = Math.max(height - top - 48, 385)
	const accountName = accounts?.[accountId]?.name

	const showSearch = isAllAccounts && Object.keys(accounts).length === 0

	return (
		<Box ref={wrapperRef} className={styles.assetsHomeWrapper} style={{ minHeight: `${mobileMinHeight}px` }}>
			<HomeScrollShadow />
			<HorizontalAccountsScrollList horizontalScrollWidth={horizontalScrollWidth} />

			{showSearch ? (
				<>
					<Box className={styles.homeAssetsTitleWrapper}>
						<Text capitalizeFirstLetter color="strong" weight="strong" size="medium">
							{intl.formatMessage(messages.search)}
						</Text>
					</Box>
					<SearchResource />
				</>
			) : (
				<>
					<Box className={styles.homeAssetsTitleWrapper}>
						{isAllAccounts ? (
							<Text capitalizeFirstLetter color="strong" weight="strong" size="medium">
								{intl.formatMessage(messages.all_assets)}
							</Text>
						) : (
							<>
								<Text capitalizeFirstLetter color="strong" weight="strong" size="medium">
									{accountName}
								</Text>
								<CopyAddressButton address={accountId} />
							</>
						)}
					</Box>
					<AssetsList />
				</>
			)}
		</Box>
	)
}

export default Home
