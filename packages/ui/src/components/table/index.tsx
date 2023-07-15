/* eslint-disable react/no-unstable-nested-components */
import clsx, { type ClassValue } from 'clsx'
import React, { useMemo } from 'react'
import { useRowSelect, useSortBy, useTable } from 'react-table'
import { TableVirtuoso } from 'react-virtuoso'

import { Box } from '../box'
import { ChevronDown2Icon, ChevronUp2Icon } from '../icons'
import * as styles from './table.css'

interface ITableProps {
	columns: Array<object>
	data: Array<object>
	scrollableNode?: HTMLElement
	className?: ClassValue
	sizeVariant?: 'medium' | 'large'
	styleVariant?: 'primary' | 'secondary'
	onRowSelected: (row: any) => void
}

export const Table: React.FC<ITableProps> = ({
	scrollableNode,
	className,
	sizeVariant = 'medium',
	styleVariant = 'primary',
	data,
	columns,
	onRowSelected,
}) => {
	const initialSort = React.useMemo(() => [{ id: 'token', desc: true }], [])

	const initialSelectedRows = React.useMemo(
		() => ({
			2: true, // Select row with ID 2 by default
		}),
		[],
	)

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		// state: { selectedRowIds },
		toggleAllRowsSelected,
	} = useTable(
		{
			columns,
			data,
			initialState: {
				sortBy: initialSort,
				selectedRowIds: initialSelectedRows,
			},
		},
		useSortBy,
		useRowSelect,
	)

	const deselectAllRows = () => {
		toggleAllRowsSelected(false)
	}

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
				const rowSelectedProps = row?.getToggleRowSelectedProps()

				return (
					<tr
						onClick={e => {
							deselectAllRows()
							rowSelectedProps.onChange(e)
							onRowSelected(row)
						}}
						className={clsx(
							styles.tableTrRecipe({
								sizeVariant,
								styleVariant,
								isRowSelectable: !!onRowSelected,
								selected: rowSelectedProps?.checked,
							}),
						)}
						{...tableRowProps}
						{...(row?.getRowProps ? row?.getRowProps() : {})}
					/>
				)
			},
		}),
		[data, columns],
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
									{...column.getHeaderProps(column.getSortByToggleProps())}
								>
									<Box component="span" display="inline-flex" alignItems="center" gap="xsmall">
										<Box component="span">{column.render('Header')}</Box>
										<Box component="span" className={styles.tableIconWrapper}>
											{/* eslint-disable-next-line no-nested-ternary */}
											{column.isSorted ? column.isSortedDesc ? <ChevronDown2Icon /> : <ChevronUp2Icon /> : ''}
										</Box>
									</Box>
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
