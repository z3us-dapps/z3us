/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from 'clsx'
import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import { Link } from 'ui/src/components/router-link'
import * as skeletonStyles from 'ui/src/components/styles/skeleton-loading.css'
import { Table } from 'ui/src/components/table'
import { TransactionIcon } from 'ui/src/components/transaction-icon'
import { Text } from 'ui/src/components/typography'
import { useAccountParams } from 'ui/src/hooks/use-account-params'
import { useIsMobileWidth } from 'ui/src/hooks/use-is-mobile'

import { AssetNameCell } from './asset-name-cell'
import { AssetStatisticCell } from './asset-statistic-cell'
import * as styles from './assets-table.css'

export const hash = () => Math.random().toString(36).substring(7)

interface IAccountTableProps {
	scrollableNode?: HTMLElement
}

// eslint-disable-next-line arrow-body-style
export const generateRandomString = () => Math.random().toString(36).substring(7)

export const AssetsTable: React.FC<IAccountTableProps> = props => {
	const { pathname } = useLocation()
	const navigate = useNavigate()
	const { scrollableNode } = props
	const { account, assetType, asset } = useAccountParams()
	const isMobile = useIsMobileWidth()

	const [items, setItems] = useState<any>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [loadMore, setLoadMore] = useState<boolean>(false)

	const columns = useMemo(
		() => [
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
				test: 'test',
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
		],
		[account, assetType, asset],
	)

	const handleRowSelected = (row: any) => {
		const { original } = row

		navigate(`/accounts/${account}/${original.id}`)
	}

	const handleEndReached = () => {
		setLoadMore(true)

		setTimeout(() => {
			setItems(prev => [
				...prev,
				...Array.from({ length: 50 }).map((_, i, a) => {
					const randomStr = generateRandomString()
					return {
						id: randomStr,
						token: `${account} - ${randomStr}`,
						portfolio: '65%',
						price: '$1.83',
						balance: `99`,
					}
				}),
			])

			setLoadMore(false)
		}, 2000)
	}

	useEffect(() => {
		setLoading(true)
		setTimeout(() => {
			setItems(
				Array.from({ length: 50 }).map((_, i, a) => {
					const randomStr = generateRandomString()
					return {
						id: randomStr,
						token: `${account} - ${randomStr}`,
						portfolio: '65%',
						price: '$1.83',
						balance: `99`,
					}
				}),
			)

			setLoading(false)
		}, 1000)
	}, [account])

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
				onRowSelected={handleRowSelected}
				onEndReached={handleEndReached}
			/>
		</Box>
	)
}
