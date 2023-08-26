import clsx from 'clsx'
import Loader from 'packages/ui/src/components/loader'
import { useFungibleResourceBalances, useNonFungibleResourceBalances } from 'packages/ui/src/hooks/dapp/use-balances'
import { useNoneSharedStore } from 'packages/ui/src/hooks/use-store'
import { formatBigNumber, formatChange } from 'packages/ui/src/utils/formatters'
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { CopyAddressButton } from 'ui/src/components/copy-address-button'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
import { useWalletAccounts } from 'ui/src/hooks/use-wallet-account'

import { AccountTotalValue } from '../components/account-total-value'
import { MobileScrollingBackground } from '../components/mobile-scrolling-background'
import { MobileScrollingButtons } from '../components/mobile-scrolling-buttons'
import { OverlayAssetIcons } from '../components/overlay-asset-icons'
import * as styles from '../styles.css'

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

	return (
		<Box className={clsx(styles.accountRoutesWrapper)}>
			<Box className={styles.accountRoutesScrollingWrapper}>
				<MobileScrollingBackground />
				<MobileScrollingButtons />
				<AccountTotalValue account={accountId !== '-' ? accountId : ''} />
				<Box className={styles.assetsHomeWrapper}>
					{isLoading ? (
						<Loader />
					) : (
						<>
							<Box className={styles.assetsHomeTitleWrapper}>
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
							<Box component="ul" className={styles.assetsHomeList}>
								<Box component="li" className={styles.assetsHomeListLi}>
									<Link
										to={`/accounts/${accountId}/${TOKENS_PATH}`}
										className={clsx(
											styles.assetsHomeListLink,
											hoveredLink === TOKENS_PATH && styles.assetsHomeListLinkHover,
										)}
										onMouseOver={() => setHoveredLink(TOKENS_PATH)}
										onMouseLeave={() => setHoveredLink(null)}
									>
										<Box className={styles.assetsHomeListTitleWrapper}>
											<Text capitalizeFirstLetter color="strong" weight="medium" size="small">
												<Translation capitalizeFirstLetter text="accounts.home.fungiblesTitle" />{' '}
											</Text>
											{fungibleBalances.length > 0 && (
												<Text size="small" truncate>
													({fungibleBalances.length})
												</Text>
											)}
										</Box>
										<Box className={styles.assetsHomeListTitleWrapper}>
											<Text weight="strong" size="small" color="strong" truncate>
												{formatBigNumber(fungibleTotalValue, currency, 2)}
											</Text>
											<Text
												size="small"
												color={fungibleTotalChange && fungibleTotalChange.gt(0) ? 'green' : 'red'}
												truncate
											>
												{formatChange(fungibleTotalChange)}
											</Text>
										</Box>
									</Link>
									<OverlayAssetIcons
										balances={fungibleBalances}
										accountId={accountId}
										onButtonMouseOver={() => setHoveredLink(TOKENS_PATH)}
									/>
								</Box>
								<Box component="li" className={styles.assetsHomeListLi}>
									<Link
										to={`/accounts/${accountId}/${NFTS_PATH}`}
										className={clsx(
											styles.assetsHomeListLink,
											hoveredLink === NFTS_PATH && styles.assetsHomeListLinkHover,
										)}
										onMouseOver={() => setHoveredLink(NFTS_PATH)}
										onMouseLeave={() => setHoveredLink(null)}
									>
										<Box className={styles.assetsHomeListTitleWrapper}>
											<Text capitalizeFirstLetter color="strong" weight="medium" size="small">
												<Translation capitalizeFirstLetter text="accounts.home.nonFungiblesTitle" />
											</Text>
											{nonFungibleBalances.length > 0 && (
												<Text size="small" truncate>
													({nonFungibleBalances.length})
												</Text>
											)}
										</Box>
										<Box className={styles.assetsHomeListTitleWrapper}>
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
										balances={nonFungibleBalances}
										accountId={accountId}
										onButtonMouseOver={() => setHoveredLink(TOKENS_PATH)}
									/>
								</Box>
							</Box>
						</>
					)}
				</Box>
			</Box>
		</Box>
	)
}

export default Account
