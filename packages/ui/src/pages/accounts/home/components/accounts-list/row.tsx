import clsx from 'clsx'
import React from 'react'

import { Box } from 'ui/src/components/box'
import Loader from 'ui/src/components/loader'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import { Link } from 'ui/src/components/router-link'
import { Text } from 'ui/src/components/typography'
import { useBalances } from 'ui/src/hooks/dapp/use-balances'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import { OverlayAssetIcons } from 'ui/src/pages/accounts/components/overlay-asset-icons'
import type { AddressBookEntry } from 'ui/src/store/types'
import { formatBigNumber, formatChange } from 'ui/src/utils/formatters'

import * as styles from './styles.css'

interface IProps {
	account: AddressBookEntry
	isHovered: boolean
	onSelect: (id: string | null) => void
}

const AccountRow: React.FC<IProps> = ({ account, isHovered, onSelect }) => {
	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))

	const { fungibleBalances, nonFungibleBalances, isLoading, totalChange, totalValue } = useBalances(
		account.address,
	)

	if (isLoading) return <Loader />

	return (
		<Box component="li" className={styles.assetsListLi}>
			<Link
				to={`/accounts/${account.address}`}
				className={clsx(styles.assetsListLink, isHovered && styles.assetsListLinkHover)}
				onMouseOver={() => onSelect(account.address)}
				onMouseLeave={() => onSelect(null)}
				underline="never"
			>
				<Box className={styles.assetsListTitleWrapper}>
					<ResourceImageIcon size="large" address={account.address} />
					<Box>
						<Text capitalizeFirstLetter color="strong" weight="medium" size="small">
							{account.name}
						</Text>
						<Box className={styles.assetsListTitleWrapper}>
							<Text weight="strong" size="small" color="strong" truncate>
								{formatBigNumber(totalValue, currency, 2)}
							</Text>
							<Text size="small" color={totalChange && totalChange.gt(0) ? 'green' : 'red'} truncate>
								{formatChange(totalChange)}
							</Text>
						</Box>
					</Box>
				</Box>
			</Link>
			<OverlayAssetIcons
				resourceType="token"
				balances={fungibleBalances}
				onButtonMouseOver={() => onSelect(account.address)}
			/>
			<OverlayAssetIcons
				resourceType="nft"
				balances={nonFungibleBalances}
				onButtonMouseOver={() => onSelect(account.address)}
			/>
		</Box>
	)
}

export default AccountRow
