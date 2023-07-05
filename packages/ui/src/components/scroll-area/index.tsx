import clsx from 'clsx'
import React, { useCallback, useEffect, useRef } from 'react'
import { useImmer } from 'use-immer'
import { useEventListener, useIsomorphicLayoutEffect } from 'usehooks-ts'

import { Box } from '../box'
import SimpleBar from '../simple-bar'
import * as styles from './scroll-area.css'

interface ImmerT {
	isTopShadowVisible: boolean
	isBottomShadowVisible: boolean
}

interface IProps {
	children: React.ReactNode
	scrollDisabled?: boolean
	scrollableNodeProps?: any
	onScrollAreaSizeChange?: () => void
	onScroll?: (e: Event) => void
	isTopShadowVisible?: boolean
	isBottomShadowVisible?: boolean
}

export const ScrollArea: React.FC<IProps> = ({
	children,
	scrollDisabled,
	scrollableNodeProps,
	onScrollAreaSizeChange,
	onScroll,
	isTopShadowVisible = true,
	isBottomShadowVisible = true,
}) => {
	const sRef: any = useRef()
	const observer = useRef<ResizeObserver | null>(null)
	const scrollObserver = useRef<ResizeObserver | null>(null)
	const scrollElement = sRef?.current?.getScrollElement()

	const [state, setState] = useImmer<ImmerT>({
		isTopShadowVisible: false,
		isBottomShadowVisible: false,
	})

	const handleScrollAreaSizeChange = useCallback(() => {
		if (onScrollAreaSizeChange) {
			onScrollAreaSizeChange()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [scrollElement?.offsetHeight, scrollElement?.offsetWidth, scrollElement])

	const handleScroll = useCallback(
		(event: Event) => {
			const target = event.target as Element
			const { scrollHeight, scrollTop, clientHeight } = target
			const isScrollable = scrollHeight > clientHeight
			const isBottomReached = scrollHeight - Math.round(scrollTop) === clientHeight
			const showBottomShadow = isScrollable && !isBottomReached
			const showTopShadow = isScrollable && scrollTop > 0

			setState(draft => {
				draft.isTopShadowVisible = showTopShadow
				draft.isBottomShadowVisible = showBottomShadow
			})

			if (onScroll) {
				onScroll(event)
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		},
		[scrollElement?.offsetHeight, scrollElement?.offsetWidth, scrollElement],
	)

	useEffect(() => {
		const scrollRef = sRef?.current?.getScrollElement()

		// console.log('🚀 ~ file: index.tsx:84 ~ useEffect ~ scrollRef:', sRef?.current)
		// console.log('sRef?.current ', sRef?.current.unMount)
		// console.log('sRef?.current ', sRef?.current.removeObserver)
		// sRef?.current.unMount()

		const simpleBarContent = scrollRef.getElementsByClassName('simplebar-content')[0]
		scrollRef.addEventListener('scroll', handleScroll, { passive: true })

		observer.current = new ResizeObserver(entries => {
			entries.forEach(entry => {
				if (onScrollAreaSizeChange) {
					onScrollAreaSizeChange()
				}
				const contentBoxSize = Array.isArray(entry.contentBoxSize) ? entry.contentBoxSize[0] : entry.contentBoxSize
				setState(draft => {
					draft.isBottomShadowVisible = contentBoxSize.blockSize > scrollRef.clientHeight
				})
			})
		})
		scrollObserver.current = new ResizeObserver(entries => {
			entries.forEach(entry => {
				const contentBoxSize = Array.isArray(entry.contentBoxSize) ? entry.contentBoxSize[0] : entry.contentBoxSize
				setState(draft => {
					draft.isBottomShadowVisible = simpleBarContent.clientHeight > contentBoxSize.blockSize
				})
			})
		})
		if (simpleBarContent) {
			observer.current.observe(simpleBarContent)
		}
		if (scrollRef) {
			scrollObserver.current.observe(scrollRef)
		}
		return () => {
			scrollRef.removeEventListener('scroll', handleScroll)
			if (observer.current) {
				observer.current.disconnect()
			}
			if (scrollObserver.current) {
				scrollObserver.current.disconnect()
			}
		}
	}, [scrollElement])

	useEventListener('resize', handleScrollAreaSizeChange)

	useIsomorphicLayoutEffect(() => {
		handleScrollAreaSizeChange()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [scrollElement?.offsetHeight, scrollElement?.offsetWidth])

	return (
		<Box className={clsx(styles.scrollAreaWrapper, scrollDisabled && styles.scrollAreaWrapperDisabled)}>
			<SimpleBar
				ref={sRef}
				scrollableNodeProps={scrollableNodeProps}
				style={{
					height: '100%',
					position: 'relative',
				}}
			>
				{children}
			</SimpleBar>
			<Box
				className={clsx(
					styles.scrollAreaTopShadow,
					isTopShadowVisible && state.isTopShadowVisible && styles.scrollAreaTopShadowVisible,
				)}
			/>
			<Box
				className={clsx(
					styles.scrollAreaBottomShadow,
					isBottomShadowVisible && state.isBottomShadowVisible && styles.scrollAreaBottomShadowVisible,
				)}
			/>
		</Box>
	)
}
