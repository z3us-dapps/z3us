import clsx from 'clsx'
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { CopyAddressButton } from 'ui/src/components/copy-address-button'
import Loader from 'ui/src/components/loader'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
import { useFungibleResourceBalances, useNonFungibleResourceBalances } from 'ui/src/hooks/dapp/use-balances'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import { useWalletAccounts } from 'ui/src/hooks/use-wallet-account'
import { OverlayAssetIcons } from 'ui/src/pages/accounts/components/overlay-asset-icons'
import { formatBigNumber, formatChange } from 'ui/src/utils/formatters'

import { HomeScrollShadow } from '../components/home-scroll-shadow'
import * as styles from './styles.css'

const TOKENS_PATH = 'tokens'
const NFTS_PATH = 'nfts'

const Account: React.FC = () => {
	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))
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
	const [hoveredLink, setHoveredLink] = useState<string | null>(null)

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
			<Box component="ul" className={styles.assetsList}>
				<Box component="li" className={styles.assetsListLi}>
					<Link
						to={`/accounts/${accountId}/${TOKENS_PATH}`}
						className={clsx(styles.assetsListLink, hoveredLink === TOKENS_PATH && styles.assetsListLinkHover)}
						onMouseOver={() => setHoveredLink(TOKENS_PATH)}
						onMouseLeave={() => setHoveredLink(null)}
					>
						<Box className={styles.assetsListTitleWrapper}>
							<Text capitalizeFirstLetter color="strong" weight="medium" size="small">
								<Translation capitalizeFirstLetter text="accounts.home.fungiblesTitle" />{' '}
							</Text>
							{fungibleBalances.length > 0 && (
								<Text size="small" truncate>
									({fungibleBalances.length})
								</Text>
							)}
						</Box>
						<Box className={styles.assetsListTitleWrapper}>
							<Text weight="strong" size="small" color="strong" truncate>
								{formatBigNumber(fungibleTotalValue, currency, 2)}
							</Text>
							<Text size="small" color={fungibleTotalChange && fungibleTotalChange.gt(0) ? 'green' : 'red'} truncate>
								{formatChange(fungibleTotalChange)}
							</Text>
						</Box>
					</Link>
					<OverlayAssetIcons
						resourceType="token"
						balances={fungibleBalances}
						onButtonMouseOver={() => setHoveredLink(TOKENS_PATH)}
					/>
				</Box>
				<Box component="li" className={styles.assetsListLi}>
					<Link
						to={`/accounts/${accountId}/${NFTS_PATH}`}
						className={clsx(styles.assetsListLink, hoveredLink === NFTS_PATH && styles.assetsListLinkHover)}
						onMouseOver={() => setHoveredLink(NFTS_PATH)}
						onMouseLeave={() => setHoveredLink(null)}
					>
						<Box className={styles.assetsListTitleWrapper}>
							<Text capitalizeFirstLetter color="strong" weight="medium" size="small">
								<Translation capitalizeFirstLetter text="accounts.home.nonFungiblesTitle" />
							</Text>
							{nonFungibleBalances.length > 0 && (
								<Text size="small" truncate>
									({nonFungibleBalances.length})
								</Text>
							)}
						</Box>
						<Box className={styles.assetsListTitleWrapper}>
							<Text weight="strong" size="small" color="strong" truncate>
								{formatBigNumber(nonFungibleTotalValue, currency, 2)}
							</Text>
							<Text
								size="small"
								color={nonFungibleTotalChange && nonFungibleTotalChange.gt(0) ? 'green' : 'red'}
								truncate
							>
								{formatChange(nonFungibleTotalChange)}
							</Text>
						</Box>
					</Link>
					<OverlayAssetIcons
						resourceType="nft"
						balances={nonFungibleBalances}
						onButtonMouseOver={() => setHoveredLink(NFTS_PATH)}
					/>
				</Box>
			</Box>
		</Box>
	)
}

export default Account
