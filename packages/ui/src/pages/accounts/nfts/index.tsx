import type { StateNonFungibleDetailsResponseItem } from '@radixdlt/babylon-gateway-api-sdk'
import React, { useCallback, useMemo } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useNavigate, useParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { useScroll } from 'ui/src/components/scroll-area-radix/use-scroll'
import { TableWithEmptyState } from 'ui/src/components/table'
import { useNonFungibleIds, useNonFungiblesData } from 'ui/src/hooks/dapp/use-entity-nft'
import { useSelectedAccounts } from 'ui/src/hooks/use-accounts'
import { AssetNameCell } from 'ui/src/pages/accounts/components/table/asset-name-cell'

import { NftDataCell } from '../components/table/nft-data-cell'
import * as styles from '../components/table/styles.css'

const messages = defineMessages({
	collection: {
		id: 'nfts.collection',
		defaultMessage: 'Collection',
	},
	nft: {
		id: 'nfts.nft',
		defaultMessage: 'NFT',
	},
	non_fungible_id: {
		id: 'nfts.non_fungible_id',
		defaultMessage: 'ID',
	},
	empty_title: {
		id: 'nfts.empty_title',
		defaultMessage: 'No results',
	},
	empty_subtitle: {
		id: 'nfts.empty_subtitle',
		defaultMessage: 'Could not find any NFTs in this account',
	},
})

const NFTs: React.FC = () => {
	const intl = useIntl()
	const navigate = useNavigate()
	const { scrollableNode, isScrolledTop } = useScroll()
	const { accountId = '-', resourceId, nftId: rawNftId } = useParams()
	const nftId = decodeURIComponent(rawNftId)
	const selectedAccounts = useSelectedAccounts()

	const { isFetching, data: idsData, fetchNextPage, hasNextPage } = useNonFungibleIds(resourceId, selectedAccounts)
	const ids = useMemo(
		() => idsData?.pages.reduce((container, page) => [...container, ...page.items], []) || [],
		[idsData],
	)

	const { data: tableData = [], isLoading } = useNonFungiblesData(resourceId, ids)
	const selectedRowIds = useMemo(() => {
		const idx = ids.findIndex(b => b === nftId)
		if (idx >= 0) {
			return {
				[idx]: true,
			}
		}
		return {}
	}, [ids, nftId])

	const handleRowSelected = (row: { original: StateNonFungibleDetailsResponseItem }) => {
		const { original } = row
		navigate(`/accounts/${accountId}/nfts/${resourceId}/${encodeURIComponent(original.non_fungible_id)}`)
	}

	const loadMore = useCallback(() => {
		if (isFetching) return
		if (hasNextPage) {
			fetchNextPage()
		}
	}, [isFetching, fetchNextPage, hasNextPage])

	const columns = useMemo(
		() => [
			{
				Header: intl.formatMessage(messages.collection),
				accessor: 'collection',
				width: 'auto',
				Cell: AssetNameCell,
			},
			{
				Header: intl.formatMessage(messages.non_fungible_id),
				accessor: 'non_fungible_id',
				width: 'auto',
			},
			{
				Header: intl.formatMessage(messages.nft),
				accessor: 'data',
				width: 'auto',
				Cell: NftDataCell,
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
				data={tableData}
				columns={columns}
				isScrolledTop={isScrolledTop}
				onRowSelected={handleRowSelected}
				loading={isFetching || isLoading}
				selectedRowIds={selectedRowIds}
				stickyShadowTop
				loadMore={hasNextPage && !isFetching && !isLoading}
				onEndReached={loadMore}
			/>
		</Box>
	)
}

export default NFTs
