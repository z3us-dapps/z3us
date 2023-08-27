import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { useScroll } from 'ui/src/components/scroll-area-radix/use-scroll'
import { Table } from 'ui/src/components/table'
import { useNonFungibleResourceBalances } from 'ui/src/hooks/dapp/use-balances'
import { AssetAmountCell } from 'ui/src/pages/accounts/components/table/asset-amount-cell'
import { AssetChangeCell } from 'ui/src/pages/accounts/components/table/asset-change-cell'
import { AssetNameCell } from 'ui/src/pages/accounts/components/table/asset-name-cell'
import { AssetValueCell } from 'ui/src/pages/accounts/components/table/asset-value-cell'
import type { ResourceBalance } from 'ui/src/types/types'

import * as styles from './styles.css'

const columns = [
	{
		Header: 'NFT',
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

	const { balances, isLoading } = useNonFungibleResourceBalances(accountId === '-' ? undefined : accountId)

	const handleRowSelected = (row: { original: ResourceBalance }) => {
		const { original } = row
		navigate(`/accounts/${accountId}/nfts/${original.address}`)
	}

	return (
		<Box className={styles.tableWrapper}>
			<Table
				className={styles.tableMinHeightWrapper}
				styleVariant="primary"
				sizeVariant="large"
				scrollableNode={scrollableNode ?? undefined}
				data={balances}
				columns={columns}
				isScrolledTop={isScrolledTop}
				onRowSelected={handleRowSelected}
				loading={isLoading}
				// loadMore={loadMore}
				// onEndReached={onEndReached}
			/>
		</Box>
	)
}

export default Fungibles
