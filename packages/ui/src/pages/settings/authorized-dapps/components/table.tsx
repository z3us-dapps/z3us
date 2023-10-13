import React, { useMemo } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { useScroll } from 'ui/src/components/scroll-area-radix/use-scroll'
import { Table as BaseTable } from 'ui/src/components/table'
import type { ApprovedDapps } from 'ui/src/store/types'

import { DappCell } from './dapp-cell'

const messages = defineMessages({
	header: {
		id: 'settings.authorized-dapps.table.header',
		defaultMessage: 'dApp',
	},
})

interface CellProps {
	row: { original: ApprovedDapps[keyof ApprovedDapps] & { address: string } }
	onDelete: (address: string) => void
}

const Cell: React.FC<CellProps> = ({ row, onDelete }: CellProps) => (
	<DappCell row={row} key={row.original.address} onDelete={() => onDelete(row.original.address)} />
)

interface IProps {
	data: ApprovedDapps
	onDelete: (address: string) => void
}

export const Table: React.FC<IProps> = ({ data, onDelete }) => {
	const intl = useIntl()
	const { scrollableNode } = useScroll()

	const columns = useMemo(
		() => [
			{
				Header: intl.formatMessage(messages.header),
				accessor: 'address',
				width: 'auto',
				Cell,
			},
		],
		[onDelete],
	)

	return (
		<BaseTable
			styleVariant="secondary"
			sizeVariant="medium"
			scrollableNode={scrollableNode}
			data={Object.keys(data).map(address => ({ ...data[address], address }))}
			columns={columns}
			cellProps={{ onDelete }}
		/>
	)
}
