/* eslint-disable */
import * as SwitchPrimitive from '@radix-ui/react-switch'
import clsx, { type ClassValue } from 'clsx'
import React, { forwardRef, useMemo } from 'react'
import { useTable } from 'react-table'
import { TableVirtuoso } from 'react-virtuoso'

import * as styles from './table.css'

// eslint-disable-next-line
const range = (len: any) => {
	const arr = []
	// eslint-disable-next-line
	for (let i = 0; i < len; i++) {
		arr.push(i)
	}
	return arr
}

const newPerson = () => ({
	firstName: Math.floor(Math.random() * 30),
	lastName: Math.floor(Math.random() * 30),
	age: Math.floor(Math.random() * 30),
	visits: Math.floor(Math.random() * 100),
	progress: Math.floor(Math.random() * 100),
	status: Math.floor(Math.random() * 100) > 0.66 ? 'relationship' : 'single',
})

export function makeData(...lens) {
	const makeDataLevel = (depth = 0) => {
		const len = lens[depth]
		// eslint-disable-next-line
		return range(len).map(d => ({
			...newPerson(),
			subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
		}))
	}

	return makeDataLevel()
}

interface ISwitchProps {
	className?: ClassValue
	scrollableNode: HTMLElement
	sizeVariant?: 'small' | 'medium' | 'large'
	styleVariant?: 'primary' | 'secondary'
}

export const Table: React.FC<ISwitchProps> = ({ scrollableNode }) => {
	const data = useMemo(() => makeData(200), [])

	const columns = useMemo(
		() => [
			{
				Header: 'Age',
				accessor: 'age',
			},
			{
				Header: 'Visits',
				accessor: 'visits',
			},
			{
				Header: 'Status',
				accessor: 'status',
			},
			{
				Header: 'Profile Progress',
				accessor: 'progress',
			},
		],
		[],
	)

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
		columns,
		data,
	})

	return (
		<TableVirtuoso
			// style={{ height: 400 }}
			// style={{ width: '100%' }}
			totalCount={rows.length}
			customScrollParent={scrollableNode}
			components={{
				Table: ({ style, ...props }) => (
					<table {...getTableProps()} {...props} style={{ ...style, width: 800, tableLayout: 'fixed' }} />
				),
				TableBody: React.forwardRef(({ style, ...props }, ref) => (
					<tbody {...getTableBodyProps()} {...props} ref={ref} />
				)),
				TableRow: props => {
					const index = props['data-index']
					const row = rows[index]
					return <tr {...props} {...row.getRowProps()} />
				},
			}}
			fixedHeaderContent={() => {
				return headerGroups.map(headerGroup => (
					<tr {...headerGroup.getHeaderGroupProps()} style={{ background: 'white' }}>
						{headerGroup.headers.map(column => (
							<th {...column.getHeaderProps()}>{column.render('Header')}</th>
						))}
					</tr>
				))
			}}
			itemContent={(index, user) => {
				const row = rows[index]
				prepareRow(row)
				return row.cells.map(cell => {
					return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
				})
			}}
		/>
	)

	// <VirtuosoGrid
	// 	customScrollParent={scrollableNode}
	// 	data={items}
	// 	// todo fix lint issue
	// 	// eslint-disable-next-line
	// 	itemContent={(index, user) => <ItemWrapper idx={index} user={user} />}
	// 	components={{
	// 		List: ListContainer,
	// 		Item: ItemContainer,
	// 	}}
	// 	computeItemKey={computeItemKey}
	// />

	// return (
	// 	<SwitchPrimitive.Root
	// 		className={clsx(
	// 			styles.switchRootWrapper,
	// 			styles.switchRecipe({
	// 				sizeVariant,
	// 				styleVariant,
	// 			}),
	// 			className,
	// 		)}
	// 		id={id}
	// 		ref={ref}
	// 		{...rest}
	// 	>
	// 		<SwitchPrimitive.Thumb
	// 			className={clsx(
	// 				styles.switchThumbRecipe({
	// 					sizeVariant,
	// 					styleVariant,
	// 				}),
	// 				styles.switchThumbRoot,
	// 			)}
	// 		/>
	// 	</SwitchPrimitive.Root>
	// )
}
