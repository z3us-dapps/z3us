/* eslint-disable react/jsx-props-no-spreading, react/destructuring-assignment */
import React, { useState, useEffect, useCallback } from 'react'
import { useSharedStore, useStore } from '@src/store'
import { useEventListener } from 'usehooks-ts'
import { useTokenBalances } from '@src/hooks/react-query/queries/radix'
import { useKnownTokens } from '@src/hooks/react-query/queries/radixscan'
import { useImmer } from 'use-immer'
import { SearchBox } from '@src/components/search-box'
import { Cross2Icon, ResetIcon } from '@radix-ui/react-icons'
import Button from 'ui/src/components/button'
import { Virtuoso } from 'react-virtuoso'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipArrow } from 'ui/src/components/tool-tip'
import { Dialog, DialogTrigger, DialogContent } from 'ui/src/components/dialog'
import * as ReactBeautifulDnd from 'react-beautiful-dnd'
import { Box, Text, Flex } from 'ui/src/components/atoms'
import { Side } from '@radix-ui/popper'
import { Token as TokenBalance, VisibleTokens, VisibleToken } from '@src/types'
import { OCI_TEST_RRI } from '@src/config'
import { Token } from './token'

const VISIBLE = 'visible'
const INVISIBLE = 'invisible'

interface ImmerT {
	isModalOpen: boolean
	search: string
	[VISIBLE]: VisibleTokens
	[INVISIBLE]: VisibleTokens
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

const getIsQueryMatch = (search: string, _token: VisibleToken): boolean =>
	(search !== '' && _token.name?.toLowerCase().includes(search)) || _token.symbol?.toLowerCase().includes(search)

const makeVisibleTokenTokenData = (
	_tokens: VisibleTokens,
	visibleTokens: VisibleTokens,
	availableBalances: TokenBalance[],
): VisibleTokens => {
	const vs = { ...visibleTokens }
	if (Object.values(vs).length === 0) {
		availableBalances?.forEach(token => {
			if (vs[token.rri]) return
			const visibleToken = _tokens[token.rri]
			if (visibleToken) {
				vs[token.rri] = visibleToken
			}
		})
	}
	return vs
}

const ignorTokenRRIs = [OCI_TEST_RRI]

const makeInvisibleTokenData = (
	search: string,
	_tokens: VisibleTokens,
	visibleTokens: VisibleTokens,
): VisibleTokens => {
	const ivs = Object.values(_tokens).reduce((obj, item: VisibleToken) => {
		if (!getIsQueryMatch(search, item)) {
			return obj
		}
		if (ignorTokenRRIs.includes(item.rri)) {
			return obj
		}
		obj[item.rri] = { ...item }
		return obj
	}, {})
	Object.keys(visibleTokens).forEach(key => {
		delete ivs[key]
	})
	return ivs
}

const VirtuosoItem = React.memo(({ children, ...rest }) => {
	const [size, setSize] = useState<number>(0)
	const knownSize = rest['data-known-size']
	useEffect(() => {
		setSize(prevSize => (knownSize === 0 ? prevSize : knownSize))
	}, [knownSize])
	return (
		// the height is necessary to prevent the item container from collapsing, which confuses Virtuoso measurements
		<Box
			{...rest}
			className="height-preserving-container"
			// check styling in the style tag below
			css={{ '--child-height': `${size}px` }}
		>
			{children}
		</Box>
	)
})

const Item = ({ provided, item, isDragging }) => (
	<div
		{...provided.draggableProps}
		{...provided.dragHandleProps}
		ref={provided.innerRef}
		style={{ ...provided.draggableProps.style, paddingBottom: '8px' }}
	>
		<Token rri={item.rri} isDragging={isDragging} />
	</div>
)

const VirtuosoItemContent = (index, item) => (
	<ReactBeautifulDnd.Draggable key={item.rri} draggableId={item.rri} index={index}>
		{provided => <Item provided={provided} item={item} isDragging={false} />}
	</ReactBeautifulDnd.Draggable>
)

export const TokenListSettingsModal = ({
	children,
	toolTipSideOffset,
	toolTipMessage,
	toolTipSide,
}: IProps): JSX.Element => {
	const { addToast } = useSharedStore(state => ({
		addToast: state.addToastAction,
	}))
	const { currentVisibleTokens, setVisibleTokens } = useStore(state => ({
		currentVisibleTokens: state.visibleTokens,
		setVisibleTokens: state.setVisibleTokensAction,
	}))
	const { data: balances } = useTokenBalances()
	const { data: tokens } = useKnownTokens()
	const [state, setState] = useImmer<ImmerT>({
		isModalOpen: false,
		search: '',
		[VISIBLE]: currentVisibleTokens,
		[INVISIBLE]: {},
	})

	useEffect(() => {
		if (!tokens) return
		setState(draft => {
			const visible = makeVisibleTokenTokenData(tokens, draft[VISIBLE], balances?.account_balances?.liquid_balances)

			draft[VISIBLE] = visible
			draft[INVISIBLE] = makeInvisibleTokenData(draft.search.toLowerCase(), tokens, visible)
		})
	}, [balances, tokens, currentVisibleTokens])

	const onDragEnd = useCallback(
		result => {
			if (!result.destination) {
				return
			}
			const sourceDropId = result.source.droppableId
			const destinationDropId = result.destination.droppableId
			const sourceIndex = result.source.index
			const destinationIndex = result.destination.index

			if (sourceDropId === destinationDropId) {
				if (destinationDropId === INVISIBLE) {
					addToast({
						type: 'error',
						title: 'Invalid action',
						subTitle: 'You can only change the order of visible tokens',
						duration: 5000,
						isAutoRemovable: false,
					})
					return
				}
				if (sourceIndex === destinationIndex) {
					return
				}
			}

			setState(draft => {
				const movingRRI = Object.keys(draft[sourceDropId])[sourceIndex]
				const movingItem = draft[sourceDropId][movingRRI]

				let visible = { ...draft[VISIBLE] }

				if (sourceDropId === VISIBLE) {
					delete visible[movingRRI]
				}

				if (destinationDropId === VISIBLE) {
					if (Object.keys(visible).length <= destinationIndex) {
						visible[movingRRI] = movingItem
					} else {
						visible = Object.values(visible).reduce((obj, item: VisibleToken, idx) => {
							if (idx === destinationIndex) {
								obj[movingRRI] = movingItem
							}
							obj[item.rri] = item
							return obj
						}, {})
					}
				}

				visible = makeVisibleTokenTokenData(tokens, visible, balances?.account_balances?.liquid_balances)

				draft[VISIBLE] = visible
				draft[INVISIBLE] = makeInvisibleTokenData(draft.search.toLowerCase(), tokens, visible)
			})
		},
		[state[VISIBLE], state[INVISIBLE]],
	)

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
		setVisibleTokens(state[VISIBLE])
		setState(draft => {
			draft.isModalOpen = false
		})
	}

