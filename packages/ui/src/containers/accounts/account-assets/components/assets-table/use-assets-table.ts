import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAccountParams } from 'ui/src/hooks/use-account-params'

import { AssetNameCell } from './asset-name-cell'
import { AssetStatisticCell } from './asset-statistic-cell'
import * as styles from './assets-table.css'

// eslint-disable-next-line arrow-body-style
export const generateRandomString = () => Math.random().toString(36).substring(7)

// fix types
type TAssetsTable = {
	items: any
	columns: any
	loading: any
	loadMore: any
	onRowSelected: any
	onEndReached: any
}

export const useAssetsTable = (): TAssetsTable => {
	const navigate = useNavigate()
	const { account, assetType, asset } = useAccountParams()

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

	return {
		items,
		columns,
		loading,
		loadMore,
		onRowSelected: handleRowSelected,
		onEndReached: handleEndReached,
	}
}
