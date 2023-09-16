import React, { useMemo } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useNavigate, useParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { EmptyState } from 'ui/src/components/empty-state'
import { useScroll } from 'ui/src/components/scroll-area-radix/use-scroll'
import { Table } from 'ui/src/components/table'
import { useBalances } from 'ui/src/hooks/dapp/use-balances'
import { useSelectedAccounts } from 'ui/src/hooks/use-accounts'
import { AssetAmountCell } from 'ui/src/pages/accounts/components/table/asset-amount-cell'
import { AssetChangeCell } from 'ui/src/pages/accounts/components/table/asset-change-cell'
import { AssetNameCell } from 'ui/src/pages/accounts/components/table/asset-name-cell'
import { AssetValueCell } from 'ui/src/pages/accounts/components/table/asset-value-cell'
import type { ResourceBalanceKind } from 'ui/src/types/types'

import * as styles from './styles.css'

const messages = defineMessages({
	address: {
		id: 'tokens.address',
		defaultMessage: 'Token',
	},
	amount: {
		id: 'tokens.amount',
		defaultMessage: 'Balance',
	},
	value: {
		id: 'tokens.value',
		defaultMessage: 'Value',
	},
	change: {
		id: 'tokens.change',
		defaultMessage: 'Change',
	},
	empty_title: {
		id: 'tokens.empty_title',
		defaultMessage: 'No results',
	},
	empty_subtitle: {
		id: 'tokens.empty_subtitle',
		defaultMessage: 'Could not find any NFTs in this account',
	},
})

const Tokens: React.FC = () => {
	const intl = useIntl()
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

	const columns = useMemo(
		() => [
			{
				Header: intl.formatMessage(messages.address),
				accessor: 'address',
				width: 'auto',
				Cell: AssetNameCell,
			},
			{
				Header: intl.formatMessage(messages.amount),
				accessor: 'amount',
				width: 'auto',
				Cell: AssetAmountCell,
				className: styles.mobileHideTableCellWrapper,
			},
			{
				Header: intl.formatMessage(messages.value),
				accessor: 'value',
				width: 'auto',
				Cell: AssetValueCell,
				className: styles.mobileHideTableCellWrapper,
			},
			{
				Header: intl.formatMessage(messages.change),
				accessor: 'change',
				width: 'auto',
				Cell: AssetChangeCell,
				className: styles.mobileHideTableCellWrapper,
			},
		],
		[],
	)

	return (
		<Box className={styles.tableWrapper}>
			{fungibleBalances?.length === 0 ? (
				<Box display="flex" alignItems="center" justifyContent="center" width="full" paddingY="xxlarge">
					<EmptyState
						title={intl.formatMessage(messages.empty_title)}
						subTitle={intl.formatMessage(messages.empty_subtitle)}
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
