import React, { useMemo } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { useScroll } from 'ui/src/components/scroll-area-radix/use-scroll'
import { Table as BaseTable } from 'ui/src/components/table'
import type { Persona } from 'ui/src/store/types'

import { PersonaCell } from './persona-cell'

const messages = defineMessages({
	header: {
		defaultMessage: 'Name',
	},
})

interface CellProps {
	row: { original: Persona }
	onEdit: (address: string) => void
	onDelete: (address: string) => void
}

const Cell: React.FC<CellProps> = ({ row, onEdit, onDelete }: CellProps) => (
	<PersonaCell
		row={row}
		key={row.original.identityAddress}
		onEdit={() => onEdit(row.original.identityAddress)}
		onDelete={() => onDelete(row.original.identityAddress)}
	/>
)

interface IProps {
	data: Persona[]
	onEdit: (address: string) => void
	onDelete: (address: string) => void
}

export const Table: React.FC<IProps> = ({ data, onEdit, onDelete }) => {
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
		<BaseTable
			styleVariant="secondary"
			sizeVariant="medium"
			scrollableNode={scrollableNode}
			data={data}
			columns={columns}
			cellProps={{ onEdit, onDelete }}
		/>
	)
}
