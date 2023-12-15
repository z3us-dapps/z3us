/* eslint-disable react/no-unstable-nested-components */
import { assignInlineVars } from '@vanilla-extract/dynamic'
import clsx, { type ClassValue } from 'clsx'
import React, { useEffect, useMemo, useState } from 'react'
import { useRowSelect, useSortBy, useTable } from 'react-table'
import useMeasure from 'react-use-measure'
import { type TableComponents, TableVirtuoso } from 'react-virtuoso'

import { EmptyState } from 'ui/src/components/empty-state'

import { Box } from '../box'
import { ChevronDown2Icon, ChevronUp2Icon, LoadingBarsIcon } from '../icons'
import * as styles from './table.css'

interface ITableProps {
	columns: Array<{
		Header: React.ReactNode | React.FC
		Cell?: React.ReactNode | React.FC
		accessor: string
		width: string
		className?: string
	}>
	data: Array<object>
	scrollableNode?: HTMLElement
	className?: ClassValue
	sizeVariant?: 'medium' | 'large'
	styleVariant?: 'primary' | 'secondary'
	loading?: boolean
	stickyShadowTop?: boolean
	loadMore?: boolean
	overscan?: number
	isScrolledTop?: boolean
	selectedRowIds?: { [key: number]: boolean }
	sort?: { id: string; desc: boolean }
	headerProps?: any
	cellProps?: any
	onEndReached?: () => void
	onRowSelected?: (row: any) => void
}

export const Table: React.FC<ITableProps> = props => {
	const {
		scrollableNode,
		isScrolledTop,
		className,
		sizeVariant = 'medium',
		styleVariant = 'primary',
		data,
		columns,
		selectedRowIds = {},
		loading = false,
		loadMore = false,
		stickyShadowTop = false,
		overscan = 100,
		sort,
		headerProps,
		cellProps,
		onEndReached = () => {},
		onRowSelected = () => {},
	} = props

	const [measureRef, { top: tableTop }] = useMeasure()
	const [stickyTop, setStickyTop] = useState<number>(0)

	const initialSort = useMemo(() => {
		if (sort || !columns?.length) return sort
		return [{ id: columns[0].accessor, desc: true }]
	}, [sort])

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, toggleAllRowsSelected, state } = useTable(
		{
			columns,
			data,
			initialState: {
				sortBy: initialSort,
				selectedRowIds,
			},
		},
		useSortBy,
		useRowSelect,
	)

	const handleDeselectAllRows = () => {
		toggleAllRowsSelected(false)
	}

	useEffect(() => {
		if (Object.keys(selectedRowIds || {}).length === 0) {
			handleDeselectAllRows()
		}
	}, [selectedRowIds])

	const handleEndReached = () => {
		onEndReached()
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
				const rowSelectedProps = row?.getToggleRowSelectedProps ? row?.getToggleRowSelectedProps() : null
				return (
					<tr
						onClick={e => {
							handleDeselectAllRows()
							onRowSelected(row)
							if (rowSelectedProps) rowSelectedProps.onChange(e)
						}}
						className={clsx(
							styles.tableTrRecipe({
								sizeVariant,
								styleVariant,
								isRowSelectable: !!onRowSelected,
							}),
							!loading && rowSelectedProps?.checked && 'tr-selected',
						)}
						{...tableRowProps}
						{...(row?.getRowProps ? row?.getRowProps() : {})}
					/>
				)
			},
			TableFoot: React.forwardRef((tableBodyProps, ref) => (
				<tfoot
					className={clsx(styles.tFootWrapper, loadMore && styles.tFootWrapperVisible)}
					{...getTableBodyProps()}
					{...tableBodyProps}
					ref={ref}
				/>
			)),
		}),
		[data, columns, loading, loadMore, JSON.stringify(state?.sortBy || {})],
	)

	const scrollableNodeBounding = (scrollableNode?.getBoundingClientRect() || {}) as DOMRect

	useEffect(() => {
		const updateStickyTop = tableTop - (scrollableNodeBounding?.top ?? 0)
		if (tableTop && tableTop > 0 && stickyTop === 0) {
			setStickyTop(updateStickyTop)
		}
	}, [scrollableNodeBounding?.top, tableTop, stickyTop])

	return (
		<Box
			ref={measureRef}
			className={clsx(styles.tableWrapper, className)}
			style={assignInlineVars({ [styles.stickyTop]: `${stickyTop}px` })}
		>
			<TableVirtuoso
				className={clsx(
					styles.tableRootWrapper,
					loading && styles.tableLoadingWrapper,
					stickyShadowTop && styles.tableRootTopStickyPosition,
					!loading && stickyShadowTop && !isScrolledTop && styles.accountTheadShadow,
				)}
				overscan={{ main: overscan, reverse: overscan }}
				totalCount={rows.length}
				customScrollParent={scrollableNode}
				components={memoizedComponents as TableComponents}
				endReached={handleEndReached}
				fixedHeaderContent={() =>
					headerGroups.map(headerGroup => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map(column => (
								<th
									className={clsx(
										styles.tableThRecipe({
											sizeVariant,
											styleVariant,
											loading,
										}),
										column.className,
									)}
									{...column.getHeaderProps(column.getSortByToggleProps())}
									style={{
										width: column.width,
									}}
								>
									<Box position="relative" component="span" display="inline-flex" alignItems="center" gap="xsmall">
										<Box component="span" className={styles.tableHeaderTruncateWrapper}>
											{column.render('Header', headerProps)}
										</Box>
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
				fixedFooterContent={() =>
					headerGroups.map(headerGroup => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column, columnIndex) => (
								<th
									className={column.className}
									{...column.getHeaderProps(column.getSortByToggleProps())}
									style={{
										width: column.width,
									}}
								>
									{columnIndex === 0 ? (
										<Box color="colorNeutral" className={styles.footerLoadingIconWrapper}>
											<LoadingBarsIcon />
										</Box>
									) : (
										<Box className={styles.footerLoadingDefaultWrapper}>&nbsp;</Box>
									)}
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
							className={clsx(
								styles.tableTdRecipe({
									sizeVariant,
									styleVariant,
								}),
								cell.column.className,
							)}
							{...cell.getCellProps()}
						>
							{cell.render('Cell', cellProps)}
						</td>
					))
				}}
			/>
		</Box>
	)
}

interface ITableWithEmptyStateProps extends ITableProps {
	emptyStateTitle: string
	emptyStateSubTitle: string
}

export const TableWithEmptyState: React.FC<ITableWithEmptyStateProps> = props => {
	const { emptyStateTitle, emptyStateSubTitle, data, ...rest } = props

	return data?.length === 0 ? (
		<Box className={styles.tableEmptyStateWrapper}>
			<EmptyState title={emptyStateTitle} subTitle={emptyStateSubTitle} />
		</Box>
	) : (
		<Table styleVariant="primary" sizeVariant="large" data={data} {...rest} />
	)
}
