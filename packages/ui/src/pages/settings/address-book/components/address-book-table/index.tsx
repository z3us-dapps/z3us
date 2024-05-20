import React, { useMemo } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Table } from 'ui/src/components/table'
import { useScroll } from 'ui/src/context/scroll'
import type { AddressBookEntry } from 'ui/src/store/types'

import { AddressTableCell } from '../address-table-cell'

const messages = defineMessages({
	header: {
		id: 'HAlOn1',
		defaultMessage: 'Name',
	},
})

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
	const intl = useIntl()
	const { scrollableNode } = useScroll()

	const columns = useMemo(
		() => [
			{
				Header: intl.formatMessage(messages.header),
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
