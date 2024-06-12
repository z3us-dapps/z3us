import type { StateNonFungibleDetailsResponseItem } from '@radixdlt/babylon-gateway-api-sdk'
import clsx from 'clsx'
import React, { useCallback, useMemo } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import type { ItemProps, TableComponents, TableProps } from 'react-virtuoso'
import { TableVirtuoso } from 'react-virtuoso'

import { Box } from 'ui/src/components/box'
import * as tableStyles from 'ui/src/components/table/table.css'
import { useScroll } from 'ui/src/context/scroll'
import { useNonFungibleIds, useNonFungiblesData } from 'ui/src/hooks/dapp/use-entity-nft'
import { useSelectedAccounts } from 'ui/src/hooks/use-accounts'
import { NftNameCell } from 'ui/src/pages/accounts/components/table/nft-name-cell'
import * as styles from 'ui/src/pages/accounts/components/table/styles.css'

const TABLE_SIZE_VARIANT = 'large'
const TABLE_STYLE_VARIANT = 'primary'

interface IPageProps extends Partial<ItemProps<unknown>> {
	accountId: string
	collection: string
	ids: string[]
}

const Page: React.FC<IPageProps> = ({ accountId, collection, ids, style, ...props }) => {
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()
	const { nftId: rawNftId } = useParams()
	const nftId = rawNftId ? decodeURIComponent(rawNftId) : undefined

	const { data = [] } = useNonFungiblesData(collection, ids)

	const handleSelect = (nft: StateNonFungibleDetailsResponseItem) => () => {
		navigate(`/accounts/${accountId}/nfts/${collection}/${encodeURIComponent(nft.non_fungible_id)}?${searchParams}`)
	}

	return (
		<>
			{data.map(nft => (
				<tr
					onClick={handleSelect(nft)}
					key={nft.non_fungible_id}
					className={clsx(
						tableStyles.tableTrRecipe({
							sizeVariant: TABLE_SIZE_VARIANT,
							styleVariant: TABLE_STYLE_VARIANT,
							isRowSelectable: true,
						}),
						nft.non_fungible_id === nftId ? 'tr-selected' : '',
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
							<NftNameCell value={nft.data} row={{ original: nft }} />
						</Box>
					</td>
				</tr>
			))}
		</>
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
		(index: number, page: { items: any[] }) => (
			<Page key={index} accountId={accountId} collection={resourceId} ids={page?.items || []} />
		),
		[accountId, resourceId],
	)

	const totalCount = useMemo(() => data?.pages?.reduce((total, { items }) => total + items.length, 0), [data?.pages])

	return (
		<Box className={styles.tableWrapper}>
			{/* <TableVirtuoso
				customScrollParent={scrollableNode ?? undefined}
				totalCount={totalCount}
				data={data?.pages}
				endReached={loadMore}
				itemContent={renderItem}
				components={tableComponents}
			/> */}
			<TableVirtuoso
				customScrollParent={scrollableNode ?? undefined}
				// style={{ height: 400 }}
				data={Array.from({ length: 500 }, (_, index) => ({
					name: `User ${index}`,
					description: `${index} description`,
				}))}
				// eslint-disable-next-line react/no-unstable-nested-components
				itemContent={(index, user) => (
					<>
						<td style={{ width: 150, height: 30 }}>{user.name}</td>
						<td>{user.description}</td>
					</>
				)}
			/>
		</Box>
	)
}

export default NFTs
