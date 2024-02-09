import type { StateNonFungibleIdsResponse } from '@radixdlt/babylon-gateway-api-sdk'
import React, { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Virtuoso } from 'react-virtuoso'

import { Box } from 'ui/src/components/box'
import { useScroll } from 'ui/src/components/scroll-area-radix/use-scroll'
import { useNonFungibleCollection } from 'ui/src/hooks/dapp/use-entity-nft'

import { PageWrapper } from './components/page-wrapper'

const Home: React.FC = () => {
	const { scrollableNode } = useScroll()
	const [searchParams] = useSearchParams()

	const resourceId = searchParams.get('collection')
	const { isFetching, data, fetchNextPage, hasNextPage } = useNonFungibleCollection(resourceId)

	const [selected, setSelected] = useState<string | null>(null)
	const [hovered, setHovered] = useState<string | null>(null)

	const loadMore = useCallback(() => {
		if (isFetching) return
		if (hasNextPage) {
			fetchNextPage()
		}
	}, [isFetching, fetchNextPage, hasNextPage])

	useEffect(() => {
		if (selected) setSelected(null)
	}, [selected])

	const renderItem = useCallback(
		(index: number, page: StateNonFungibleIdsResponse) => (
			<PageWrapper
				key={index}
				collection={resourceId}
				ids={page.non_fungible_ids.items}
				selected={selected}
				setSelected={setSelected}
				hovered={hovered}
				setHovered={setHovered}
			/>
		),
		[resourceId],
	)

	return (
		<Box style={{ minHeight: '100px' }}>
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

export default Home
