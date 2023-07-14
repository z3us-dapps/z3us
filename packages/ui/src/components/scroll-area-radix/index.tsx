import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import clsx from 'clsx'
import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { useIntersectionObserver } from 'usehooks-ts'

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

export const ScrollAreaScrollbar = ({ children, ...props }) => (
	<ScrollAreaPrimitive.Scrollbar className={styles.scrollAreaScrollbarWrapper} {...props}>
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
		...rest
	} = props

	const [scrollParent, setScrollParent] = useState<HTMLElement | null>(null)
	const [scrollHeight, setScrollHeight] = useState<number | undefined>(1)
	const [isScrolledBottom, setIsScrolledBottom] = useState<boolean>(false)

	const bottomRef = useRef<HTMLDivElement | null>(null)
	const bottomRefEntry = useIntersectionObserver(bottomRef, {})
	const topRef = useRef<HTMLDivElement | null>(null)
	const topRefEntry = useIntersectionObserver(topRef, {})
	const isScrolledTop = !!topRefEntry?.isIntersecting

	useEffect(() => {
		const resizeObserver = new ResizeObserver(entries => {
			const observedHeight = entries[0].contentRect.height
			setScrollHeight(observedHeight)
		})

		if (fixHeight && scrollParent?.firstChild instanceof HTMLElement) {
			resizeObserver.observe(scrollParent?.firstChild)
		}

		setIsScrolledBottom(bottomRefEntry?.isIntersecting)

		return () => {
			if (fixHeight && scrollParent?.firstChild) {
				resizeObserver.disconnect()
			}
		}
	}, [fixHeight, scrollParent, disabled, bottomRefEntry?.isIntersecting])

	return (
		<ScrollAreaRoot
			className={clsx(
				className,
				!disabled && showTopScrollShadow && !isScrolledTop && styles.scrollAreaShowTopShadowsWrapper,
				!disabled && showBottomScrollShadow && !isScrolledBottom && styles.scrollAreaShowBottomShadowsWrapper,
				disabled && styles.scrollAreaRootDisabledWrapper,
			)}
			style={{ ...(!disabled && fixHeight && scrollHeight ? { height: `${scrollHeight}px` } : {}) }}
			{...rest}
		>
			<ScrollAreaViewport ref={setScrollParent}>
				{!disabled && <div ref={topRef} className={styles.scrollAreaIntersectionSlice} />}
				{renderScrollArea(scrollParent, isScrolledTop)}
				{!disabled && <div ref={bottomRef} className={styles.scrollAreaIntersectionSlice} />}
			</ScrollAreaViewport>
			<ScrollAreaScrollbar orientation="vertical">
				<ScrollAreaThumb />
			</ScrollAreaScrollbar>
		</ScrollAreaRoot>
	)
}
