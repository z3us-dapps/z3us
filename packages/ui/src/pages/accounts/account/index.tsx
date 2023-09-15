import React from 'react'
import { useParams } from 'react-router-dom'
import useMeasure from 'react-use-measure'

import { Box } from 'ui/src/components/box'
import { CopyAddressButton } from 'ui/src/components/copy-address-button'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
import { useBalances } from 'ui/src/hooks/dapp/use-balances'
import { useSelectedAccounts, useWalletAccounts } from 'ui/src/hooks/use-accounts'
import { useIsAllAccounts } from 'ui/src/hooks/use-is-all-accounts'

import { AssetsList } from '../components/assets-list'
import { HomeScrollShadow } from '../components/home-scroll-shadow'
import { HorizontalAccountsScrollList } from '../components/horizontal-accounts-scroll-list'
import * as styles from './styles.css'

const Account: React.FC = () => {
	const { accountId = '-' } = useParams()
	const accounts = useWalletAccounts()

	const [wrapperRef, { width: horizontalScrollWidth }] = useMeasure()
	const accountName = accounts?.[accountId]?.name
	const isAllAccounts = useIsAllAccounts()

	const selectedAccounts = useSelectedAccounts()
	const { fungibleBalances, fungibleChange, fungibleValue, nonFungibleBalances, nonFungibleChange, nonFungibleValue } =
		useBalances(...selectedAccounts)

	return (
		<Box ref={wrapperRef} className={styles.assetsWrapper}>
			<HomeScrollShadow />

			<HorizontalAccountsScrollList horizontalScrollWidth={horizontalScrollWidth} />
			<Box className={styles.titleWrapper}>
				{isAllAccounts ? (
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
				fungibleValue={fungibleValue}
				fungibleChange={fungibleChange}
				nonFungibleBalances={nonFungibleBalances}
				nonFungibleValue={nonFungibleValue}
				nonFungibleChange={nonFungibleChange}
			/>
		</Box>
	)
}

export default Account
