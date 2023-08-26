import clsx from 'clsx'
import { ResourceImageIcon } from 'packages/ui/src/components/resource-image-icon'
import { useGlobalResourceBalances } from 'packages/ui/src/hooks/dapp/use-balances'
import { useNoneSharedStore } from 'packages/ui/src/hooks/use-store'
import type { AddressBookEntry } from 'packages/ui/src/store/types'
import { formatBigNumber, formatChange } from 'packages/ui/src/utils/formatters'
import React from 'react'

import { Box } from 'ui/src/components/box'
import Loader from 'ui/src/components/loader'
import { Link } from 'ui/src/components/router-link'
import { Text } from 'ui/src/components/typography'

import { OverlayAssetIcons } from '../../../components/overlay-asset-icons'
import * as styles from '../../../styles.css'

interface IProps {
	account: AddressBookEntry
	isHovered: boolean
	onSelect: (id: string | null) => void
}

const AccountRow: React.FC<IProps> = ({ account, isHovered, onSelect }) => {
	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))

	const { balances, isLoading, totalChange, totalValue } = useGlobalResourceBalances(account.address)

	if (isLoading) return <Loader />

	return (
		<Box component="li" className={styles.assetsHomeListLi}>
			<Link
				to={`/accounts/${account.address}`}
				className={clsx(styles.assetsHomeListLink, isHovered && styles.assetsHomeListLinkHover)}
				onMouseOver={() => onSelect(account.address)}
				onMouseLeave={() => onSelect(null)}
				underline="never"
			>
				<Box className={styles.assetsHomeListTitleWrapper}>
					<ResourceImageIcon size="large" address={account.address} />
					<Box>
						<Text capitalizeFirstLetter color="strong" weight="medium" size="small">
							{account.name}
						</Text>
						<Box className={styles.assetsHomeListTitleWrapper}>
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
				balances={balances}
				accountId={account.address}
				onButtonMouseOver={() => onSelect(account.address)}
			/>
		</Box>
	)
}

export default AccountRow
