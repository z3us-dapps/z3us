/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from 'clsx'
import React from 'react'

import { Box } from 'ui/src/components/box'
import * as tableHeadStyles from 'ui/src/components/styles/table-head-shadow.css'
import { Table } from 'ui/src/components/table'

import { AssetsHeader } from '../assets-header'
import { useAssetsTable } from '../assets-table/use-assets-table'
import { MobileScrollingBackground } from '../mobile-scrolling-background'
import { MobileScrollingButtons } from '../mobile-scrolling-buttons'
import * as styles from './account-assets.css'

interface IAccountRoutesProps {
	scrollableNode: HTMLElement
	isScrolledTop: boolean
}

export const AccountAssets: React.FC<IAccountRoutesProps> = props => {
	const { scrollableNode, isScrolledTop } = props

	const { items, columns, loading, loadMore, onRowSelected, onEndReached } = useAssetsTable()

	return (
		<Box
			className={clsx(styles.accountRoutesWrapper, !loading && !isScrolledTop && tableHeadStyles.accountTheadShadow)}
		>
			<Box className={styles.accountRoutesScrollingWrapper}>
				<MobileScrollingBackground scrollableNode={scrollableNode} />
				<MobileScrollingButtons scrollableNode={scrollableNode} />
				<AssetsHeader isScrolledTop={isScrolledTop} scrollableNode={scrollableNode} />
				<Box className={styles.assetsTableWrapper}>
					<Table
						className={styles.accountsTableMinHeightWrapper}
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
				</Box>
			</Box>
		</Box>
	)
}
