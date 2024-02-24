/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from 'clsx'
import React from 'react'

import { Box } from 'ui/src/components/box'
import { Link } from 'ui/src/components/router-link'
import { useScroll } from 'ui/src/components/scroll-area-radix/use-scroll'
import { Table } from 'ui/src/components/table'

// import * as tableHeadStyles from 'ui/src/components/styles/table-head-shadow.css'
import { StakingTableHeader } from '../components/staking-table-header'
import * as styles from './styles.css'
import { useStakingTable } from './use-staking-table'

const Home: React.FC = () => {
	const { scrollableNode, isScrolledTop } = useScroll()

	const { items, columns, loading, loadMore, onRowSelected, onEndReached } = useStakingTable()

	// <Box className={clsx(styles.stakingHomeWrapper, !loading && !isScrolledTop && tableHeadStyles.accountTheadShadow)}>
	return (
		<Box className={clsx(styles.stakingHomeWrapper)}>
			<StakingTableHeader />
			<Box className={styles.stakingTableWrapper}>
				<Table
					className={styles.stakingTableMinHeightWrapper}
					styleVariant="primary"
					sizeVariant="large"
					scrollableNode={scrollableNode ?? undefined}
					data={items}
					columns={columns}
					isScrolledTop={isScrolledTop}
					loading={loading}
					loadMore={loadMore}
					onRowSelected={onRowSelected}
				/>
			</Box>
		</Box>
	)
}

export default Home
