/* eslint-disable */
import React, { useState, useRef, useEffect, useCallback, useContext } from 'react'
import { Virtuoso, VirtuosoGrid, VirtuosoGridHandle } from 'react-virtuoso'
import { motion, AnimatePresence, usePresence } from 'framer-motion'
import { ScrollArea } from 'ui/src/components/scroll-area'
import { cva, VariantProps } from 'class-variance-authority'
import { Button } from 'ui/src/components-v2/button'

import './accounts-list.css'

const cvaAccountsListVariants = cva('z3-c-account-list', {
	variants: {
		view: {
			list: ['z3-c-account-list--list'],
			tileTwo: ['z3-c-account-list--tile-two'],
			tileThree: ['z3-c-account-list--tile-three'],
		},
	},
	defaultVariants: {
		view: 'list',
	},
})

const ListContainer = React.forwardRef<HTMLDivElement>((props, ref) => (
	<div ref={ref} {...props} className="z3-c-account-list__container" />
))

const ItemContainer = props => <div {...props} className="z3-c-account-list__item-container" />

// This uses the context to set animate back to true when scrolling ends, because
// framer-motion will only animate changes if animate was already set before the change
const ItemWrapper = props => {
	return <div {...props} className="z3-c-account-list__item-wrapper" />
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

type AccountListProps = React.ComponentProps<'div'> & VariantProps<typeof cvaAccountsListVariants>

const hash = () => Math.random().toString(36).substring(7)

export function generateUsers(length, startIndex = 0) {
	return Array.from({ length }).map((_, i) => ({ name: hash(), bgColor: 'transparent', description: 'heebs' }))
}

const Context = React.createContext({
	animationEnabled: true,
})

// imperative ref
// export const AccountsList = React.forwardRef<React.ElementRef<'div'>, AccountListProps>((props, forwardedRef) => {
export const AccountsList = props => {
	const { className, view, ...rest } = props

	const ref = useRef(null)
	const [listHeight, setListHeight] = useState<number>(200)
	const [listMaxHeight, setListMaxHeight] = useState<number>(300)
	const [customScrollParent, setCustomScrollParent] = useState<HTMLElement | null>(null)
	const [items, setItems] = useState(Array.from({ length: 100 }, (_, i) => hash()))
	const [isLoading, setIsLoading] = useState(true)

	const setListSize = () => {
		const listRef = ref.current
		if (listRef) {
			const simpleBarContent = listRef.getElementsByClassName('simplebar-content')[0]
			setListHeight(simpleBarContent?.offsetHeight || 100)
			const listBounding = listRef.getBoundingClientRect()

			// TODO need to listen to screen size change and also useImperativeRef to get parent ref
			const maxHeight = window.innerHeight - listBounding.top - 52
			setListMaxHeight(maxHeight)
		}
	}

	useEffect(() => {
		setListSize()
	}, [ref?.current])

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

	return (
		<>
			<div className="fixed bottom-10 right-0 border">
				<div className="flex flex-col gap-3 z-40 ">
					<button onClick={addAtStart}>Add item to start</button>
					<button onClick={addAtRandom}>Add item at random</button>
					<button onClick={removeAtStart}>Remove from start</button>
					<button onClick={removeAtRandom}>Remove random</button>
					<button onClick={reset}>Reset</button>
					<button onClick={() => setIsLoading(!isLoading)}>is loading</button>
				</div>
			</div>
			<div
				ref={ref}
				className={cvaAccountsListVariants({ view, className })}
				{...rest}
				style={{
					height: `${listHeight}px`,
					maxHeight: `${listMaxHeight}px`,
				}}
			>
				<ScrollArea scrollableNodeProps={{ ref: setCustomScrollParent }} onScrollAreaSizeChange={setListSize}>
					<VirtuosoGrid
						customScrollParent={customScrollParent}
						data={items}
						itemContent={(index, user) => (
							<ItemWrapper idx={index}>
								<h4>
									{user} -{index}
								</h4>
							</ItemWrapper>
						)}
						components={{
							List: ListContainer,
							Item: ItemContainer,
							ScrollSeekPlaceholder: ({ height, width, index }) => (
								<ItemContainer>
									<ItemWrapper>
										{'--'} - {index}
									</ItemWrapper>
								</ItemContainer>
							),
						}}
						overscan={200}
						scrollSeekConfiguration={{
							enter: velocity => Math.abs(velocity) > 200,
							exit: velocity => Math.abs(velocity) < 30,
							change: (_, range) => console.log({ range }),
						}}
					/>
				</ScrollArea>
			</div>
		</>
	)
}

AccountsList.displayName = 'AccountsList'
