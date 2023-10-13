import React, { useMemo } from 'react'

import { useScroll } from 'ui/src/components/scroll-area-radix/use-scroll'
import { Table } from 'ui/src/components/table'
import type { AddressBookEntry } from 'ui/src/store/types'

import { AddressTableCell } from '../address-table-cell'

interface CellProps {
	row: { original: AddressBookEntry }
	onEdit: (address: string) => void
	onDelete: (address: string) => void
}

const Cell: React.FC<CellProps> = ({ row, onEdit, onDelete }: CellProps) => (
	<AddressTableCell
		row={row}
		key={row.original.address}
		onEdit={() => onEdit(row.original.address)}
		onDelete={() => onDelete(row.original.address)}
	/>
)

interface IProps {
	data: AddressBookEntry[]
	onEdit: (address: string) => void
	onDelete: (address: string) => void
}

export const AddressBookTable: React.FC<IProps> = ({ data, onEdit, onDelete }) => {
	const { scrollableNode } = useScroll()

	const columns = useMemo(
		() => [
			{
				Header: 'Name',
				accessor: 'name',
				width: 'auto',
				Cell,
			},
		],
		[onEdit, onDelete],
	)

	return (
		<Table
			styleVariant="secondary"
			sizeVariant="medium"
			scrollableNode={scrollableNode}
			data={data}
			columns={columns}
			cellProps={{ onEdit, onDelete }}
		/>
	)
}
