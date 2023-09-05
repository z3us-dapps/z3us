import { t } from 'i18next'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
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

const Tokens: React.FC = () => {
	const { scrollableNode, isScrolledTop } = useScroll()
	const navigate = useNavigate()
	const { accountId, resourceId } = useParams()

	const selectedAccounts = useSelectedAccounts()
	const { fungibleBalances, isLoading } = useBalances(...selectedAccounts)

	const selectedRowIds = React.useMemo(() => {
		const idx = fungibleBalances.findIndex(b => b.address === resourceId)
		if (idx >= 0) {
			return {
				[idx]: true,
			}
		}
		return {}
	}, [resourceId, isLoading, accountId])

	const handleRowSelected = (row: { original: ResourceBalanceKind }) => {
		const { original } = row
		navigate(`/accounts/${accountId}/tokens/${original.address}`)
	}

	return (
		<Box className={styles.tableWrapper}>
			{fungibleBalances?.length === 0 ? (
				<Box display="flex" alignItems="center" justifyContent="center" width="full" paddingY="xxlarge">
					<EmptyState
						title={t('accounts.tokens.noTokensEmptyStateTitle')}
						subTitle={t('accounts.tokens.noTokensEmptyStateSubTitle')}
					/>
				</Box>
			) : (
				<Table
					className={styles.tableMinHeightWrapper}
					styleVariant="primary"
					sizeVariant="large"
					scrollableNode={scrollableNode ?? undefined}
					data={fungibleBalances}
					columns={columns}
					isScrolledTop={isScrolledTop}
					onRowSelected={handleRowSelected}
					loading={isLoading}
					selectedRowIds={selectedRowIds}
					// loadMore={loadMore}
					// onEndReached={onEndReached}
				/>
			)}
		</Box>
	)
}

export default Tokens
