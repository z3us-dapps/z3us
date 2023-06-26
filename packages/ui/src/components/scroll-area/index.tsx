import clsx from 'clsx'
import React, { useCallback, useEffect, useRef } from 'react'
import { useImmer } from 'use-immer'
import { useEventListener, useIsomorphicLayoutEffect } from 'usehooks-ts'

import { Box } from '../box'
import SimpleBar from '../simple-bar'
import * as styles from './scroll-area.css'

interface ImmerT {
	isTopShadowVisible: boolean
	isBottmShadowVisible: boolean
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

const defaultProps = {
	scrollDisabled: false,
	scrollableNodeProps: undefined,
	onScrollAreaSizeChange: undefined,
	onScroll: undefined,
	isTopShadowVisible: true,
	isBottomShadowVisible: true,
}

export const ScrollArea: React.FC<IProps> = ({
	children,
	scrollDisabled,
	scrollableNodeProps,
	onScrollAreaSizeChange,
	onScroll,
	isTopShadowVisible,
	isBottomShadowVisible,
}) => {
	const sRef: any = useRef()
	const observer = useRef<ResizeObserver | null>(null)
	const scrollObserver = useRef<ResizeObserver | null>(null)
	const scrollElemement = sRef?.current?.getScrollElement()

	const [state, setState] = useImmer<ImmerT>({
		isTopShadowVisible: false,
		isBottmShadowVisible: false,
	})

	const handleScrollAreaSizeChange = useCallback(() => {
		if (onScrollAreaSizeChange) {
			onScrollAreaSizeChange()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [scrollElemement?.offsetHeight, scrollElemement?.offsetWidth, scrollElemement])

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
				draft.isBottmShadowVisible = showBottomShadow
			})

			if (onScroll) {
				onScroll(event)
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		},
		[scrollElemement?.offsetHeight, scrollElemement?.offsetWidth, scrollElemement],
	)

	useEffect(() => {
		const scrollRef = sRef?.current?.getScrollElement()
		const simpleBarContent = scrollRef.getElementsByClassName('simplebar-content')[0]
		scrollRef.addEventListener('scroll', handleScroll, { passive: true })

		observer.current = new ResizeObserver(entries => {
			entries.forEach(entry => {
				if (onScrollAreaSizeChange) {
					onScrollAreaSizeChange()
				}
				const contentBoxSize = Array.isArray(entry.contentBoxSize) ? entry.contentBoxSize[0] : entry.contentBoxSize
				setState(draft => {
					draft.isBottmShadowVisible = contentBoxSize.blockSize > scrollRef.clientHeight
				})
			})
		})
		scrollObserver.current = new ResizeObserver(entries => {
			entries.forEach(entry => {
				const contentBoxSize = Array.isArray(entry.contentBoxSize) ? entry.contentBoxSize[0] : entry.contentBoxSize
				setState(draft => {
					draft.isBottmShadowVisible = simpleBarContent.clientHeight > contentBoxSize.blockSize
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
	}, [scrollElemement])

	useEventListener('resize', handleScrollAreaSizeChange)

	useIsomorphicLayoutEffect(() => {
		handleScrollAreaSizeChange()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [scrollElemement?.offsetHeight, scrollElemement?.offsetWidth])

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
					isBottomShadowVisible && state.isBottmShadowVisible && styles.scrollAreaBottomShadowVisible,
				)}
			/>
		</Box>
	)
}

ScrollArea.defaultProps = defaultProps
