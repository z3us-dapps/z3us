import React from 'react'
import { useParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { CopyAddressButton } from 'ui/src/components/copy-address-button'
import Loader from 'ui/src/components/loader'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
import { useFungibleResourceBalances, useNonFungibleResourceBalances } from 'ui/src/hooks/dapp/use-balances'
import { useWalletAccounts } from 'ui/src/hooks/use-wallet-account'

import { AssetsList } from '../components/assets-list'
import { HomeScrollShadow } from '../components/home-scroll-shadow'
import * as styles from './styles.css'

const Account: React.FC = () => {
	const { accountId = '-' } = useParams()
	const accounts = useWalletAccounts()
	const accountName = accounts?.[accountId]?.name
	const isAllAccount = accountId === '-'

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

	if (isLoading) return <Loader />

	return (
		<Box className={styles.assetsWrapper}>
			<HomeScrollShadow />
			<Box className={styles.titleWrapper}>
				{isAllAccount ? (
					<Text capitalizeFirstLetter color="strong" weight="strong" size="medium">
						<Translation capitalizeFirstLetter text="accounts.home.allAssets" />{' '}
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
			<AssetsList
				accountId={accountId}
				fungibleBalances={fungibleBalances}
				fungibleTotalValue={fungibleTotalValue}
				fungibleTotalChange={fungibleTotalChange}
				nonFungibleBalances={nonFungibleBalances}
				nonFungibleTotalValue={nonFungibleTotalValue}
				nonFungibleTotalChange={nonFungibleTotalChange}
			/>
		</Box>
	)
}

export default Account
