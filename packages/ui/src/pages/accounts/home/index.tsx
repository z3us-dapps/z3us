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
	const accounts = useWalletAccounts()
	const isAllAccounts = useIsAllAccounts()
	const [wrapperRef, { width: horizontalScrollWidth, top }] = useMeasure()
	const { height } = useWindowSize()
	const mobileMinHeight = Math.max(height - top - 48, 385)
	const accountName = accounts?.[accountId]?.name

	return (
		<Box ref={wrapperRef} className={styles.assetsHomeWrapper} style={{ minHeight: `${mobileMinHeight}px` }}>
			<HomeScrollShadow />
			<HorizontalAccountsScrollList horizontalScrollWidth={horizontalScrollWidth} />
			<Box className={styles.homeAssetsTitleWrapper}>
				{isAllAccounts ? (
					<Text capitalizeFirstLetter color="strong" weight="strong" size="medium">
						{intl.formatMessage(messages.all_assets)}{' '}
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
		</Box>
	)
}

export default Home
