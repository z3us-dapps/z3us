import React, { useMemo } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { useScroll } from 'ui/src/components/scroll-area-radix/use-scroll'
import { TableWithEmptyState } from 'ui/src/components/table'
import { useBalances } from 'ui/src/hooks/dapp/use-balances'
import { useSelectedAccounts } from 'ui/src/hooks/use-accounts'
import { AssetAmountCell } from 'ui/src/pages/accounts/components/table/asset-amount-cell'
import { AssetChangeCell } from 'ui/src/pages/accounts/components/table/asset-change-cell'
import { AssetNameCell } from 'ui/src/pages/accounts/components/table/asset-name-cell'
import { AssetValueCell } from 'ui/src/pages/accounts/components/table/asset-value-cell'
import * as styles from 'ui/src/pages/accounts/components/table/styles.css'
import { ValidatorCell } from 'ui/src/pages/accounts/components/table/validator-cell'
import type { ResourceBalanceKind } from 'ui/src/types'

const messages = defineMessages({
	address: {
		id: 'lPDfi7',
		defaultMessage: 'LP Token',
	},
	validator: {
		id: 'Ykb512',
		defaultMessage: 'Validator',
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
	empty_title: {
		id: 'jHJmjf',
		defaultMessage: 'No results',
	},
	empty_subtitle: {
		id: '5b2WMl',
		defaultMessage: 'Could not find any liquidity pool tokens in this account',
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
	const { liquidityPoolTokensBalances = [] } = balanceData || {}

	const selectedRowIds = useMemo(() => {
		const idx = liquidityPoolTokensBalances.findIndex(b => b.address === resourceId)
		if (idx >= 0) {
			return {
				[idx]: true,
			}
		}
		return {}
	}, [resourceId, liquidityPoolTokensBalances])

	const handleRowSelected = (row: { original: ResourceBalanceKind }) => {
		const { original } = row
		navigate(`/accounts/${accountId}/lp-tokens/${original.address}?${searchParams}`)
	}

	const columns = useMemo(
		() => [
			{
				Header: intl.formatMessage(messages.validator),
				accessor: 'validator',
				width: 'auto',
				Cell: ValidatorCell,
			},
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
			},
			{
				Header: intl.formatMessage(messages.value),
				accessor: 'value',
				width: 'auto',
				Cell: AssetValueCell,
			},
			{
				Header: intl.formatMessage(messages.change),
				accessor: 'change',
				width: 'auto',
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
				data={liquidityPoolTokensBalances}
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
