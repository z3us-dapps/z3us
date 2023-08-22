import clsx from 'clsx'
import { useScroll } from 'packages/ui/src/components/scroll-area-radix/use-scroll'
import React from 'react'

import { Box } from 'ui/src/components/box'
import * as tableHeadStyles from 'ui/src/components/styles/table-head-shadow.css'
import { Table } from 'ui/src/components/table'

import { AssetsPrice } from '../components/assets-price'
import { MobileScrollingBackground } from '../components/mobile-scrolling-background'
import { MobileScrollingButtons } from '../components/mobile-scrolling-buttons'
import { useAssetsTable } from '../home/hooks/use-assets-table'
import * as styles from '../styles.css'

const Fungibles: React.FC = () => {
	const { scrollableNode, isScrolledTop } = useScroll()

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { items, columns, loading, loadMore, onRowSelected, onEndReached } = useAssetsTable()

	return (
		<Box
			className={clsx(styles.accountRoutesWrapper, !loading && !isScrolledTop && tableHeadStyles.accountTheadShadow)}
		>
			<Box className={styles.accountRoutesScrollingWrapper}>
				<MobileScrollingBackground />
				<MobileScrollingButtons />
				<AssetsPrice />
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

export default Fungibles
