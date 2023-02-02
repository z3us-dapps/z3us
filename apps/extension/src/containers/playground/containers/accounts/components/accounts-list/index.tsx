/* eslint-disable */
import React, { useState, useRef, useEffect, useCallback, useContext } from 'react'
import { useTimeout } from 'usehooks-ts'
import { Virtuoso, VirtuosoGrid, VirtuosoGridHandle } from 'react-virtuoso'
import { motion, AnimatePresence, usePresence } from 'framer-motion'
import { ScrollArea } from 'ui/src/components/scroll-area'
import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'
import clsx from 'clsx'
import { Button } from 'ui/src/components-v2/button'

import * as styles from './accounts-list.css'

const Context = React.createContext({
	isScrolling: true,
	isLoading: true,
})

const ListContainer = React.forwardRef<HTMLDivElement>((props, ref) => {
	return <div ref={ref} {...props} className={styles.listContainer} />
})

const ItemContainer = props => <div {...props} className={styles.itemContainer} />

// This uses the context to set animate back to true when scrolling ends, because
// framer-motion will only animate changes if animate was already set before the change
const variants = {
	loaded: (i: number) => ({
		opacity: 1,
		scale: 1,
		transition: {
			delay: i * 0.05,
			type: 'spring',
			stiffness: 260,
			damping: 20,
		},
	}),
	loading: {
		opacity: 0.5,
		scale: 1,
		transition: {
			type: 'spring',
			stiffness: 260,
			damping: 20,
		},
	},
}
const ItemWrapper = props => {
	const { idx, user } = props
	const { isLoading, isScrolling } = useContext(Context)
	const [isItemLoading, setIsItemLoading] = useState(false)

	const getAnimateState = () => {
		if (isItemLoading && !isScrolling) {
			return 'loading'
		}

		if (isLoading && !isScrolling) {
			return 'loading'
		}

		return 'loaded'
	}

	useTimeout(() => {
		setIsItemLoading(false)
	}, 1000)

	return (
		<motion.div
			animate={getAnimateState()}
			custom={props.idx}
			variants={variants}
			className={clsx(styles.itemWrapper, { [styles.itemWrapperLoading]: isLoading })}
			{...props}
		>
			<Box className={styles.ItemWrapperInner}>
				<Box width="full" className={styles.tokenListGridWrapper}>
					<Box display="flex" alignItems="center" justifyContent="flex-start" gap="medium">
						<Box className={styles.tokenListGridCircle} style={{ backgroundColor: '#ea983d' }} />
						<Text size="medium" weight="medium" color="strong">
							Bitcoin (BTC)
						</Text>
					</Box>
					<Box display="flex" alignItems="center" justifyContent="center">
						<Text size="small" color="strong">
							Amount
						</Text>
					</Box>
					<Box display="flex" alignItems="center" justifyContent="center">
						<Text size="small" color="strong">
							Category
						</Text>
					</Box>
					<Box display="flex" alignItems="center" justifyContent="flex-start">
						<Text size="small" color="strong">
							Account
						</Text>
					</Box>
				</Box>
			</Box>
			{/* {isItemLoading && !isScrolling ? ( */}
			{/* 	<h4>loading....</h4> */}
			{/* ) : ( */}
			{/* 	<h4> */}
			{/* 		{user} -{idx} */}
			{/* 	</h4> */}
			{/* )} */}
		</motion.div>
	)
}

// interface IProps {
// 	href?: string | undefined
// }
// export interface AccountsListProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cvaAccountsList> {}

// const defaultProps = {
// 	children: undefined,
// 	href: undefined,
// 	type: 'button',
// }

const hash = () => Math.random().toString(36).substring(7)

export function generateUsers(length, startIndex = 0) {
	return Array.from({ length }).map((_, i) => ({ name: hash(), bgColor: 'transparent', description: 'heebs' }))
}

