/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from 'clsx'
import React from 'react'

import { Box } from 'ui/src/components/box'
import { Table } from 'ui/src/components/table'
// OLD REMOVE
import { AccountIndexAssets } from 'ui/src/containers/accounts/account-index-assets'
// OLD REMOVE
import { AccountIndexHeader } from 'ui/src/containers/accounts/account-index-header'
// OLD REMOVE
import { AccountsList } from 'ui/src/containers/accounts/accounts-list'

import * as styles from './account-assets.css'
import { AssetsHeader } from './components/assets-header'
// OLD REMOVE
import { useAssetsTable } from './components/assets-table/use-assets-table'
import { MobileScrollingBackground } from './components/mobile-scrolling-background'
import { MobileScrollingButtons } from './components/mobile-scrolling-buttons'

interface IAccountRoutesProps {
	scrollableNode: HTMLElement
	isScrolledTop: boolean
}

export const AccountAssets: React.FC<IAccountRoutesProps> = props => {
	const { scrollableNode, isScrolledTop } = props

	const { items, columns, loading, loadMore, onRowSelected, onEndReached } = useAssetsTable()

	return (
		<Box className={clsx(styles.accountRoutesWrapper, !loading && !isScrolledTop && styles.accountTheadShadow)}>
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
