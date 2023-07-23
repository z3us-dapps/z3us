import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAccountParams } from 'ui/src/hooks/use-account-params'

import { AssetNameCell } from './asset-name-cell'
import { AssetStatisticCell } from './asset-statistic-cell'
import * as styles from './assets-table.css'

const generateRandomString = () => Math.random().toString(36).substring(7)

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
	const { account, assetType, asset } = useAccountParams()

	const [items, setItems] = useState<any>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [loadMore, setLoadMore] = useState<boolean>(false)

	const columns = useMemo(() => {
		let cols = [
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
		]

		if (assetType) {
			cols = [
				{
					Header: 'Token',
					accessor: 'token',
					width: '50%',
					Cell: AssetNameCell,
				},
			]
		}

		if (asset) {
			cols = [
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
			]
		}

		return cols
	}, [account, assetType, asset])

	useEffect(() => {
		setLoading(true)
		setTimeout(() => {
			const newItems = Array.from({ length: 50 }).map((_, i, a) => {
				const randomStr = generateRandomString()
				return {
					id: randomStr,
					token: `${account} - ${randomStr}`,
					portfolio: '65%',
					price: '$1.83',
					balance: '99',
				}
			})
			setItems(newItems)
			setLoading(false)
		}, 1000)
	}, [account, assetType, asset])

	const handleRowSelected = (row: any) => {
		const { original } = row
		navigate(`/accounts/${account}/${original.id}`)
	}

	const handleEndReached = () => {
		setLoadMore(true)
		setTimeout(() => {
			const newItems = Array.from({ length: 50 }).map((_, i, a) => {
				const randomStr = generateRandomString()
				return {
					id: randomStr,
					token: `${account} - ${randomStr}`,
					portfolio: '65%',
					price: '$1.83',
					balance: '99',
				}
			})
			setItems(prev => [...prev, ...newItems])
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
