import React, { useMemo } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { useScroll } from 'ui/src/components/scroll-area-radix/use-scroll'
import { Table as BaseTable } from 'ui/src/components/table'
import type { Persona } from 'ui/src/store/types'

import { PersonaCell } from './persona-cell'

const messages = defineMessages({
	header: {
		id: 'HAlOn1',
		defaultMessage: 'Name',
	},
})

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
				Cell: PersonaCell,
			},
		],
		[],
	)

	const cellProps = useMemo(() => ({ onEdit, onDelete }), [onEdit, onDelete])

	return (
		<BaseTable
			styleVariant="secondary"
			sizeVariant="medium"
			scrollableNode={scrollableNode}
			data={data}
			columns={columns}
			cellProps={cellProps}
		/>
	)
}
