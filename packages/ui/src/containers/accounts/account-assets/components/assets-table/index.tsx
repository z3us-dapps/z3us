/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from 'clsx'
import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { Link } from 'ui/src/components/router-link'
import * as skeletonStyles from 'ui/src/components/styles/skeleton-loading.css'
import { Table } from 'ui/src/components/table'
import { TransactionIcon } from 'ui/src/components/transaction-icon'
import { Text } from 'ui/src/components/typography'
import { useAccountParams } from 'ui/src/hooks/use-account-params'

import * as styles from './assets-table.css'

export const hash = () => Math.random().toString(36).substring(7)

interface IAddressNameCellProps {
	// TODO
	value?: any
	row?: any
}

export const AddressNameCell: React.FC<IAddressNameCellProps> = props => {
	const {
		value,
		row: { original },
	} = props

	const { id, address } = original

	return (
		<Box key={id} id={id} display="flex" alignItems="center" gap="small" style={{ minWidth: 0 }} position="relative">
			<Box flexGrow={1} style={{ minWidth: 0 }}>
				<Text size="small" color="strong" truncate>
					{value}
				</Text>
				<Text size="xsmall" truncate>
					{address}
				</Text>
			</Box>
		</Box>
	)
}

interface IAccountTableProps {
	scrollableNode?: HTMLElement
}

// eslint-disable-next-line arrow-body-style
const generateRandomString = () => {
	return Math.floor(Math.random() * Date.now()).toString(36)
}

export const AssetsTable: React.FC<IAccountTableProps> = props => {
	const { pathname } = useLocation()
	const navigate = useNavigate()
	const { scrollableNode } = props
	const { account, assetType, asset } = useAccountParams()
	const [items, setItems] = useState<any>([])

	useEffect(() => {
		setItems(
			Array.from({ length: 500 }).map((_, i, a) => {
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
	}, [account])

	const columns = useMemo(
		() => [
			// {
			// 	Header: 'Id',
			// 	accessor: 'id',
			// 	width: 'auto',
			// 	// eslint-disable-next-line react/no-unstable-nested-components
			// 	Cell: AddressNameCell,
			// 	Cell: ({ row }) => (
			// 		<AddressEditButtonsCell
			// 			id={row.original.id}
			// 			onDelete={() => handleDeleteAddress(row.original.id)}
			// 			onEdit={() => handleAddEditAddress(row.original.id)}
			// 		/>
			// 	),
			// },
			{
				Header: 'Token',
				accessor: 'token',
				width: 'auto',
				// width: '70%',
				Cell: AddressNameCell,
			},
			{
				Header: 'Portfolio',
				accessor: 'portfolio',
				width: 'auto',
				// width: '70%',
				Cell: AddressNameCell,
			},
			{
				Header: 'Balance',
				accessor: 'balance',
				width: 'auto',
				// width: '70%',
				Cell: AddressNameCell,
			},
			{
				Header: 'Price',
				accessor: 'price',
				width: 'auto',
				// width: '70%',
				Cell: AddressNameCell,
			},
		],
		[account, assetType, asset],
	)

	const handleRowSelected = (row: any) => {
		const { original } = row

		navigate(`/accounts/${account}/${original.id}`)
	}

	return (
		<Box className={styles.assetsTableWrapper}>
			<Table
				styleVariant="primary"
				sizeVariant="large"
				scrollableNode={scrollableNode ?? undefined}
				data={items}
				columns={columns}
				onRowSelected={handleRowSelected}
			/>
		</Box>
	)
}
