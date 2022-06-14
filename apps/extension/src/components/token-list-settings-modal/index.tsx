/* eslint-disable */
import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useTokenBalances } from '@src/services/react-query/queries/radix'
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
import { Token } from './token'
import { tokens } from './tokens'

const VISIBLE = 'visible'
const NON_VISIBLE = 'non_visible'
const TOKEN_RRI = 'RRI'

const makeVisibleTokenTokenData = visibleTokens => {
	return visibleTokens.map(token => {
		const rri = token?.rri
		return {
			id: rri,
			rri,
		}
	})
}

const makeTokenData = (tokens, visibleTokens) => {
	const tokenRris = tokens[TOKEN_RRI]
	return tokenRris
		.filter(_rri => !visibleTokens.find(_token => _token.rri === _rri))
		.map(rri => {
			return {
				id: rri,
				rri,
			}
		})
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

export const TokenListSettingsModal = ({
	children,
	toolTipSideOffset,
	toolTipMessage,
	toolTipSide,
}: IProps): JSX.Element => {
	const { data } = useTokenBalances()
	const [state, setState] = useImmer({
		isModalOpen: false,
		[VISIBLE]: [],
		[NON_VISIBLE]: [],
	})

	const reorder = useCallback((items, droppableSourceId, droppableDestId, startIndex, endIndex) => {
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

			//setItems(items =>
			//reorder(
			//items,
			//result.source.droppableId,
			//result.destination.droppableId,
			//result.source.index,
			//result.destination.index,
			//),
			//)
		},
		[reorder],
	)

	const Item = useMemo(() => {
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
					<Token rri={item.rri} isDragging={isDragging} />
				</div>
			)
		}
	}, [])

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

	useEffect(() => {
		const visibleBalances = data?.account_balances?.liquid_balances
		const visibleTokens = makeVisibleTokenTokenData(visibleBalances)

		setState(draft => {
			draft[VISIBLE] = visibleTokens
			draft[NON_VISIBLE] = makeTokenData(tokens, visibleTokens)
		})

		window.addEventListener('error', e => {
			if (
				e.message === 'ResizeObserver loop completed with undelivered notifications.' ||
				e.message === 'ResizeObserver loop limit exceeded'
			) {
				e.stopImmediatePropagation()
			}
		})
	}, [])

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
					<Box css={{ pt: '$5', px: '$5' }}>
						<Text size="6" bold css={{ mb: '$2' }}>
							Token list settings
						</Text>
						<Text css={{ mt: '$3' }}>Drag and drop to change the order in which to display tokens.</Text>
						<Box css={{ mt: '$2' }}>
							<SearchBox showCancelOnlyWithValueButton onSearch={handleSearchTokenList} placeholder="Search tokens" />
						</Box>
						<Flex css={{ mt: '$3', gap: '12px' }}>
							<Box css={{ flex: '1' }}>
								<Text bold size="2">
									Visible
								</Text>
							</Box>
							<Box css={{ flex: '1' }}>
								<Text bold size="2">
									Non-visible
								</Text>
							</Box>
						</Flex>
						<Box
							css={{
								mt: '6px',
								'.custom-scroll-bars': {
									'scrollbar-width': 'auto',
									'scrollbar-color': '#6e4af6 $bgPanel',
									'&::-webkit-scrollbar': {
										width: '10px',
									},
									'&::-webkit-scrollbar-track': {
										background: 'var(--colors-bgPanelDialog)',
									},
									'&::-webkit-scrollbar-thumb': {
										backgroundColor: '#6e4af6',
										borderRadius: '10px',
										$$scrollBorderColor: 'var(--colors-bgPanelDialog)',
										border: '3px solid $$scrollBorderColor',
									},
								},
							}}
						>
							<style>
								{`
									.height-preserving-container:empty {
										min-height: calc(var(--child-height));
										box-sizing: border-box;
									}
								`}
							</style>
							<ReactBeautifulDnd.DragDropContext onDragEnd={onDragEnd}>
								<Flex css={{ gap: '12px', '> div': { flex: '1' } }}>
									{[VISIBLE, NON_VISIBLE].map(droppableId => {
										return (
											<ReactBeautifulDnd.Droppable
												key={droppableId}
												droppableId={droppableId}
												mode="virtual"
												renderClone={(provided, snapshot, rubric) => (
													<Item
														provided={provided}
														isDragging={snapshot.isDragging}
														item={state[droppableId][rubric.source.index]}
													/>
												)}
											>
												{provided => {
													return (
														<Virtuoso
															className="custom-scroll-bars"
															components={{
																Item: useMemo(() => {
																	return ({ children, ...props }) => {
																		const [size, setSize] = useState(0)
																		const knownSize = props['data-known-size']
																		useEffect(() => {
																			setSize(prevSize => {
																				return knownSize == 0 ? prevSize : knownSize
																			})
																		}, [knownSize])
																		return (
																			// the height is necessary to prevent the item container from collapsing, which confuses Virtuoso measurements
																			<Box
																				{...props}
																				className="height-preserving-container"
																				// check styling in the style tag below
																				css={{ '--child-height': `${size}px` }}
																			>
																				{children}
																			</Box>
																		)
																	}
																}, []),
															}}
															scrollerRef={provided.innerRef}
															data={state[droppableId]}
															style={{ height: 290 }}
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
					<Flex justify="end" gap="2" css={{ p: '$3', borderTop: '1px solid $borderPanel' }}>
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
