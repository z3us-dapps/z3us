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

import * as styles from './assets-table.css'

export const hash = () => Math.random().toString(36).substring(7)

interface ICellProps {
	value?: any
	row?: any
}

export const CellC: React.FC<ICellProps> = props => {
	const {
		value,
		row: { original },
	} = props

	const { id, address } = original

	return (
		<Box key={id} display="flex">
			<Text size="small" color="strong" truncate>
				{value}
			</Text>
		</Box>
	)
}

interface IAddressNameCellProps {
	value?: any
	row?: any
}

export const AddressNameCell: React.FC<IAddressNameCellProps> = props => {
	const {
		value,
		row: { original },
	} = props

	const { id, address } = original
	const resourceAddress = '78374384783748374'

	return (
		<Box key={id} display="flex" alignItems="center" gap="medium">
			<ResourceImageIcon size="large" address={resourceAddress} />
			<Text capitalizeFirstLetter size="small" color="strong" truncate weight="medium">
				{value} - lorem Nulla dolore veniam reprehenderit laborum cupidatat officia elit anim enim. Sint sit incididunt
				cupidatat esse laboris elit anim incididunt. Esse culpa officia enim non irure labore ut minim. Anim dolore duis
				quis sit ex ad aliqua eu adipisicing proident nisi voluptate. Quis deserunt id laboris proident amet aliquip.
			</Text>
		</Box>
	)
}

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
				Cell: AddressNameCell,
			},
			{
				Header: 'Portfolio',
				accessor: 'portfolio',
				width: 'auto',
				Cell: CellC,
				className: styles.mobileHideTableCellWrapper,
			},
			{
				Header: 'Balance',
				accessor: 'balance',
				width: 'auto',
				Cell: CellC,
			},
			{
				Header: 'Price',
				accessor: 'price',
				width: 'auto',
				Cell: CellC,
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
				onRowSelected={handleRowSelected}
				onEndReached={handleEndReached}
				loading={loading}
				loadMore={loadMore}
			/>
		</Box>
	)
}
