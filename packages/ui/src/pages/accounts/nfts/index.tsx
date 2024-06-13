import type { StateNonFungibleDetailsResponseItem } from '@radixdlt/babylon-gateway-api-sdk'
import clsx from 'clsx'
import React, { useCallback, useMemo } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import type { ItemProps, TableComponents, TableProps } from 'react-virtuoso'
import { TableVirtuoso } from 'react-virtuoso'

import { Box } from 'ui/src/components/box'
import { FallbackLoading } from 'ui/src/components/fallback-renderer'
import * as tableStyles from 'ui/src/components/table/table.css'
import { useScroll } from 'ui/src/context/scroll'
import { useNonFungibleData, useNonFungibleIds } from 'ui/src/hooks/dapp/use-entity-nft'
import { useSelectedAccounts } from 'ui/src/hooks/use-accounts'
import { NftNameCell } from 'ui/src/pages/accounts/components/table/nft-name-cell'
import * as styles from 'ui/src/pages/accounts/components/table/styles.css'

const TABLE_SIZE_VARIANT = 'large'
const TABLE_STYLE_VARIANT = 'primary'

interface IPageProps extends Partial<ItemProps<unknown>> {
	accountId: string
	collection: string
	id: string
}

const Page: React.FC<IPageProps> = ({ accountId, collection, id, style, ...props }) => {
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()
	const { nftId: rawNftId } = useParams()
	const nftId = rawNftId ? decodeURIComponent(rawNftId) : undefined

	const { data } = useNonFungibleData(collection, id)

	const handleSelect = (nft: StateNonFungibleDetailsResponseItem) => () => {
		navigate(`/accounts/${accountId}/nfts/${collection}/${encodeURIComponent(nft.non_fungible_id)}?${searchParams}`)
	}

	return (
		<tr
			onClick={handleSelect(data)}
			key={data.non_fungible_id}
			className={clsx(
				tableStyles.tableTrRecipe({
					sizeVariant: TABLE_SIZE_VARIANT,
					styleVariant: TABLE_STYLE_VARIANT,
					isRowSelectable: true,
				}),
				data.non_fungible_id === nftId ? 'tr-selected' : '',
			)}
			style={{ ...style }}
			{...props}
		>
			<td
				className={tableStyles.tableTdRecipe({
					sizeVariant: TABLE_SIZE_VARIANT,
					styleVariant: TABLE_STYLE_VARIANT,
				})}
			>
				<Box overflow="clip">
					{data ? <NftNameCell value={data.data} row={{ original: data }} /> : <FallbackLoading />}
				</Box>
			</td>
		</tr>
	)
}

const Table: React.FC<TableProps> = ({ style, ...props }) => (
	<table
		className={tableStyles.tableRecipe({
			sizeVariant: TABLE_SIZE_VARIANT,
			styleVariant: TABLE_STYLE_VARIANT,
		})}
		style={{ ...style }}
		{...props}
	/>
)

const TableRow: React.FC<ItemProps<unknown>> = ({ children, ...props }) => (
	<>
		{React.Children.map(children, child => {
			if (React.isValidElement(child)) {
				return React.cloneElement(child, props as React.Attributes)
			}
			return child
		})}
	</>
)

const tableComponents: TableComponents = {
	Table,
	TableRow,
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
		(index: number, id: string) => <Page key={index} accountId={accountId} collection={resourceId} id={id} />,
		[accountId, resourceId],
	)

	const flatten = useMemo(() => data?.pages?.reduce((ids, { items }) => [...ids, ...items], []) || [], [data?.pages])

	return (
		<Box className={styles.tableWrapper}>
			<TableVirtuoso
				customScrollParent={scrollableNode ?? undefined}
				totalCount={flatten.length}
				data={flatten}
				endReached={loadMore}
				itemContent={renderItem}
				components={tableComponents}
			/>
		</Box>
	)
}

export default NFTs
