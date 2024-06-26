import clsx from 'clsx'
import React, { useMemo } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { TableWithEmptyState } from 'ui/src/components/table'
import { useScroll } from 'ui/src/context/scroll'
import { useSelectedAccountsBalances } from 'ui/src/hooks/dapp/use-balances'
import { PoolLiquidityCell } from 'ui/src/pages/accounts/components/table/pool-liquidity-cell'
import { PoolNameCell } from 'ui/src/pages/accounts/components/table/pool-name-cell'
import { ResourceValueCell } from 'ui/src/pages/accounts/components/table/resource-value-cell'
import * as styles from 'ui/src/pages/accounts/components/table/styles.css'
import type { ResourceBalanceKind } from 'ui/src/types'

const messages = defineMessages({
	pool: {
		id: '11oARw',
		defaultMessage: 'Pool',
	},
	value: {
		id: 'GufXy5',
		defaultMessage: 'Value',
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

const LPUs: React.FC = () => {
	const intl = useIntl()
	const navigate = useNavigate()
	const { scrollableNode } = useScroll()
	const { accountId, resourceId } = useParams()
	const [searchParams] = useSearchParams()

	const {
		data: { poolUnitsBalances = [] },
		isLoading,
	} = useSelectedAccountsBalances()

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
		navigate(`/accounts/${accountId}/lpus/${original.address}?${searchParams}`)
	}

	const columns = useMemo(
		() => [
			{
				Header: intl.formatMessage(messages.pool),
				accessor: 'pool',
				width: '40%',
				Cell: PoolNameCell,
			},
			{
				Header: intl.formatMessage(messages.value),
				accessor: 'value',
				width: '15%',
				Cell: ResourceValueCell,
			},
			{
				Header: intl.formatMessage(messages.liquidity),
				accessor: 'vaults',
				width: 'auto',
				Cell: PoolLiquidityCell,
			},
		],
		[],
	)

	return (
		<Box className={clsx(styles.tableWrapper, styles.tableLpusWrapper)}>
			<TableWithEmptyState
				emptyStateTitle={intl.formatMessage(messages.empty_title)}
				emptyStateSubTitle={intl.formatMessage(messages.empty_subtitle)}
				styleVariant="primary"
				sizeVariant="large"
				scrollableNode={scrollableNode ?? undefined}
				data={poolUnitsBalances}
				columns={columns}
				onRowSelected={handleRowSelected}
				selectedRowIds={selectedRowIds}
				loading={isLoading}
			/>
		</Box>
	)
}

export default LPUs
