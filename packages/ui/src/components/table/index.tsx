/* eslint-disable react/no-unstable-nested-components */
import clsx, { type ClassValue } from 'clsx'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRowSelect, useSortBy, useTable } from 'react-table'
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
	selectedRowIds?: { [key: number]: boolean }
	sort?: { id: string; desc: boolean }
	headerProps?: any
	cellProps?: any
	onEndReached?: () => void
	onRowSelected?: (row: any) => void
}

const defaultSelectedRowIds = {}
const emptyFunction = () => {}

interface IInitialStateType {
	sortBy: { id: string; desc: boolean }[] | { id: string; desc: boolean }
	selectedRowIds?: { [key: number]: boolean }
}

export const Table: React.FC<ITableProps> = props => {
	const {
		scrollableNode,
		className,
		sizeVariant = 'medium',
		styleVariant = 'primary',
		data,
		columns,
		selectedRowIds = defaultSelectedRowIds,
		loading = false,
		loadMore = false,
		stickyShadowTop = false,
		overscan = 100,
		sort,
		headerProps,
		cellProps,
		onEndReached = emptyFunction,
		onRowSelected = emptyFunction,
	} = props

	const tableRef = useRef(null)
	const initialSort = useMemo(() => {
		if (sort || !columns?.length) return sort
		return [{ id: columns[0].accessor, desc: true }]
	}, [sort, columns])

	const [initialState, setInitialState] = useState<IInitialStateType>({
		sortBy: initialSort,
		selectedRowIds,
	})

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, toggleAllRowsSelected, state } = useTable(
		{
			columns,
			data,
			initialState,
		},
		useSortBy,
		useRowSelect,
	)

	useEffect(() => {
		if (state) setInitialState(state)
	}, [state])

	const handleDeselectAllRows = () => {
		toggleAllRowsSelected(false)
	}

	useEffect(() => {
		if (Object.keys(selectedRowIds).length === 0) {
			handleDeselectAllRows()
		}
	}, [selectedRowIds])

	const handleEndReached = () => {
		onEndReached()
	}

	const memoizedComponents: TableComponents = useMemo(
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
		[loading, loadMore, sizeVariant, styleVariant, onRowSelected, getTableProps, getTableBodyProps, rows],
	)

	const renderItem = useCallback(
		(index: number) => {
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
		},
		[rows, prepareRow, cellProps],
	)

	const renderHeader = useCallback(
		() =>
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
			)),
		[headerGroups, headerProps],
	)

	const renderFooter = useCallback(
		() =>
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
			)),
		[headerGroups],
	)

	return (
		<Box ref={tableRef} height="full" className={clsx(styles.tableWrapper, className)}>
			<TableVirtuoso
				className={clsx(
					styles.tableRootWrapper,
					loading && styles.tableLoadingWrapper,
					stickyShadowTop && styles.tableRootTopStickyPosition,
					!loading && stickyShadowTop && styles.accountTheadShadow,
				)}
				overscan={{ main: overscan, reverse: overscan }}
				totalCount={rows.length}
				customScrollParent={scrollableNode}
				components={memoizedComponents}
				endReached={handleEndReached}
				fixedHeaderContent={renderHeader}
				fixedFooterContent={renderFooter}
				itemContent={renderItem}
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

	if (data?.length === 0)
		return (
			<Box className={styles.tableEmptyStateWrapper}>
				<EmptyState title={emptyStateTitle} subTitle={emptyStateSubTitle} />
			</Box>
		)

	return <Table styleVariant="primary" sizeVariant="large" data={data} {...rest} />
}