	const handleResetTokenList = () => {
		setState(draft => {
			draft.search = ''

			const visible = makeVisibleTokenTokenData(tokens, {}, balances?.account_balances?.liquid_balances)

			draft[VISIBLE] = visible
			draft[INVISIBLE] = makeInvisibleTokenData(draft.search.toLowerCase(), tokens, visible)
		})
	}

	const handleSearchTokenList = (search: string) => {
		setState(draft => {
			draft.search = search
		})
	}

	useEffect(() => {
		setState(draft => {
			if (!tokens) return
			draft[INVISIBLE] = makeInvisibleTokenData(draft.search.toLowerCase(), tokens, draft[VISIBLE])
		})
	}, [state.search])

	useEventListener('error', e => {
		if (
			e.message === 'ResizeObserver loop completed with undelivered notifications.' ||
			e.message === 'ResizeObserver loop limit exceeded'
		) {
			e.stopImmediatePropagation()
		}
	})

	useEventListener('keydown', e => {
		if (e.key === 'Escape') {
			setState(draft => {
				draft.isModalOpen = false
			})
		}
	})

	return (
		<Dialog open={state.isModalOpen} modal={false}>
			<DialogTrigger asChild>
				<Tooltip>
					<TooltipTrigger asChild onClick={handleOnClick}>
						{children || <Box>Edit</Box>}
					</TooltipTrigger>
					<TooltipContent side={toolTipSide} sideOffset={toolTipSideOffset}>
						<TooltipArrow offset={10} />
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
							<SearchBox
								focusOnMount
								showCancelOnlyWithValueButton
								onSearch={handleSearchTokenList}
								placeholder="Search tokens"
								debounce={200}
							/>
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
									{[VISIBLE, INVISIBLE].map(droppableId => {
										const items = Object.values(state[droppableId]) as VisibleTokens[]
										return (
											<ReactBeautifulDnd.Droppable
												key={droppableId}
												droppableId={droppableId}
												mode="virtual"
												renderClone={(provided, snapshot, rubric) => (
													<Item
														provided={provided}
														isDragging={snapshot.isDragging}
														item={items[rubric.source.index]}
													/>
												)}
											>
												{provided => (
													<Virtuoso
														className="custom-scroll-bars"
														components={{
															Item: VirtuosoItem,
														}}
														scrollerRef={provided.innerRef}
														data={items}
														style={{ height: 290 }}
														itemContent={VirtuosoItemContent}
													/>
												)}
											</ReactBeautifulDnd.Droppable>
										)
									})}
								</Flex>
							</ReactBeautifulDnd.DragDropContext>
						</Box>
					</Box>
					<Flex justify="end" gap="2" css={{ p: '$3', borderTop: '1px solid $borderPanel' }}>
						<Box css={{ flex: '1' }}>
							<Button size="3" color="ghost" aria-label="cancel" onClick={handleResetTokenList}>
								<ResetIcon />
								Reset
							</Button>
						</Box>
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
