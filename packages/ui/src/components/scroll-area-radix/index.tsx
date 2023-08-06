import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import clsx from 'clsx'
import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { useEventListener, useIntersectionObserver } from 'usehooks-ts'

import * as styles from './scroll-area-radix.css'

export const ScrollAreaRoot = ({ children, className, ...rest }) => (
	<ScrollAreaPrimitive.Root className={clsx(styles.scrollAreaRootWrapper, className)} {...rest}>
		{children}
	</ScrollAreaPrimitive.Root>
)

export const ScrollAreaViewport = forwardRef<HTMLDivElement, ScrollAreaPrimitive.ScrollAreaViewportProps>(
	({ children, ...props }, ref) => (
		<ScrollAreaPrimitive.Viewport ref={ref} className={clsx(styles.scrollAreaViewportWrapper)} {...props}>
			{children}
		</ScrollAreaPrimitive.Viewport>
	),
)

export const ScrollAreaScrollbar = ({ children, className, ...props }) => (
	<ScrollAreaPrimitive.Scrollbar className={clsx(styles.scrollAreaScrollbarWrapper, className)} {...props}>
		{children}
	</ScrollAreaPrimitive.Scrollbar>
)

export const ScrollAreaThumb = ({ ...props }) => (
	<ScrollAreaPrimitive.Thumb className={styles.scrollAreaThumbWrapper} {...props} />
)

export const ScrollAreaCorner = ({ ...props }) => (
	<ScrollAreaPrimitive.Corner className={styles.scrollAreaCornerWrapper} {...props} />
)

interface IScrollAreaRadix extends ScrollAreaPrimitive.ScrollAreaProps {
	disabled?: boolean
	fixHeight?: boolean
	showTopScrollShadow?: boolean
	showBottomScrollShadow?: boolean
	roundedScrollArea?: boolean
	renderScrollArea: (scrollParent: HTMLElement | null, isScrollTop: boolean) => any
}

export const ScrollAreaRadix = ({ children, ...props }: IScrollAreaRadix) => {
	const {
		className,
		fixHeight,
		renderScrollArea,
		disabled,
		showTopScrollShadow = true,
		showBottomScrollShadow = true,
		roundedScrollArea = false,
		...rest
	} = props

	const updateTimeout = useRef(null)
	const [scrollParent, setScrollParent] = useState<HTMLElement | null>(null)
	const [scrollHeight, setScrollHeight] = useState<number | undefined>(1)
	const [isScrolledBottom, setIsScrolledBottom] = useState<boolean>(true)
	const [isScrolledTop, setIsScrolledTop] = useState<boolean>(true)

	const bottomRef = useRef<HTMLDivElement | null>(null)
	const bottomRefEntry = useIntersectionObserver(bottomRef, {})
	const topRef = useRef<HTMLDivElement | null>(null)
	const topRefEntry = useIntersectionObserver(topRef, {})

	useEffect(() => {
		const resizeObserver = new ResizeObserver(entries => {
			const observedHeight = entries[0].contentRect.height
			setScrollHeight(observedHeight)
		})

		if (fixHeight && scrollParent?.firstChild instanceof HTMLElement) {
			resizeObserver.observe(scrollParent?.firstChild)
		}

		if (bottomRefEntry?.isIntersecting !== undefined && topRefEntry?.isIntersecting !== undefined) {
			// Clear the previous timeout if it exists
			if (updateTimeout.current) {
				clearTimeout(updateTimeout.current)
			}

			// Update after 20ms to avoid FOUT with the shadows
			updateTimeout.current = setTimeout(() => {
				setIsScrolledBottom(bottomRefEntry.isIntersecting)
				setIsScrolledTop(topRefEntry.isIntersecting)
			}, 20)
		}

		return () => {
			if (fixHeight && scrollParent?.firstChild) {
				resizeObserver.disconnect()
			}
			// Clear the timeout when the component unmounts
			if (updateTimeout.current) {
				clearTimeout(updateTimeout.current)
			}
		}
	}, [fixHeight, scrollParent, disabled, bottomRefEntry?.isIntersecting, topRefEntry?.isIntersecting])

	const handleDebouncedResizeHandler = useDebouncedCallback(() => {
		setIsScrolledBottom(bottomRefEntry.isIntersecting)
		setIsScrolledTop(topRefEntry.isIntersecting)
	}, 100)

	useEventListener('resize', handleDebouncedResizeHandler)

	return (
		<ScrollAreaRoot
			className={clsx(
				className,
				!disabled && styles.scrollAreaEnabledStyles,
				!disabled && showTopScrollShadow && !isScrolledTop && styles.scrollAreaShowTopShadowsWrapper,
				!disabled && showBottomScrollShadow && !isScrolledBottom && styles.scrollAreaShowBottomShadowsWrapper,
				disabled && styles.scrollAreaRootDisabledWrapper,
			)}
			style={{ ...(!disabled && fixHeight && scrollHeight ? { height: `${scrollHeight}px` } : {}) }}
			{...rest}
		>
			<ScrollAreaViewport ref={setScrollParent}>
				{!disabled && <div ref={topRef} className={styles.scrollAreaIntersectionSliceTop} />}
				{renderScrollArea(scrollParent, isScrolledTop)}
				{!disabled && <div ref={bottomRef} className={styles.scrollAreaIntersectionSliceBottom} />}
			</ScrollAreaViewport>
			<ScrollAreaScrollbar
				orientation="vertical"
				className={clsx(roundedScrollArea && styles.scrollAreaScrollbarRoundedWrapper)}
			>
				<ScrollAreaThumb />
			</ScrollAreaScrollbar>
		</ScrollAreaRoot>
	)
}
