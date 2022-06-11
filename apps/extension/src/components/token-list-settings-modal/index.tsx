/* eslint-disable */
import React, { useCallback, useState, useEffect, useMemo } from 'react'
import { useImmer } from 'use-immer'
import { SearchBox } from '@src/components/search-box'
import { Cross2Icon } from '@radix-ui/react-icons'
import Button from 'ui/src/components/button'
import { Virtuoso } from 'react-virtuoso'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipArrow } from 'ui/src/components/tool-tip'
import { Dialog, DialogTrigger, DialogContent } from 'ui/src/components/dialog'
import { Draggable, DragDropContext, Droppable, DropResult, ResponderProvided } from 'react-beautiful-dnd'
import { Box, Text, Flex } from 'ui/src/components/atoms'
import { Side } from '@radix-ui/popper'

export interface ItemType {
	id: string
	text: string
	height: number
}

export type ItemList = ItemType[]

export const createItemList = (itemCount: number): ItemList => {
	const itemList: ItemList = []
	for (let i = 0; i < itemCount; i++) {
		itemList.push({
			id: i.toString(),
			text: `Item ${i}`,
			height: Math.random() * 20,
		})
	}

	return itemList
}

export const reorder = (list: ItemList, startIndex: number, endIndex: number) => {
	const result = Array.from(list)
	const [removed] = result.splice(startIndex, 1)
	result.splice(endIndex, 0, removed)

	return result
}

function Item({ provided, item, isDragging }) {
	return (
		<div style={{ paddingBottom: '8px' }}>
			<div
				{...provided.draggableProps}
				{...provided.dragHandleProps}
				ref={provided.innerRef}
				style={provided.draggableProps.style}
				className={`item ${isDragging ? 'is-dragging' : ''}`}
			>
				{item.text}
			</div>
		</div>
	)
}

interface HProps {
	children: React.ReactNode
}

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

const itemCount = 30

export const TokenListSettingsModal = ({
	children,
	toolTipSideOffset,
	toolTipMessage,
	toolTipSide,
}: IProps): JSX.Element => {
	const [itemList, setItemList] = useState<ItemList>(createItemList(itemCount))

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

	const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
		// dropped outside the list
		if (!result.destination) {
			return
		}

		const items = reorder(itemList, result.source.index, result.destination.index)

		setItemList(items)
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
							<div>
								<style>
									{`
          .height-preserving-container:empty {
            min-height: calc(var(--child-height));
            box-sizing: border-box;
          }
      `}
								</style>
								<DragDropContext onDragEnd={onDragEnd}>
									<Droppable
										droppableId="droppable"
										mode="virtual"
										renderClone={(provided, snapshot, rubric) => (
											<Item provided={provided} isDragging={snapshot.isDragging} item={itemList[rubric.source.index]} />
										)}
									>
										{provided => {
											return (
												<Virtuoso
													components={{
														Item: props => {
															const { children, ...rest } = props
															const [size, setSize] = useState<number>(0)
															const knownSize = rest['data-known-size']
															useEffect(() => {
																setSize(prevSize => {
																	return knownSize == 0 ? prevSize : knownSize
																})
															}, [knownSize])
															return (
																<Box
																	{...rest}
																	className="height-preserving-container"
																	// check styling in the style tag below
																	css={{ '--child-height': `${size}px` }}
																>
																	{children}
																</Box>
															)
														},
													}}
													scrollerRef={provided.innerRef}
													data={itemList}
													style={{ width: 200, height: 200 }}
													itemContent={(index, item) => {
														return (
															<Draggable draggableId={item.id} index={index} key={item.id}>
																{provided => <Item provided={provided} item={item} isDragging={false} />}
															</Draggable>
														)
													}}
												/>
											)
										}}
									</Droppable>
								</DragDropContext>
							</div>
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
