import { useScroll } from 'packages/ui/src/components/scroll-area-radix/use-scroll'
import React from 'react'

import { Table } from 'ui/src/components/table'

interface IProps {
	// TODO
	data: any
	// TODO
	columns: any
}

export const AddressBookTable: React.FC<IProps> = props => {
	const { scrollableNode } = useScroll()
	const { data, columns } = props

	return (
		<Table
			styleVariant="secondary"
			sizeVariant="medium"
			scrollableNode={scrollableNode}
			data={data}
			columns={columns}
		/>
	)
}
