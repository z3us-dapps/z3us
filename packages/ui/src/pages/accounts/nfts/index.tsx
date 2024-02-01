import type { StateNonFungibleDetailsResponseItem } from '@radixdlt/babylon-gateway-api-sdk'
import clsx from 'clsx'
import React, { useCallback } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import type { TableComponents, TableProps } from 'react-virtuoso'
import { TableVirtuoso } from 'react-virtuoso'

import { Box } from 'ui/src/components/box'
import { useScroll } from 'ui/src/components/scroll-area-radix/use-scroll'
import * as tableStyles from 'ui/src/components/table/table.css'
import { useNonFungibleIds, useNonFungiblesData } from 'ui/src/hooks/dapp/use-entity-nft'
import { useSelectedAccounts } from 'ui/src/hooks/use-accounts'
import { NftNameCell } from 'ui/src/pages/accounts/components/table/nft-name-cell'

import * as styles from './styles.css'

const TABLE_SIZE_VARIANT = 'large'
const TABLE_STYLE_VARIANT = 'primary'

interface IPageProps {
	accountId: string
	collection: string
	ids: string[]
}

const Page: React.FC<IPageProps> = ({ accountId, collection, ids }) => {
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()
	const { nftId: rawNftId } = useParams()
	const nftId = rawNftId ? decodeURIComponent(rawNftId) : undefined

	const { data = [] } = useNonFungiblesData(collection, ids)

	const handleSelect = (nft: StateNonFungibleDetailsResponseItem) => {
		navigate(`/accounts/${accountId}/nfts/${collection}/${encodeURIComponent(nft.non_fungible_id)}?${searchParams}`)
	}

	return (
		<>
			{data.map(nft => (
				<tr
					key={nft.non_fungible_id}
					className={clsx(
						tableStyles.tableTrRecipe({
							sizeVariant: TABLE_SIZE_VARIANT,
							styleVariant: TABLE_STYLE_VARIANT,
							isRowSelectable: true,
						}),
						nft.non_fungible_id === nftId ? 'tr-selected' : '',
					)}
				>
					<td
						className={tableStyles.tableTdRecipe({
							sizeVariant: TABLE_SIZE_VARIANT,
							styleVariant: TABLE_STYLE_VARIANT,
						})}
					>
						<Box onClick={() => handleSelect(nft)} overflow="clip">
							<NftNameCell value={nft.data} row={{ original: nft }} />
						</Box>
					</td>
				</tr>
			))}
		</>
	)
}

const Table: React.FC<TableProps> = ({ style, ...tableProps }) => (
	<table
		{...tableProps}
		className={tableStyles.tableRecipe({
			sizeVariant: TABLE_SIZE_VARIANT,
			styleVariant: TABLE_STYLE_VARIANT,
		})}
		style={{ ...style }}
	/>
)

const TableRow: TableComponents['TableRow'] = props => <tbody {...props} />
const TableBody: TableComponents['TableBody'] = React.forwardRef(({ children }) => children)

const tableComponents: TableComponents = {
	Table,
	TableRow,
	TableBody,
}

const NFTs: React.FC = () => {
	const { scrollableNode } = useScroll()
	const { accountId = '-', resourceId } = useParams()
	const selectedAccounts = useSelectedAccounts()

	const { data, isFetching, fetchNextPage, hasNextPage } = useNonFungibleIds(resourceId, selectedAccounts)

	const loadMore = useCallback(() => {
		if (isFetching) return
		if (hasNextPage) {
			fetchNextPage()
		}
	}, [isFetching, fetchNextPage, hasNextPage])

	const renderItem = useCallback(
		(index: number, page) => <Page key={index} accountId={accountId} collection={resourceId} ids={page?.items || []} />,
		[resourceId],
	)

	return (
		<Box className={styles.tableWrapper}>
			<TableVirtuoso
				customScrollParent={scrollableNode}
				totalCount={data?.pages.length}
				data={data?.pages}
				endReached={loadMore}
				itemContent={renderItem}
				components={tableComponents}
			/>
		</Box>
	)
}

export default NFTs
