import React from 'react'

import { Box } from 'ui/src/components/box'
import { Table } from 'ui/src/components/table'

import * as styles from './assets-table.css'
import { useAssetsTable } from './use-assets-table'

interface IAccountTableProps {
	scrollableNode?: HTMLElement
}

export const AssetsTable: React.FC<IAccountTableProps> = props => {
	const { scrollableNode } = props
	const { items, columns, loading, loadMore, onRowSelected, onEndReached } = useAssetsTable()

	return (
		<Box className={styles.assetsTableWrapper}>
			<Table
				styleVariant="primary"
				sizeVariant="large"
				scrollableNode={scrollableNode ?? undefined}
				data={items}
				columns={columns}
				loading={loading}
				loadMore={loadMore}
				onRowSelected={onRowSelected}
				onEndReached={onEndReached}
			/>
		</Box>
	)
}
