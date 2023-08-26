import clsx from 'clsx'
import { useScroll } from 'packages/ui/src/components/scroll-area-radix/use-scroll'
import { useFungibleResourceBalances } from 'packages/ui/src/hooks/dapp/use-balances'
import type { ResourceBalance } from 'packages/ui/src/types/types'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import * as tableHeadStyles from 'ui/src/components/styles/table-head-shadow.css'
import { Table } from 'ui/src/components/table'

import { AccountTotalValue } from '../components/account-total-value'
import { MobileScrollingBackground } from '../components/mobile-scrolling-background'
import { MobileScrollingButtons } from '../components/mobile-scrolling-buttons'
import * as styles from '../styles.css'
import { AssetAmountCell } from './components/asset-amount-cell'
import { AssetChangeCell } from './components/asset-change-cell'
import { AssetNameCell } from './components/asset-name-cell'
import { AssetValueCell } from './components/asset-value-cell'

const columns = [
	{
		Header: 'Token',
		accessor: 'address',
		width: 'auto',
		Cell: AssetNameCell,
	},
	{
		Header: 'Balance',
		accessor: 'amount',
		width: 'auto',
		Cell: AssetAmountCell,
		className: styles.mobileHideTableCellWrapper,
	},
	{
		Header: 'Value',
		accessor: 'value',
		width: 'auto',
		Cell: AssetValueCell,
		className: styles.mobileHideTableCellWrapper,
	},
	{
		Header: 'Change',
		accessor: 'change',
		width: 'auto',
		Cell: AssetChangeCell,
		className: styles.mobileHideTableCellWrapper,
	},
]

const Fungibles: React.FC = () => {
	const { scrollableNode, isScrolledTop } = useScroll()
	const navigate = useNavigate()
	const { accountId } = useParams()

	const { balances, isLoading } = useFungibleResourceBalances(accountId === '-' ? undefined : accountId)

	const handleRowSelected = (row: { original: ResourceBalance }) => {
		const { original } = row
		navigate(`/accounts/${accountId}/tokens/${original.address}`)
	}

	return (
		<Box
			className={clsx(styles.accountRoutesWrapper, !isLoading && !isScrolledTop && tableHeadStyles.accountTheadShadow)}
		>
			<Box className={styles.accountRoutesScrollingWrapper}>
				<MobileScrollingBackground />
				<MobileScrollingButtons />
				<AccountTotalValue account={accountId !== '-' ? accountId : ''} />
				<Box className={styles.assetsTableWrapper}>
					<Table
						className={styles.accountsTableMinHeightWrapper}
						styleVariant="primary"
						sizeVariant="large"
						scrollableNode={scrollableNode ?? undefined}
						data={balances}
						columns={columns}
						isScrolledTop={isScrolledTop}
						loading={isLoading}
						// loadMore={loadMore}
						onRowSelected={handleRowSelected}
						// onEndReached={onEndReached}
					/>
				</Box>
			</Box>
		</Box>
	)
}

export default Fungibles
