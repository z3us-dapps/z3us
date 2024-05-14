import clsx from 'clsx'
import React, { useMemo } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { TableWithEmptyState } from 'ui/src/components/table'
import { useScroll } from 'ui/src/context/scroll'
import { useSelectedAccountsBalances } from 'ui/src/hooks/dapp/use-balances'
import type { ResourceBalance, ResourceBalanceType } from 'ui/src/types'

import { ResourceNameCell } from '../components/table/resource-name-cell'
import { ResourceValueCell } from '../components/table/resource-value-cell'
import * as styles from '../components/table/styles.css'

const messages = defineMessages({
	address: {
		id: '5ZxAiY',
		defaultMessage: 'Token',
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
		id: 'eWfIyf',
		defaultMessage: 'Could not find any tokens in this account',
	},
})

const Tokens: React.FC = () => {
	const intl = useIntl()
	const navigate = useNavigate()
	const { scrollableNode } = useScroll()
	const { accountId, resourceId } = useParams()
	const [searchParams] = useSearchParams()

	const {
		data: { tokensBalances = [] },
		isLoading,
	} = useSelectedAccountsBalances()

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
		navigate(`/accounts/${accountId}/tokens/${original.address}?${searchParams}`)
	}

	const columns = useMemo(
		() => [
			{
				Header: intl.formatMessage(messages.address),
				accessor: 'address',
				width: '60%',
				Cell: ResourceNameCell,
			},
			{
				Header: intl.formatMessage(messages.value),
				accessor: 'value',
				width: 'auto',
				Cell: ResourceValueCell,
			},
		],
		[],
	)

	return (
		<Box className={clsx(styles.tableWrapper, styles.tableTokensWrapper)}>
			<TableWithEmptyState
				emptyStateTitle={intl.formatMessage(messages.empty_title)}
				emptyStateSubTitle={intl.formatMessage(messages.empty_subtitle)}
				styleVariant="primary"
				sizeVariant="large"
				scrollableNode={scrollableNode ?? undefined}
				data={tokensBalances}
				columns={columns}
				onRowSelected={handleRowSelected}
				selectedRowIds={selectedRowIds}
				loading={isLoading}
			/>
		</Box>
	)
}

export default Tokens
