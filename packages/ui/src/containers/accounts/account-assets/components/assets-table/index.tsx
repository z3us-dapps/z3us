/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Virtuoso } from 'react-virtuoso'
import { useTimeout } from 'usehooks-ts'

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
		<Box key={id} id={id} display="flex" alignItems="center" gap="small" style={{ minWidth: 0 }}>
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

export const AssetsTable: React.FC<IAccountTableProps> = props => {
	const { scrollableNode } = props
	const { account, assetType, asset } = useAccountParams()
	const [items, setItems] = useState<any>([])

	useEffect(() => {
		// Array.from({ length: 500 }).map((_, i, a) => ({
		setItems(
			Array.from({ length: 500 }).map((_, i, a) => ({
				id: a.length - i,
				name: `${account} - ${assetType} - name`,
			})),
		)
	}, [account, assetType, asset])

	const columns = useMemo(
		() => [
			{
				Header: 'Name',
				accessor: 'name',
				width: '70%',
				Cell: AddressNameCell,
			},
			{
				Header: 'Id',
				accessor: 'id',
				width: 'auto',
				// eslint-disable-next-line react/no-unstable-nested-components
				Cell: AddressNameCell,
				// Cell: ({ row }) => (
				// 	<AddressEditButtonsCell
				// 		id={row.original.id}
				// 		onDelete={() => handleDeleteAddress(row.original.id)}
				// 		onEdit={() => handleAddEditAddress(row.original.id)}
				// 	/>
				// ),
			},
		],
		[],
	)

	return (
		<Box className={styles.assetsTableWrapper}>
			<Table sizeVariant="large" scrollableNode={scrollableNode ?? undefined} data={items} columns={columns} />
		</Box>
	)
}