// imperative ref
// export const AccountsList = React.forwardRef<React.ElementRef<'div'>, AccountListProps>((props, forwardedRef) => {
export const AccountsList = props => {
	const { className, view, ...rest } = props

	const ref = useRef(null)
	const [listHeight, setListHeight] = useState<number>(200)
	const [listMaxHeight, setListMaxHeight] = useState<number>(300)
	const [customScrollParent, setCustomScrollParent] = useState<HTMLElement | null>(null)
	const [items, setItems] = useState(Array.from({ length: 100 }, (_, i) => hash()))
	const [isLoading, setIsLoading] = useState(false)
	const [isScrolling, setIsScrolling] = useState(false)

	const setListSize = () => {
		const listRef = ref.current
		if (listRef) {
			const simpleBarContent = listRef.getElementsByClassName('simplebar-content')[0]
			setListHeight(simpleBarContent?.offsetHeight || 100)
			const listBounding = listRef.getBoundingClientRect()

			// TODO need to listen to screen size change and also useImperativeRef to get parent ref
			const maxHeight = window.innerHeight - listBounding.top - 48
			setListMaxHeight(maxHeight)
		}
	}

	useEffect(() => {
		// setListSize()
	}, [ref?.current])

	// useTimeout(() => {
	// 	setIsLoading(false)
	// }, 2000)

	const addAtStart = () => setItems([hash(), ...items])

	const addAtRandom = () => {
		items.splice(Math.floor(Math.random() * items.length), 0, hash())
		setItems([...items])
	}

	const removeAtStart = () => {
		setItems(prev => {
			return [
				...prev.filter((item, index) => {
					return index !== 0
				}),
			]
		})
	}

	const removeAtRandom = () => {
		items.splice(Math.floor(Math.random() * items.length), 1)
		setItems([...items])
	}

	const reset = () => setItems(['One', 'Two', 'Three', 'Four'])

	const removeSelf = i => {
		items.splice(i, 1)
		setItems([...items])
	}

	// Disable animation on scroll or Virtuoso will break while scrolling
	const onScrollingStateChange = useCallback(value => {
		setIsScrolling(value)
	}, [])

	// computeItemKey is necessary for animation to ensure Virtuoso reuses the same elements
	const computeItemKey = useCallback(
		index => {
			return items[index]
		},
		[items],
	)

	return (
		<>
			<Box style={{ position: 'fixed', bottom: '100px', right: '0', width: '100px', zIndex: '1' }}>
				<Box display="flex" flexDirection="column" gap="medium">
					<button onClick={addAtStart}>Add item to start</button>
					<button onClick={addAtRandom}>Add item at random</button>
					<button onClick={removeAtStart}>Remove from start</button>
					<button onClick={removeAtRandom}>Remove random</button>
					<button onClick={reset}>Reset</button>
					<button onClick={() => setIsLoading(!isLoading)}>is loading</button>
				</Box>
			</Box>

			<Box paddingX="xlarge">
				<Box
					borderBottom={1}
					borderStyle="solid"
					borderColor="borderDivider"
					paddingBottom="medium"
					className={styles.tokenListGridWrapper}
				>
					<Box display="flex" alignItems="center" justifyContent="flex-start">
						<Text size="xsmall" weight="medium">
							Assets
						</Text>
					</Box>
					<Box display="flex" alignItems="center" justifyContent="center">
						<Text size="xsmall" weight="medium">
							Amount
						</Text>
					</Box>
					<Box display="flex" alignItems="center" justifyContent="center">
						<Text size="xsmall" weight="medium">
							Category
						</Text>
					</Box>
					<Box display="flex" alignItems="center" justifyContent="flex-start">
						<Text size="xsmall" weight="medium">
							Account
						</Text>
					</Box>
				</Box>
			</Box>
			<div
				ref={ref}
				{...rest}
				style={{
					height: `${listHeight}px`,
					maxHeight: `${listMaxHeight}px`,
				}}
				className={clsx(styles.wrapper)}
			>
				<AnimatePresence initial={false}>
					<Context.Provider value={{ isScrolling, isLoading }}>
						<ScrollArea
							scrollableNodeProps={{ ref: setCustomScrollParent }}
							onScrollAreaSizeChange={setListSize}
							enabled={!isLoading}
						>
							<VirtuosoGrid
								className={clsx(
									{ [styles.virtuosoGridList]: view === 'list' },
									{ [styles.virtuosoGridTwo]: view === 'tileTwo' },
									{ [styles.virtuosoGridThree]: view === 'tileThree' },
								)}
								customScrollParent={customScrollParent}
								data={items}
								// itemContent={(index, user) => (
								// 	<ItemWrapper idx={index}>
								// 		{isLoading ? (
								// 			<h4>loading....</h4>
								// 		) : (
								// 			<h4>
								// 				{user} -{index}
								// 			</h4>
								// 		)}
								// 	</ItemWrapper>
								// )}
								itemContent={(index, user) => (
									<ItemWrapper idx={index} user={user} isLoading={isLoading} isScrolling={isScrolling} />
								)}
								components={{
									List: ListContainer,
									Item: ItemContainer,
									// ScrollSeekPlaceholder: ({ height, width, index }) => (
									// 	<ItemContainer>
									// 		<ItemWrapper>
									// 			{'--'} - {index}
									// 		</ItemWrapper>
									// 	</ItemContainer>
									// ),
								}}
								computeItemKey={computeItemKey}
								isScrolling={onScrollingStateChange}
								// overscan={200}
								// scrollSeekConfiguration={{
								// 	enter: velocity => Math.abs(velocity) > 200,
								// 	exit: velocity => Math.abs(velocity) < 30,
								// 	// change: (_, range) => console.log({ range }),
								// }}
							/>
						</ScrollArea>
					</Context.Provider>
				</AnimatePresence>
			</div>
		</>
	)
}

AccountsList.displayName = 'AccountsList'
