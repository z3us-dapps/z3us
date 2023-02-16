/* eslint-disable */
import React, { useState, useRef, useEffect, useCallback, useContext } from 'react'
import { useTimeout } from 'usehooks-ts'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { useAccountParams } from '@src/containers/playground/hooks/use-account-params'
import { Virtuoso, VirtuosoGrid, VirtuosoGridHandle } from 'react-virtuoso'
import { ScrollArea } from 'ui/src/components/scroll-area'
import { motion, AnimatePresence, usePresence } from 'framer-motion'
import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'
import clsx from 'clsx'
import { Button } from 'ui/src/components-v2/button'
import { Link } from '@src/components/link'

import * as styles from './accounts-list.css'

const hash = () => Math.random().toString(36).substring(7)

const Context = React.createContext<{ isScrolling: boolean; isLoading: boolean; setItems: any }>({
	isScrolling: true,
	isLoading: true,
	setItems: () => {},
})

const ListContainer = React.forwardRef<HTMLDivElement>((props, ref) => {
	return <div ref={ref} {...props} className={styles.listContainer} />
})

const ItemContainer = props => <div {...props} className={styles.itemContainer} />

const variants = {
	visible: {
		opacity: 1,
		transition: {
			type: 'spring',
			stiffness: 200,
			damping: 20,
		},
	},
	hidden: {
		opacity: 0,
		transition: {
			type: 'spring',
			stiffness: 200,
			damping: 20,
		},
	},
}

const ItemWrapper = props => {
	const { idx, user } = props
	const { isLoading, isScrolling, setItems } = useContext(Context)
	const { account, assetType, asset } = useAccountParams()

	const getAnimateState = () => {
		if (!user.loaded) {
			return 'loading'
		}

		// if (isLoading && !isScrolling) {
		// 	return 'loading'
		// }

		return 'loaded'
	}

	const generateTempLink = () => {
		if (asset) {
			return `/accounts/${account}/tokens/xrd`
			// return `/accounts/${account}/tokens/xrd/b707388613169bf701d533e143d8f698c9090f605e677a967eaf70a4c69250ce`
		} else {
			return `/accounts/${account}/tokens/xrd`
		}
	}

	useTimeout(() => {
		setItems(items => {
			return items.map(item => {
				if (item.id === user.id) {
					item.loaded = true
				}
				return item
			})
		})
	}, 1000)

	return (
		<Box className={clsx(styles.itemWrapper, { [styles.itemWrapperLoading]: !user.loaded })}>
			<AnimatePresence initial={false}>
				{!user.loaded && (
					<motion.div
						initial="hidden"
						animate="visible"
						variants={variants}
						className={styles.itemWrapperMotion}
						style={{ position: 'absolute', top: '0', left: '0' }}
					>
						<Box paddingX="xlarge">
							<Box className={styles.itemWrapperInner}>
								<Box width="full" className={styles.tokenListGridWrapper}>
									<Box display="flex" alignItems="center" gap="medium">
										<Box className={clsx(styles.tokenListSkeleton, styles.tokenListGridCircle)} />
										<Box
											className={styles.tokenListSkeleton}
											style={{ width: idx % 2 == 0 ? '45%' : '65%', height: '50%' }}
										/>
									</Box>
									<Box display="flex" alignItems="center">
										<Box className={styles.tokenListSkeleton} style={{ width: '50%', height: '50%' }} />
									</Box>
									<Box display="flex" alignItems="center">
										<Box className={styles.tokenListSkeleton} style={{ width: '40%', height: '50%' }} />
									</Box>
									<Box display="flex" alignItems="center">
										<Box className={styles.tokenListSkeleton} style={{ width: '70%', height: '50%' }} />
									</Box>
								</Box>
							</Box>
						</Box>
					</motion.div>
				)}
			</AnimatePresence>
			<AnimatePresence initial={false}>
				{user.loaded && (
					<Link to={`/accounts/${account}/tokens/${user.id}`}>
						<motion.div initial="hidden" animate="visible" variants={variants} className={styles.itemWrapperMotion}>
							<Box className={clsx(styles.itemWrapperInner, asset && idx === 0 && styles.itemWrapperInnerSelected)}>
								<Box width="full" className={styles.tokenListGridWrapper}>
									<Box display="flex" alignItems="center" justifyContent="flex-start" gap="medium">
										<Box className={styles.tokenListGridCircle} style={{ backgroundColor: '#ea983d' }} />
										<Text size="medium" weight="medium" color="strong">
											{user.id}
										</Text>
									</Box>
									<Box display="flex" alignItems="center">
										<Text size="small" color="strong">
											Amount
										</Text>
									</Box>
									<Box display="flex" alignItems="center">
										<Text size="small" color="strong">
											Value
										</Text>
									</Box>
									<Box display="flex" alignItems="center">
										<Text size="small" color="strong">
											Category
										</Text>
									</Box>
								</Box>
							</Box>
						</motion.div>
					</Link>
				)}
			</AnimatePresence>
		</Box>
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

// imperative ref
// export const AccountsList = React.forwardRef<React.ElementRef<'div'>, AccountListProps>((props, forwardedRef) => {
export const AccountsList = props => {
	const { className, view, ...rest } = props

	const ref = useRef(null)
	const [listHeight, setListHeight] = useState<number>(200)
	const [listMaxHeight, setListMaxHeight] = useState<number>(300)
	const [customScrollParent, setCustomScrollParent] = useState<HTMLElement | null>(null)
	const [items, setItems] = useState(Array.from({ length: 20 }, _ => ({ id: hash(), name: hash(), loaded: false })))
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

	const addAtStart = () => setItems([{ id: hash(), name: hash(), loaded: false }, ...items])

	const addAtRandom = () => {
		items.splice(Math.floor(Math.random() * items.length), 0, { id: hash(), name: hash(), loaded: false })
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

	const reset = () => setItems(Array.from({ length: 10 }, _ => ({ id: hash(), name: hash(), loaded: false })))

	// Disable animation on scroll or Virtuoso will break while scrolling
	const onScrollingStateChange = useCallback(value => {
		setIsScrolling(value)
	}, [])

	// computeItemKey is necessary for animation to ensure Virtuoso reuses the same elements
	const computeItemKey = useCallback(
		index => {
			return items[index].id
		},
		[items],
	)

	return (
		<>
			<Box style={{ position: 'fixed', bottom: '100px', right: '0', width: '100px', zIndex: '1', display: 'none' }}>
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
					position="relative"
					borderBottom={1}
					borderStyle="solid"
					borderColor="borderDivider"
					paddingBottom="medium"
					zIndex={1}
					className={styles.tokenListGridWrapper}
				>
					<Box display="flex" alignItems="center">
						<Text size="xsmall" weight="medium">
							Asset
						</Text>
					</Box>
					<Box display="flex" alignItems="center">
						<Text size="xsmall" weight="medium">
							Amount
						</Text>
					</Box>
					<Box display="flex" alignItems="center">
						<Text size="xsmall" weight="medium">
							Value
						</Text>
					</Box>
					<Box display="flex" alignItems="center">
						<Text size="xsmall" weight="medium">
							Category
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
				<Context.Provider value={{ isScrolling, isLoading, setItems }}>
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
			</div>
		</>
	)
}

AccountsList.displayName = 'AccountsList'
