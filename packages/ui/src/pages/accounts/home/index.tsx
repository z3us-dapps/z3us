import React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { CopyAddressButton } from 'ui/src/components/copy-address-button'
import { Text } from 'ui/src/components/typography'
import { useWalletAccounts } from 'ui/src/hooks/use-accounts'
import { useIsAllAccounts } from 'ui/src/hooks/use-is-all-accounts'

import { ActivityList } from '../components/activity-list/components/activity-list'
import { AssetsList } from '../components/assets-list'
import { HomeScrollShadow } from '../components/home-scroll-shadow'
import { HorizontalAccountsScrollList } from '../components/horizontal-accounts-scroll-list'
import { useIsActivitiesVisible } from '../hooks/use-is-activities-visible'
import * as styles from './styles.css'

const messages = defineMessages({
	all_assets: {
		id: 'P3IVGl',
		defaultMessage: 'All assets',
	},
})

const Home: React.FC = () => {
	const intl = useIntl()
	const { accountId = '-' } = useParams()
	const accounts = useWalletAccounts()
	const isAllAccounts = useIsAllAccounts()
	const isActivitiesVisible = useIsActivitiesVisible()
	const accountName = accounts?.[accountId]?.name

	return (
		<Box className={styles.assetsHomeWrapper}>
			<Box display={['none', 'block']}>
				<HomeScrollShadow />
				<HorizontalAccountsScrollList />
			</Box>
			<Box className={styles.homeAssetsTitleWrapper}>
				{isAllAccounts ? (
					<Text capitalizeFirstLetter color="strong" weight="strong" size="medium" truncate>
						{intl.formatMessage(messages.all_assets)}
					</Text>
				) : (
					<>
						<Text capitalizeFirstLetter color="strong" weight="strong" size="medium" truncate>
							{accountName}
						</Text>
						<CopyAddressButton address={accountId} />
					</>
				)}
			</Box>
			<Box height="full" display={['block', 'none']}>
				{isActivitiesVisible ? <ActivityList className={styles.activityList} /> : <AssetsList />}
			</Box>
			<Box height="full" display={['none', 'block']}>
				<AssetsList />
			</Box>
		</Box>
	)
}

export default Home
