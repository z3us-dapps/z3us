import type { StateNonFungibleDetailsResponseItem } from '@radixdlt/babylon-gateway-api-sdk'
import React, { useCallback, useMemo } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Virtuoso } from 'react-virtuoso'

import { Box } from 'ui/src/components/box'
import { useScroll } from 'ui/src/components/scroll-area-radix/use-scroll'
import { TableWithEmptyState } from 'ui/src/components/table'
import { useNonFungibleIds, useNonFungiblesData } from 'ui/src/hooks/dapp/use-entity-nft'
import { useSelectedAccounts } from 'ui/src/hooks/use-accounts'
import { NftNameCell } from 'ui/src/pages/accounts/components/table/nft-name-cell'
import * as styles from 'ui/src/pages/accounts/components/table/styles.css'

// const messages = defineMessages({
// 	collection: {
// 		id: 'phAZoj',
// 		defaultMessage: 'Collection',
// 	},
// 	nft: {
// 		id: 'W2OoOl',
// 		defaultMessage: 'NFT',
// 	},
// 	non_fungible_id: {
// 		id: 'qlcuNQ',
// 		defaultMessage: 'ID',
// 	},
// 	empty_title: {
// 		id: 'jHJmjf',
// 		defaultMessage: 'No results',
// 	},
// 	empty_subtitle: {
// 		id: 'COpeCU',
// 		defaultMessage: 'Could not find any NFTs in this account',
// 	},
// })

// const NFTs: React.FC = () => {
// 	const intl = useIntl()
// 	const navigate = useNavigate()
// 	const [searchParams] = useSearchParams()
// 	const { scrollableNode, isScrolledTop } = useScroll()
// 	const { accountId = '-', resourceId, nftId: rawNftId } = useParams()
// 	const nftId = rawNftId ? decodeURIComponent(rawNftId) : undefined
// 	const selectedAccounts = useSelectedAccounts()

// 	const { isFetching, data: idsData, fetchNextPage, hasNextPage } = useNonFungibleIds(resourceId, selectedAccounts)
// 	// @TODO: fix pagination here, we do not want to flatten pages
// 	const ids = useMemo(
// 		() => idsData?.pages.reduce((container, page) => [...container, ...page.items], []) || [],
// 		[idsData],
// 	)

// 	const { data: tableData = [], isLoading } = useNonFungiblesData(resourceId, ids)

// 	const selectedRowIds = useMemo(() => {
// 		const idx = ids.findIndex(b => b === nftId)
// 		if (idx >= 0) {
// 			return {
// 				[idx]: true,
// 			}
// 		}
// 		return {}
// 	}, [ids, nftId])

// 	const handleRowSelected = (row: { original: StateNonFungibleDetailsResponseItem }) => {
// 		const { original } = row
// 		navigate(
// 			`/accounts/${accountId}/nfts/${resourceId}/${encodeURIComponent(original.non_fungible_id)}?${searchParams}`,
// 		)
// 	}

// 	const loadMore = useCallback(() => {
// 		if (isFetching) return
// 		if (hasNextPage) {
// 			fetchNextPage()
// 		}
// 	}, [isFetching, fetchNextPage, hasNextPage])

// 	const columns = useMemo(
// 		() => [
// 			{
// 				Header: intl.formatMessage(messages.nft),
// 				accessor: 'data',
// 				width: 'auto',
// 				Cell: NftNameCell,
// 			},
// 		],
// 		[],
// 	)

// 	// [p1, p2, p3, p4]
// 	// p1= [...]

// 	// n * pages.length * page.length = x
// 	// x times to render

// 	// render pages
// 	// page - render item

// 	// Wrapper
// 	const {data:pages} = xxx()

// 	pages.map(page => <Page page={page} />)

// 	// Page
// 	page.map(item => <Item item={item} />)

// 	/////////

// 	const {data:pages} = xxx()
// 	const flattedPgaes = pages.xxxxxxx

// 	flattedPgaes.map(item => <Item page={page} />)

// 	return (
// 		<Box className={styles.tableWrapper}>
// 			<TableWithEmptyState
// 				emptyStateTitle={intl.formatMessage(messages.empty_title)}
// 				emptyStateSubTitle={intl.formatMessage(messages.empty_subtitle)}
// 				styleVariant="primary"
// 				sizeVariant="large"
// 				scrollableNode={scrollableNode ?? undefined}
// 				data={tableData}
// 				columns={columns}
// 				isScrolledTop={isScrolledTop}
// 				onRowSelected={handleRowSelected}
// 				loading={isFetching || isLoading}
// 				selectedRowIds={selectedRowIds}
// 				stickyShadowTop
// 				loadMore={hasNextPage && !isFetching && !isLoading}
// 				onEndReached={loadMore}
// 				// customScrollParent={scrollableNode}
// 				// totalCount={data?.pages.length}
// 				// data={data?.pages}
// 				// endReached={loadMore}
// 				// itemContent={renderItem}
// 			/>
// 		</Box>
// 	)
// }

interface IPageProps {
	accountId: string
	collection: string
	ids: string[]
	selected: string
}

const Page: React.FC<IPageProps> = ({ accountId, collection, ids, selected }) => {
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()

	const { data = [] } = useNonFungiblesData(collection, ids)

	const handleSelect = (nft: StateNonFungibleDetailsResponseItem) => {
		navigate(`/accounts/${accountId}/nfts/${collection}/${encodeURIComponent(nft.non_fungible_id)}?${searchParams}`)
	}

	return (
		<>
			{data.map(nft => (
				<Box
					key={nft.non_fungible_id}
					onClick={() => handleSelect(nft)}
					disabled={nft.non_fungible_id === selected}
					overflow="clip"
				>
					<NftNameCell value={nft.data} row={{ original: nft }} />
				</Box>
			))}
		</>
	)
}

const NFTs: React.FC = () => {
	const { scrollableNode } = useScroll()
	const { accountId = '-', resourceId, nftId: rawNftId } = useParams()
	const nftId = rawNftId ? decodeURIComponent(rawNftId) : undefined
	const selectedAccounts = useSelectedAccounts()

	const { data, isFetching, fetchNextPage, hasNextPage } = useNonFungibleIds(resourceId, selectedAccounts)

	const loadMore = useCallback(() => {
		if (isFetching) return
		if (hasNextPage) {
			fetchNextPage()
		}
	}, [isFetching, fetchNextPage, hasNextPage])

	const renderItem = useCallback(
		(index: number, page) => (
			<Page key={index} accountId={accountId} collection={resourceId} ids={page.items} selected={nftId} />
		),
		[resourceId],
	)

	return (
		<Box className={styles.tableWrapper}>
			<Virtuoso
				customScrollParent={scrollableNode}
				totalCount={data?.pages.length}
				data={data?.pages}
				endReached={loadMore}
				itemContent={renderItem}
			/>
		</Box>
	)
}

export default NFTs
