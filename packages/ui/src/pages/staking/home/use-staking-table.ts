/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useTimeout } from 'usehooks-ts'

import { StakingStatisticCell } from '../components/staking-statistic-cell'
import * as styles from './styles.css'

const generateRandomString = () => Math.random().toString(36).substring(7)

const loadingItems = Array.from({ length: 400 }).map((_, i, a) => {
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

export const useStakingTable = (): TAssetsTable => {
	const navigate = useNavigate()
	const location = useLocation()
	const isFungibles = location.pathname.includes('fungibles')

	const columnsAssets = useMemo(
		() => [
			{
				Header: 'Token',
				accessor: 'token',
				width: '50%',
				Cell: StakingStatisticCell,
			},
			{
				Header: 'Portfolio',
				accessor: 'portfolio',
				width: 'auto',
				Cell: StakingStatisticCell,
				// className: styles.mobileHideTableCellWrapper,
			},
			{
				Header: 'Balance',
				accessor: 'balance',
				width: 'auto',
				Cell: StakingStatisticCell,
				// className: styles.mobileHideTableCellWrapper,
			},
			{
				Header: 'Price',
				accessor: 'price',
				width: 'auto',
				Cell: StakingStatisticCell,
				// className: styles.mobileHideTableCellWrapper,
			},
		],
		[],
	)

	const [items, setItems] = useState<any>(loadingItems)
	const [loading, setLoading] = useState<boolean>(false)
	const [loadMore, setLoadMore] = useState<boolean>(false)
	const [columns, setColumns] = useState<any>(columnsAssets)

	const handleRowSelected = (row: any) => {
		const { id } = row
		navigate(`/staking?validator=${id}`)
	}

	return {
		items,
		columns,
		loading,
		loadMore,
		onRowSelected: handleRowSelected,
		onEndReached: () => {},
	}
}
