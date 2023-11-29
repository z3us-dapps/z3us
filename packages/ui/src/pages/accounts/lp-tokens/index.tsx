import React, { useMemo } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { useScroll } from 'ui/src/components/scroll-area-radix/use-scroll'
import { TableWithEmptyState } from 'ui/src/components/table'
import { useBalances } from 'ui/src/hooks/dapp/use-balances'
import { useSelectedAccounts } from 'ui/src/hooks/use-accounts'
import type { ResourceBalanceKind } from 'ui/src/types'

import * as styles from '../components/table/styles.css'
import { ValidatorCell } from '../components/table/validator-cell'
import { ValidatorChangeCell } from '../components/table/validator-change-cell'
import { ValidatorFeeCell } from '../components/table/validator-fee-cell'
import { ValidatorLiquidityCell } from '../components/table/validator-liquidity'
import { ValidatorValueCell } from '../components/table/validator-value-cell'

const messages = defineMessages({
	validator: {
		id: 'Ykb512',
		defaultMessage: 'Validator',
	},
	fee: {
		id: 'uT4OlP',
		defaultMessage: 'Fee',
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
				accessor: 'address',
				width: '25%',
				Cell: ValidatorCell,
			},
			{
				Header: intl.formatMessage(messages.fee),
				accessor: 'validator',
				width: '12%',
				Cell: ValidatorFeeCell,
			},
			{
				Header: intl.formatMessage(messages.amount),
				accessor: 'amount',
				width: 'auto',
				Cell: ValidatorLiquidityCell,
			},
			{
				Header: intl.formatMessage(messages.value),
				accessor: 'value',
				width: '18%',
				Cell: ValidatorValueCell,
			},
			{
				Header: intl.formatMessage(messages.change),
				accessor: 'change',
				width: '12%',
				Cell: ValidatorChangeCell,
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
