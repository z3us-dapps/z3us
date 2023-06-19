// @ts-nocheck
// TODO: fix ts
import clsx, { type ClassValue } from 'clsx'
import React, { useMemo } from 'react'
import { useTable } from 'react-table'
import { TableVirtuoso } from 'react-virtuoso'

import { Box } from '../box'
import * as styles from './table.css'

interface ISwitchProps {
	columns: Array<object>
	data: Array<object>
	scrollableNode?: HTMLElement
	className?: ClassValue
	sizeVariant?: 'small' | 'medium' | 'large'
	styleVariant?: 'primary' | 'secondary'
}

export const Table: React.FC<ISwitchProps> = ({
	scrollableNode,
	className,
	sizeVariant = 'medium',
	styleVariant = 'primary',
	data,
	columns,
}) => {
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
		columns,
		data,
	})

	const memoizedComponents = useMemo(
		() => ({
			// eslint-disable-next-line react/no-unstable-nested-components
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

			// eslint-disable-next-line react/no-unstable-nested-components
			TableBody: React.forwardRef((tableBodyProps, ref) => (
				<tbody {...getTableBodyProps()} {...tableBodyProps} ref={ref} />
			)),
			// eslint-disable-next-line react/no-unstable-nested-components
			TableRow: tableRowProps => {
				// eslint-disable-next-line react/destructuring-assignment
				const index = tableRowProps['data-index']
				const row = rows[index]
				return (
					<tr
						className={styles.tableTrRecipe({
							sizeVariant,
							styleVariant,
						})}
						{...tableRowProps}
						{...row?.getRowProps()}
					/>
				)
			},
		}),
		[],
	)

	return (
		<Box>
			<TableVirtuoso
				className={clsx(styles.tableRootWrapper, className)}
				totalCount={rows.length}
				customScrollParent={scrollableNode}
				// fix any
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
