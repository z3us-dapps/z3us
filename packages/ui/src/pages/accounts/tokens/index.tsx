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
import { useIsActivitiesVisible } from 'ui/src/pages/accounts/hooks/use-is-activities-visible'
import type { ResourceBalance, ResourceBalanceType } from 'ui/src/types/types'

import { ActivityList } from '../components/activity-list/components/activity-list'
import * as styles from '../components/table/styles.css'

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
		defaultMessage: 'Could not find any tokens in this account',
	},
})

const Tokens: React.FC = () => {
	const intl = useIntl()
	const navigate = useNavigate()
	const { scrollableNode, isScrolledTop } = useScroll()
	const { accountId, resourceId } = useParams()
	const selectedAccounts = useSelectedAccounts()

	const isActivitiesVisible = useIsActivitiesVisible()

	const { data: balanceData, isLoading } = useBalances(...selectedAccounts)
	const { tokensBalances = [] } = balanceData || {}

	const selectedRowIds = useMemo(() => {
		const idx = tokensBalances.findIndex(b => b.address === resourceId)
		if (idx >= 0) {
			return {
				[idx]: true,
			}
		}
		return {}
	}, [resourceId, tokensBalances])

	const handleRowSelected = (row: { original: ResourceBalance[ResourceBalanceType.FUNGIBLE] }) => {
		const { original } = row
		navigate(`/accounts/${accountId}/tokens/${original.address}`)
	}

	const columns = useMemo(
		() => [
			{
				Header: intl.formatMessage(messages.address),
				accessor: 'address',
				width: '40%',
				Cell: AssetNameCell,
			},
			{
				Header: intl.formatMessage(messages.amount),
				accessor: 'amount',
				width: '30%',
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

	const table =
		tokensBalances?.length === 0 ? (
			<Box display="flex" alignItems="center" justifyContent="center" width="full" paddingY="xxlarge">
				<EmptyState
					title={intl.formatMessage(messages.empty_title)}
					subTitle={intl.formatMessage(messages.empty_subtitle)}
				/>
			</Box>
		) : (
			<Table
				styleVariant="primary"
				sizeVariant="large"
				scrollableNode={scrollableNode ?? undefined}
				data={tokensBalances}
				columns={columns}
				isScrolledTop={isScrolledTop}
				onRowSelected={handleRowSelected}
				loading={isLoading}
				selectedRowIds={selectedRowIds}
				stickyShadowTop
				// loadMore={loadMore}
				// onEndReached={onEndReached}
			/>
		)

	return <Box className={styles.tableWrapper}>{isActivitiesVisible ? <ActivityList /> : table}</Box>
}

export default Tokens
