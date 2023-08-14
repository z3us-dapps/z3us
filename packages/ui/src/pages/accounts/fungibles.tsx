// import { Link } from 'react-router-dom'
// const Fungibles: React.FC = () => (
// 	<div>
// 		<h1>Fungibles</h1>
// 		<ul>
// 			<li>
// 				<Link to="/accounts/-/fungibles/1">1</Link>
// 			</li>
// 			<li>
// 				<Link to="/accounts/-/fungibles/2">2</Link>
// 			</li>
// 			<li>
// 				<Link to="/accounts/-/fungibles/3">3</Link>
// 			</li>
// 		</ul>
// 	</div>
// )

/* eslint-disable @typescript-eslint/no-unused-vars */
import { useScroll } from 'packages/ui/src/components/scroll-area-radix/use-scroll'
import React from 'react'
import { useMatches } from 'react-router-dom'

import { Table } from 'ui/src/components/table'

import { useAssetsTable } from './home/hooks/use-assets-table'

const Home: React.FC = () => {
	const matches = useMatches()
	const { scrollableNode, isScrolledTop } = useScroll()

	const { items, columns, loading, loadMore, onRowSelected, onEndReached } = useAssetsTable()

	return (
		<Table
			// className={styles.accountsTableMinHeightWrapper}
			styleVariant="primary"
			sizeVariant="large"
			scrollableNode={scrollableNode ?? undefined}
			data={items}
			columns={columns}
			isScrolledTop={isScrolledTop}
			// loading
			loading={loading}
			loadMore={loadMore}
			onRowSelected={onRowSelected}
			// onEndReached={onEndReached}
		/>
	)
}

export default Home
