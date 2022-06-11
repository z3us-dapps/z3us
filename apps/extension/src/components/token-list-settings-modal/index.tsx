/* eslint-disable */
import React, { useCallback, useState, useEffect, useMemo } from 'react'
import { useImmer } from 'use-immer'
import { SearchBox } from '@src/components/search-box'
import { Cross2Icon } from '@radix-ui/react-icons'
import Button from 'ui/src/components/button'
import { Virtuoso } from 'react-virtuoso'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipArrow } from 'ui/src/components/tool-tip'
import { Dialog, DialogTrigger, DialogContent } from 'ui/src/components/dialog'
import * as ReactBeautifulDnd from 'react-beautiful-dnd'
import { Box, Text, Flex } from 'ui/src/components/atoms'
import { Side } from '@radix-ui/popper'

// MIGHT NEED TO USE THESE
//export interface ItemType {
//id: string
//text: string
//height: number
//}

//export type ItemList = ItemType[]

//export const createItemList = (itemCount: number): ItemList => {
//const itemList: ItemList = []
//for (let i = 0; i < itemCount; i++) {
//itemList.push({
//id: i.toString(),
//text: `Item ${i}`,
//height: Math.random() * 20,
//})
//}

//return itemList
//}

const makeData = idSuffix =>
	Array.from({ length: 500 }, (_, k) => ({
		id: `id:${k}-${idSuffix}`,
		text: `${idSuffix} - item -  ${k}`,
	}))

interface IProps {
	children?: React.ReactNode
	toolTipSideOffset?: number
	toolTipSide?: Side
	toolTipMessage?: string
}

const defaultProps = {
	children: undefined,
	toolTipSideOffset: 3,
	toolTipSide: 'bottom',
	toolTipMessage: '',
}

export const TokenListSettingsModal = ({
	children,
	toolTipSideOffset,
	toolTipMessage,
	toolTipSide,
}: IProps): JSX.Element => {
	//const [items, setItems] = useState<ItemList>(createItemList(100))
	const [items, setItems] = useState(() => ({
		list1: makeData('list1'),
		list2: makeData('list2'),
	}))

	const reorder = React.useCallback((items, droppableSourceId, droppableDestId, startIndex, endIndex) => {
		const droppableSource = [...items[droppableSourceId]]
		const droppableDest = [...items[droppableDestId]]
		const [removed] = droppableSource.splice(startIndex, 1)
		droppableDest.splice(endIndex, 0, removed)

		return {
			...items,
			[droppableSourceId]: droppableSource,
			[droppableDestId]: droppableDest,
		}
	}, [])

	const onDragEnd = React.useCallback(
		result => {
			if (!result.destination) {
				return
			}

			if (result.source.index === result.destination.index) {
				return
			}

			setItems(items =>
				reorder(
					items,
					result.source.droppableId,
					result.destination.droppableId,
					result.source.index,
					result.destination.index,
				),
			)
		},
		[setItems, reorder],
	)

	const Item = React.useMemo(() => {
		return ({ provided, item, isDragging }) => {
			// For borders and visual space,
			// use container with padding rather than a margin
			// margins confuse virtuoso rendering
			return (
				<div
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					style={{ ...provided.draggableProps.style, paddingBottom: '8px' }}
				>
					<div
						style={{
							border: `1px solid ${isDragging ? 'red' : 'black'}`,
						}}
					>
						{item.text}
					</div>
				</div>
			)
		}
	}, [])

	const [state, setState] = useImmer({
		isModalOpen: false,
	})

	const handleOnClick = () => {
		setState(draft => {
			draft.isModalOpen = !draft.isModalOpen
		})
	}

	const handleCloseModal = () => {
		setState(draft => {
			draft.isModalOpen = false
		})
	}

	const handleSaveTokenList = () => {
		setState(draft => {
			draft.isModalOpen = false
		})
	}

	const handleSearchTokenList = (search: string) => {
		// eslint-disable-next-line
		console.log('search:', search)
	}

	return (
		<Dialog open={state.isModalOpen} modal={false}>
			<DialogTrigger asChild>
				<Tooltip>
					<TooltipTrigger asChild onClick={handleOnClick}>
						{children || <Box>Edit</Box>}
					</TooltipTrigger>
					<TooltipContent side={toolTipSide} sideOffset={toolTipSideOffset}>
						<TooltipArrow offset={6} />
						{toolTipMessage}
					</TooltipContent>
				</Tooltip>
			</DialogTrigger>
			<DialogContent css={{ p: '0' }}>
				<Box css={{ position: 'relative' }}>
					<Button
						color="ghost"
						iconOnly
						aria-label="close edit token list modal"
						size="1"
						css={{ position: 'absolute', top: '$2', right: '$2' }}
						onClick={handleCloseModal}
					>
						<Cross2Icon />
					</Button>
					<Box css={{ pt: '$4', px: '$5' }}>
						<Text size="5" bold css={{ mb: '$2' }}>
							Token list settings
						</Text>
						<Box css={{ mt: '$4' }}>
							<SearchBox onSearch={handleSearchTokenList} placeholder="Search tokens" />
						</Box>
						<Box css={{ mt: '$2' }}>
							<ReactBeautifulDnd.DragDropContext onDragEnd={onDragEnd}>
								<Flex css={{ '>div': { flex: '1' } }}>
									{['list1', 'list2'].map(droppableId => {
										return (
											<ReactBeautifulDnd.Droppable
												key={droppableId}
												droppableId={droppableId}
												mode="virtual"
												renderClone={(provided, snapshot, rubric) => (
													<Item
														provided={provided}
														isDragging={snapshot.isDragging}
														item={items[droppableId][rubric.source.index]}
													/>
												)}
											>
												{provided => {
													return (
														<Virtuoso
															components={{
																Item: React.useMemo(() => {
																	return ({ children, ...props }) => {
																		return (
																			// the height is necessary to prevent the item container from collapsing, which confuses Virtuoso measurements
																			<div {...props} style={{ height: props['data-known-size'] || undefined }}>
																				{children}
																			</div>
																		)
																	}
																}, []),
															}}
															scrollerRef={provided.innerRef}
															data={items[droppableId]}
															style={{ height: 300 }}
															itemContent={(index, item) => {
																return (
																	<ReactBeautifulDnd.Draggable draggableId={item.id} index={index} key={item.id}>
																		{provided => <Item provided={provided} item={item} isDragging={false} />}
																	</ReactBeautifulDnd.Draggable>
																)
															}}
														/>
													)
												}}
											</ReactBeautifulDnd.Droppable>
										)
									})}
								</Flex>
							</ReactBeautifulDnd.DragDropContext>
						</Box>
					</Box>
					<Flex justify="end" gap="2" css={{ mt: '$3', p: '$3' }}>
						<Button size="3" color="primary" aria-label="save" onClick={handleSaveTokenList}>
							Save
						</Button>
						<Button size="3" color="tertiary" aria-label="cancel" onClick={handleCloseModal}>
							Cancel
						</Button>
					</Flex>
				</Box>
			</DialogContent>
		</Dialog>
	)
}

TokenListSettingsModal.defaultProps = defaultProps
