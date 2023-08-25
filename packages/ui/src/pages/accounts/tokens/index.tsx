import clsx from 'clsx'
import { useScroll } from 'packages/ui/src/components/scroll-area-radix/use-scroll'
import { useFungibleResourceBalances } from 'packages/ui/src/hooks/dapp/use-balances'
import type { ResourceBalance } from 'packages/ui/src/types/types'
import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import * as tableHeadStyles from 'ui/src/components/styles/table-head-shadow.css'
import { Table } from 'ui/src/components/table'

import { AssetsPrice } from '../components/assets-price'
import { AssetActivityCell } from '../components/assets-table/asset-activity-cell'
import { AssetHomeCell } from '../components/assets-table/asset-home-cell'
import { AssetHomeCellLinks } from '../components/assets-table/asset-home-cell-links'
import { AssetNameCell } from '../components/assets-table/asset-name-cell'
import { AssetStatisticCell } from '../components/assets-table/asset-statistic-cell'
import { MobileScrollingBackground } from '../components/mobile-scrolling-background'
import { MobileScrollingButtons } from '../components/mobile-scrolling-buttons'
import * as styles from '../styles.css'

const columns = [
	{
		Header: 'Token',
		accessor: 'token',
		width: '50%',
		Cell: AssetNameCell,
	},
	{
		Header: 'Portfolio',
		accessor: 'portfolio',
		width: 'auto',
		Cell: AssetStatisticCell,
		className: styles.mobileHideTableCellWrapper,
	},
	{
		Header: 'Balance',
		accessor: 'balance',
		width: 'auto',
		Cell: AssetStatisticCell,
		className: styles.mobileHideTableCellWrapper,
	},
	{
		Header: 'Price',
		accessor: 'price',
		width: 'auto',
		Cell: AssetStatisticCell,
		className: styles.mobileHideTableCellWrapper,
	},
]

const Fungibles: React.FC = () => {
	const { scrollableNode, isScrolledTop } = useScroll()
	const navigate = useNavigate()
	const location = useLocation()
	const { accountId } = useParams()

	const { balances, isLoading } = useFungibleResourceBalances(accountId === '-' ? undefined : accountId)

	const handleRowSelected = (resourceBalance: ResourceBalance) => {
		navigate(`${location.pathname}/${resourceBalance.address}`)
	}

	return (
		<Box
			className={clsx(styles.accountRoutesWrapper, !isLoading && !isScrolledTop && tableHeadStyles.accountTheadShadow)}
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
						data={balances}
						columns={columns}
						isScrolledTop={isScrolledTop}
						// loading
						loading={isLoading}
						// loadMore={loadMore}
						onRowSelected={handleRowSelected}
						// onEndReached={onEndReached}
					/>
				</Box>
			</Box>
		</Box>
	)
}

export default Fungibles
