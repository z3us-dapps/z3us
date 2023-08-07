/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAccountParam, useAssetParam, useIsActivity } from 'packages/ui/src/hooks/use-params'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { StakingTableCell } from './components/staking-table-cell'

const generateRandomString = () => Math.random().toString(36).substring(7)

const STAKING_NUMBER = 400

const loadingItems = Array.from({ length: STAKING_NUMBER }).map((_, i, a) => {
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
	const { assetType } = useParams()
	const navigate = useNavigate()
	const account = useAccountParam()
	const asset = useAssetParam()
	const isAccountActivityRoute = useIsActivity()

	const columns = useMemo(
		() => [
			{
				Header: 'Token',
				accessor: 'token',
				width: '50%',
				Cell: StakingTableCell,
			},
			{
				Header: 'Portfolio',
				accessor: 'portfolio',
				width: 'auto',
				Cell: StakingTableCell,
			},
			{
				Header: 'Balance',
				accessor: 'balance',
				width: 'auto',
				Cell: StakingTableCell,
			},
			{
				Header: 'Price',
				accessor: 'price',
				width: 'auto',
				Cell: StakingTableCell,
			},
		],
		[],
	)

	const [items, setItems] = useState<any>(loadingItems)
	const [loading, setLoading] = useState<boolean>(true)
	const [loadMore, setLoadMore] = useState<boolean>(false)

	// TODO: should probably pass just ID? not row??
	const handleRowSelected = (row: any) => {
		const { original } = row
		navigate(`/accounts${original.id ? `/${original.id}` : ''}?account=${account}`)
	}

	const handleEndReached = () => {
		setLoadMore(true)
		setTimeout(() => {
			const newItems = Array.from({ length: 50 }).map((_, i, a) => {
				const randomStr = generateRandomString()
				return {
					id: `${account} - ${randomStr}`,
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

	useEffect(() => {
		setLoading(true)
		setTimeout(() => {
			const newItems = Array.from({ length: STAKING_NUMBER }).map((_, i, a) => {
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
		}, 2000)
	}, [account, assetType, asset, isAccountActivityRoute])

	return {
		items,
		columns,
		loading,
		loadMore,
		onRowSelected: handleRowSelected,
		onEndReached: handleEndReached,
	}
}
