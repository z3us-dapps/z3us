import React, { useMemo } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { useScroll } from 'ui/src/components/scroll-area-radix/use-scroll'
import { TableWithEmptyState } from 'ui/src/components/table'
import { useBalances } from 'ui/src/hooks/dapp/use-balances'
import { useSelectedAccounts } from 'ui/src/hooks/use-accounts'
import { AssetAmountCell } from 'ui/src/pages/accounts/components/table/asset-amount-cell'
import { PoolCell } from 'ui/src/pages/accounts/components/table/pool-cell'
import * as styles from 'ui/src/pages/accounts/components/table/styles.css'
import type { ResourceBalanceKind } from 'ui/src/types'

import { AssetChangeCell } from '../components/table/asset-change-cell'
import { AssetValueCell } from '../components/table/asset-value-cell'
import { PoolLiquidityCell } from '../components/table/pool-liquidity'
import { PoolResourcesCell } from '../components/table/pool-resources-cell'

const messages = defineMessages({
	address: {
		id: '+ZvWOP',
		defaultMessage: 'Pool Unit',
	},
	pool: {
		id: '11oARw',
		defaultMessage: 'Pool',
	},
	amount: {
		id: 'H5+NAX',
		defaultMessage: 'Balance',
	},
	value: {
		id: 'GufXy5',
		defaultMessage: 'Value',
	},
	change: {
		id: 'BY343C',
		defaultMessage: 'Change',
	},
	liquidity: {
		id: 'ctieLo',
		defaultMessage: 'Liquidity',
	},
	empty_title: {
		id: 'jHJmjf',
		defaultMessage: 'No results',
	},
	empty_subtitle: {
		id: '7EL6GH',
		defaultMessage: 'Could not find any pool units in this account',
	},
})

const Tokens: React.FC = () => {
	const intl = useIntl()
	const navigate = useNavigate()
	const { scrollableNode, isScrolledTop } = useScroll()
	const { accountId, resourceId } = useParams()
	const [searchParams] = useSearchParams()
	const selectedAccounts = useSelectedAccounts()

	const { data: balanceData, isLoading } = useBalances(...selectedAccounts)
	const { poolUnitsBalances = [] } = balanceData || {}

	const selectedRowIds = useMemo(() => {
		const idx = poolUnitsBalances.findIndex(b => b.address === resourceId)
		if (idx >= 0) {
			return {
				[idx]: true,
			}
		}
		return {}
	}, [resourceId, poolUnitsBalances])

	const handleRowSelected = (row: { original: ResourceBalanceKind }) => {
		const { original } = row
		navigate(`/accounts/${accountId}/pool-units/${original.address}?${searchParams}`)
	}

	const columns = useMemo(
		() => [
			{
				Header: intl.formatMessage(messages.address),
				accessor: 'address',
				width: '20%',
				Cell: PoolCell,
			},
			{
				Header: intl.formatMessage(messages.pool),
				accessor: 'pool',
				width: '10%',
				Cell: PoolResourcesCell,
			},
			{
				Header: intl.formatMessage(messages.amount),
				accessor: 'amount',
				width: 'auto',
				Cell: AssetAmountCell,
			},
			{
				Header: intl.formatMessage(messages.liquidity),
				accessor: 'vaults',
				width: 'auto',
				Cell: PoolLiquidityCell,
			},
			{
				Header: intl.formatMessage(messages.value),
				accessor: 'value',
				width: '12%',
				Cell: AssetValueCell,
			},
			{
				Header: intl.formatMessage(messages.change),
				accessor: 'change',
				width: '12%',
				Cell: AssetChangeCell,
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
				data={poolUnitsBalances}
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

export default Tokens
