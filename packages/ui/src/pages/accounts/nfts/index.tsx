import { t } from 'i18next'
import { Box } from 'packages/ui/src/components/box'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { EmptyState } from 'ui/src/components/empty-state'
import { useScroll } from 'ui/src/components/scroll-area-radix/use-scroll'
import { Table } from 'ui/src/components/table'
import { useSelectedAccounts } from 'ui/src/hooks/dapp/use-accounts'
import { useBalances } from 'ui/src/hooks/dapp/use-balances'
import { AssetAmountCell } from 'ui/src/pages/accounts/components/table/asset-amount-cell'
import { AssetChangeCell } from 'ui/src/pages/accounts/components/table/asset-change-cell'
import { AssetNameCell } from 'ui/src/pages/accounts/components/table/asset-name-cell'
import { AssetValueCell } from 'ui/src/pages/accounts/components/table/asset-value-cell'
import type { ResourceBalanceKind } from 'ui/src/types/types'

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

const NFTs: React.FC = () => {
	const { scrollableNode, isScrolledTop } = useScroll()
	const navigate = useNavigate()
	const { accountId } = useParams()

	const selectedAccounts = useSelectedAccounts()
	const { nonFungibleBalances, isLoading } = useBalances(...selectedAccounts)

	const handleRowSelected = (row: { original: ResourceBalanceKind }) => {
		const { original } = row
		navigate(`/accounts/${accountId}/nfts/${original.address}`)
	}

	return (
		<Box className={styles.tableWrapper}>
			{nonFungibleBalances?.length === 0 ? (
				<Box display="flex" alignItems="center" justifyContent="center" width="full" paddingY="xxlarge">
					<EmptyState
						title={t('accounts.nfts.noNftsEmptyStateTitle')}
						subTitle={t('accounts.nfts.noNftsEmptyStateSubTitle')}
					/>
				</Box>
			) : (
				<Table
					className={styles.tableMinHeightWrapper}
					styleVariant="primary"
					sizeVariant="large"
					scrollableNode={scrollableNode ?? undefined}
					data={nonFungibleBalances}
					columns={columns}
					isScrolledTop={isScrolledTop}
					onRowSelected={handleRowSelected}
					loading={isLoading}
					// loadMore={loadMore}
					// onEndReached={onEndReached}
				/>
			)}
		</Box>
	)
}

export default NFTs
