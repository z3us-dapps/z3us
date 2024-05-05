import React, { useMemo } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { useScroll } from 'ui/src/components/scroll-area-native'
import { TableWithEmptyState } from 'ui/src/components/table'
import { useSelectedAccountsBalances } from 'ui/src/hooks/dapp/use-balances'
import { ResourceNameCell } from 'ui/src/pages/accounts/components/table/resource-name-cell'
import * as styles from 'ui/src/pages/accounts/components/table/styles.css'
import type { ResourceBalance, ResourceBalanceType } from 'ui/src/types'

const messages = defineMessages({
	address: {
		id: 'W2OoOl',
		defaultMessage: 'NFT',
	},
	amount: {
		id: 'H5+NAX',
		defaultMessage: 'Balance',
	},
	empty_title: {
		id: 'jHJmjf',
		defaultMessage: 'No results',
	},
	empty_subtitle: {
		id: '1pfIY9',
		defaultMessage: 'Could not find any NFT collections in this account',
	},
})

const NftCollections: React.FC = () => {
	const intl = useIntl()
	const navigate = useNavigate()
	const { accountId, resourceId } = useParams()
	const [searchParams] = useSearchParams()
	const { scrollableNode } = useScroll()

	const { nftsBalances = [] } = useSelectedAccountsBalances()

	const handleRowSelected = (row: { original: ResourceBalance[ResourceBalanceType.NON_FUNGIBLE] }) => {
		const { original } = row
		navigate(`/accounts/${accountId}/nfts/${original.address}?${searchParams}`)
	}

	const selectedRowIds = useMemo(() => {
		const idx = nftsBalances.findIndex(b => b.address === resourceId)
		if (idx >= 0) {
			return {
				[idx]: true,
			}
		}
		return {}
	}, [resourceId, nftsBalances])

	const columns = useMemo(
		() => [
			{
				Header: intl.formatMessage(messages.address),
				accessor: 'address',
				width: 'auto',
				Cell: ResourceNameCell,
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
				data={nftsBalances}
				columns={columns}
				onRowSelected={handleRowSelected}
				selectedRowIds={selectedRowIds}
			/>
		</Box>
	)
}

export default NftCollections
