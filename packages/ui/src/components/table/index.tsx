/* eslint-disable react/no-unstable-nested-components */
import clsx, { type ClassValue } from 'clsx'
import React, { useMemo, useState } from 'react'
import { useTable } from 'react-table'
import { TableVirtuoso } from 'react-virtuoso'

import { Box } from '../box'
import * as styles from './table.css'

interface ISwitchProps {
	columns: Array<object>
	data: Array<object>
	scrollableNode?: HTMLElement
	className?: ClassValue
	sizeVariant?: 'medium' | 'large'
	styleVariant?: 'primary' | 'secondary'
	onRowSelected: (row: any) => void
}

export const Table: React.FC<ISwitchProps> = ({
	scrollableNode,
	className,
	sizeVariant = 'medium',
	styleVariant = 'primary',
	data,
	columns,
	onRowSelected,
}) => {
	const [selected, setSelected] = useState<number | undefined>(undefined)

	const handleRowSelection = (row: any) => {
		setSelected(row.index)
		if (onRowSelected) onRowSelected(row)
	}

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
		columns,
		data,
		onRowSelectionChange: handleRowSelection,
	})

	const memoizedComponents = useMemo(
		() => ({
			Table: ({ style, ...tableProps }) => (
				<table
					{...getTableProps()}
					{...tableProps}
					className={styles.tableRecipe({
						sizeVariant,
						styleVariant,
					})}
					style={{ ...style }}
				/>
			),
			TableBody: React.forwardRef((tableBodyProps, ref) => (
				<tbody {...getTableBodyProps()} {...tableBodyProps} ref={ref} />
			)),
			TableRow: tableRowProps => {
				// eslint-disable-next-line react/destructuring-assignment
				const index = tableRowProps['data-index']
				const row = rows[index]

				return (
					<tr
						onClick={() => handleRowSelection(row)}
						className={clsx(
							styles.tableTrRecipe({
								sizeVariant,
								styleVariant,
								isRowSelectable: !!onRowSelected,
								selected: index === selected,
							}),
						)}
						{...tableRowProps}
						{...(row?.getRowProps ? row?.getRowProps() : {})}
					/>
				)
			},
		}),
		[data, columns, selected],
	)

	return (
		<Box>
			<TableVirtuoso
				className={clsx(styles.tableRootWrapper, className)}
				totalCount={rows.length}
				customScrollParent={scrollableNode}
				components={memoizedComponents as any}
				fixedHeaderContent={() =>
					headerGroups.map(headerGroup => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map(column => (
								<th
									className={styles.tableThRecipe({
										sizeVariant,
										styleVariant,
									})}
									style={{
										width: column.width,
									}}
									{...column.getHeaderProps()}
								>
									{column.render('Header')}
								</th>
							))}
						</tr>
					))
				}
				itemContent={index => {
					const row = rows[index]
					prepareRow(row)
					return row.cells.map(cell => (
						<td
							className={styles.tableTdRecipe({
								sizeVariant,
								styleVariant,
							})}
							{...cell.getCellProps()}
						>
							{cell.render('Cell')}
						</td>
					))
				}}
			/>
		</Box>
	)
}
