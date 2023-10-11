import React, { useMemo } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useNavigate, useParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { useScroll } from 'ui/src/components/scroll-area-radix/use-scroll'
import { TableWithEmptyState } from 'ui/src/components/table'
import { useBalances } from 'ui/src/hooks/dapp/use-balances'
import { useSelectedAccounts } from 'ui/src/hooks/use-accounts'
import { AssetAmountCell } from 'ui/src/pages/accounts/components/table/asset-amount-cell'
import { AssetChangeCell } from 'ui/src/pages/accounts/components/table/asset-change-cell'
import { AssetNameCell } from 'ui/src/pages/accounts/components/table/asset-name-cell'
import { AssetValueCell } from 'ui/src/pages/accounts/components/table/asset-value-cell'
import type { ResourceBalance, ResourceBalanceType } from 'ui/src/types/types'

import * as styles from '../components/table/styles.css'

const messages = defineMessages({
	address: {
		id: 'nft_collections.address',
		defaultMessage: 'NFT',
	},
	amount: {
		id: 'nft_collections.amount',
		defaultMessage: 'Balance',
	},
	value: {
		id: 'nft_collections.value',
		defaultMessage: 'Value',
	},
	change: {
		id: 'nft_collections.change',
		defaultMessage: 'Change',
	},
	empty_title: {
		id: 'nft_collections.empty_title',
		defaultMessage: 'No results',
	},
	empty_subtitle: {
		id: 'nft_collections.empty_subtitle',
		defaultMessage: 'Could not find any NFT collections in this account',
	},
})

const NftCollections: React.FC = () => {
	const intl = useIntl()
	const navigate = useNavigate()
	const { accountId, resourceId } = useParams()
	const { scrollableNode, isScrolledTop } = useScroll()
	const selectedAccounts = useSelectedAccounts()

	const { data: balanceData, isLoading } = useBalances(...selectedAccounts)
	const { nonFungibleBalances = [] } = balanceData || {}

	const handleRowSelected = (row: { original: ResourceBalance[ResourceBalanceType.NON_FUNGIBLE] }) => {
		const { original } = row
		navigate(`/accounts/${accountId}/nfts/${original.address}`)
	}

	const selectedRowIds = useMemo(() => {
		const idx = nonFungibleBalances.findIndex(b => b.address === resourceId)
		if (idx >= 0) {
			return {
				[idx]: true,
			}
		}
		return {}
	}, [resourceId, nonFungibleBalances])

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
			<TableWithEmptyState
				emptyStateTitle={intl.formatMessage(messages.empty_title)}
				emptyStateSubTitle={intl.formatMessage(messages.empty_subtitle)}
				styleVariant="primary"
				sizeVariant="large"
				scrollableNode={scrollableNode ?? undefined}
				data={nonFungibleBalances}
				columns={columns}
				isScrolledTop={isScrolledTop}
				onRowSelected={handleRowSelected}
				loading={isLoading}
				selectedRowIds={selectedRowIds}
				stickyShadowTop
				// loadMore={loadMore}
				// onEndReached={onEndReached}
			/>
		</Box>
	)
}

export default NftCollections
