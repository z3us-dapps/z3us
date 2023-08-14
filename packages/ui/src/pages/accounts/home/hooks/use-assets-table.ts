/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { AssetActivityCell } from '../../components/assets-table/asset-activity-cell'
import { AssetHomeCell } from '../../components/assets-table/asset-home-cell'
import { AssetHomeCellLinks } from '../../components/assets-table/asset-home-cell-links'
import { AssetNameCell } from '../../components/assets-table/asset-name-cell'
import { AssetStatisticCell } from '../../components/assets-table/asset-statistic-cell'
import * as styles from '../../components/assets-table/assets-table.css'

const generateRandomString = () => Math.random().toString(36).substring(7)

const loadingItems = Array.from({ length: 4 }).map((_, i, a) => {
	const randomStr = generateRandomString()
	return {
		id: `${i}-${randomStr}`,
		token: `${i}-${randomStr}`,
		portfolio: '65%',
		price: '$1.83',
		balance: '99',
	}
})

type TAssetsTable = {
	items: any
	columns: any
	loading: boolean
	loadMore: boolean
	onRowSelected: (row: any) => void
	onEndReached: () => void
}

export const useAssetsTable = (): TAssetsTable => {
	const navigate = useNavigate()
	const location = useLocation()
	const isFungibles = location.pathname.includes('fungibles')

	const columnsAssets = useMemo(
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
		[],
	)

	const columnsHome = useMemo(
		() => [
			{
				Header: 'Asset',
				accessor: 'token',
				width: '50%',
				Cell: AssetHomeCell,
			},
			{
				Header: '',
				accessor: 'portfolio',
				width: 'auto',
				Cell: AssetHomeCellLinks,
				className: styles.mobileHideTableCellWrapper,
			},
		],
		[],
	)

	const columnsActivity = useMemo(
		() => [
			{
				Header: 'Activity',
				accessor: 'Activity',
				width: 'auto',
				Cell: AssetActivityCell,
			},
		],
		[],
	)

	const [items, setItems] = useState<any>(loadingItems)
	const [loading, setLoading] = useState<boolean>(true)
	const [loadMore, setLoadMore] = useState<boolean>(false)
	const [columns, setColumns] = useState<any>(columnsHome)

	// TODO: should probably pass just ID? not row??
	const handleRowSelected = (row: any) => {
		const { original } = row
		navigate('-/fungibles/1')
	}

	const handleEndReached = () => {
		setLoadMore(true)
		setTimeout(() => {
			const newItems = Array.from({ length: 50 }).map((_, i, a) => {
				const randomStr = generateRandomString()
				return {
					id: `${randomStr}`,
					token: `${randomStr}`,
					portfolio: '65%',
					price: '$1.83',
					balance: '99',
				}
			})
			setItems(prev => [...prev, ...newItems])
			setLoadMore(false)
		}, 2000)
	}

	useEffect(() => {
		setLoading(true)
		setTimeout(() => {
			const newItems = Array.from({ length: isFungibles ? 50 : 4 }).map((_, i, a) => {
				const randomStr = generateRandomString()
				return {
					id: randomStr,
					token: `${randomStr}`,
					portfolio: '65%',
					price: '$1.83',
					balance: '99',
				}
			})
			setItems(newItems)
			setLoading(false)
		}, 2000)
	}, [])

	useEffect(() => {
		setLoading(true)
		setTimeout(() => {
			const newItems = Array.from({ length: isFungibles ? 50 : 4 }).map((_, i, a) => {
				const randomStr = generateRandomString()
				return {
					id: randomStr,
					token: `isFungibles - ${randomStr}`,
					portfolio: '65%',
					price: '$1.83',
					balance: '99',
				}
			})
			setItems(newItems)

			setLoading(false)
		}, 2000)
	}, [isFungibles])

	return {
		items,
		columns,
		loading,
		loadMore,
		onRowSelected: handleRowSelected,
		onEndReached: handleEndReached,
	}
}
