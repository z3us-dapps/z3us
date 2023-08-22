import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import clsx from 'clsx'
import type { PropsWithChildren } from 'react'
import React, { forwardRef, useCallback, useEffect, useMemo, useState } from 'react'
import { throttle } from 'throttle-debounce'
import { useDebouncedCallback } from 'use-debounce'
import { useEventListener } from 'usehooks-ts'

import { Box } from '../box'
import { Button } from '../button'
import { ArrowUpIcon } from '../icons'
import { ToolTip } from '../tool-tip'
import { ScrollContext } from './context'
import * as styles from './scroll-area-radix.css'

const SCROLL_TOP_BUTTON_VISIBLE_PX = 100
const THROTTLE_MS = 300

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
	showScrollUpButton?: boolean
	roundedScrollArea?: boolean
	overrideScrollParent?: HTMLElement | null
}

export const ScrollAreaRadix: React.FC<PropsWithChildren<IScrollAreaRadix>> = ({
	children,
	overrideScrollParent,
	...props
}) => {
	const {
		className,
		fixHeight,
		disabled,
		showTopScrollShadow = true,
		showBottomScrollShadow = true,
		showScrollUpButton = true,
		roundedScrollArea = false,
		...rest
	} = props

	const [scrollParent, setScrollParent] = useState<HTMLElement | null>(null)
	const [scrollHeight, setScrollHeight] = useState<number | undefined>(1)
	const [isScrolledBottom, setIsScrolledBottom] = useState<boolean>(true)
	const [isScrolledTop, setIsScrolledTop] = useState<boolean>(true)
	const [isScrollUpButtonVisible, setIsScrollUpButtonVisible] = useState<boolean>(false)

	const scrollCtx = useMemo(
		() => ({
			scrollableNode: overrideScrollParent || scrollParent,
			isScrolledTop,
		}),
		[overrideScrollParent, scrollParent, isScrolledTop],
	)

	const handleDetermineScrollPosition = () => {
		if (scrollParent) {
			setIsScrolledBottom(scrollParent.scrollTop + scrollParent.clientHeight >= scrollParent.scrollHeight)
			setIsScrolledTop(scrollParent.scrollTop === 0)
			setIsScrollUpButtonVisible(scrollParent.scrollTop > SCROLL_TOP_BUTTON_VISIBLE_PX)
		}
	}

	useEffect(() => {
		const resizeObserver = new ResizeObserver(entries => {
			const observedHeight = entries[0].contentRect.height
			setScrollHeight(observedHeight)
		})

		if (fixHeight && scrollParent?.firstChild instanceof HTMLElement) {
			resizeObserver.observe(scrollParent?.firstChild)
		}

		return () => {
			if (fixHeight && scrollParent?.firstChild) {
				resizeObserver.disconnect()
			}
		}
	}, [fixHeight, scrollParent, disabled])

	const handleDebouncedResizeHandler = useDebouncedCallback(() => {
		handleDetermineScrollPosition()
	}, THROTTLE_MS)

	const handleUpButtonClick = useCallback(() => {
		scrollParent.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}, [scrollParent])

	useEventListener('resize', handleDebouncedResizeHandler)

	const handleThrottleScrollHandler = throttle(THROTTLE_MS, () => {
		handleDetermineScrollPosition()
	})

	useEffect(() => {
		if (scrollParent) {
			scrollParent.addEventListener('scroll', handleThrottleScrollHandler)
		}

		return () => {
			if (scrollParent) {
				scrollParent.removeEventListener('scroll', handleThrottleScrollHandler)
			}
		}
	}, [scrollParent])

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
				<ScrollContext.Provider value={scrollCtx}>{children}</ScrollContext.Provider>
			</ScrollAreaViewport>
			<ScrollAreaScrollbar
				orientation="vertical"
				className={clsx(roundedScrollArea && styles.scrollAreaScrollbarRoundedWrapper)}
			>
				<ScrollAreaThumb />
			</ScrollAreaScrollbar>
			{!disabled && showScrollUpButton ? (
				<Box
					className={clsx(styles.scrolledButtonWrapper, isScrollUpButtonVisible && styles.scrolledButtonWrapperVisible)}
				>
					<ToolTip message="global.up" side="top">
						<Button styleVariant="ghost" sizeVariant="small" iconOnly onClick={handleUpButtonClick}>
							<ArrowUpIcon />
						</Button>
					</ToolTip>
				</Box>
			) : null}
		</ScrollAreaRoot>
	)
}
