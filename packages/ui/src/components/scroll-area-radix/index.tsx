import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import clsx from 'clsx'
import type { PropsWithChildren } from 'react'
import React, { forwardRef, useCallback, useEffect, useMemo, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useDebouncedCallback, useThrottledCallback } from 'use-debounce'
import { useEventListener, useTimeout } from 'usehooks-ts'

import { ScrollContext } from 'ui/src/context/scroll'

import { Box } from '../box'
import { Button } from '../button'
import { ArrowUpIcon } from '../icons'
import { ToolTip } from '../tool-tip'
import * as styles from './styles.css'

const messages = defineMessages({
	up: {
		id: 'hJKc5x',
		defaultMessage: 'Go to top',
	},
})

const SCROLL_TOP_BUTTON_VISIBLE_PX = 100
const THROTTLE_MS = 50

interface IScrollAreaRootProps extends ScrollAreaPrimitive.ScrollAreaProps {
	className?: string
}

export const ScrollAreaRoot = ({ children, className, ...rest }: IScrollAreaRootProps) => (
	<ScrollAreaPrimitive.Root className={clsx(styles.scrollAreaRootWrapper, className)} {...rest}>
		{children}
	</ScrollAreaPrimitive.Root>
)

export const ScrollAreaViewport = forwardRef<HTMLDivElement, ScrollAreaPrimitive.ScrollAreaViewportProps>(
	({ children, className, ...props }, ref) => (
		<ScrollAreaPrimitive.Viewport ref={ref} className={clsx(styles.scrollAreaViewportWrapper, className)} {...props}>
			{children}
		</ScrollAreaPrimitive.Viewport>
	),
)

interface IScrollAreaScrollbarProps extends ScrollAreaPrimitive.ScrollAreaScrollbarProps {
	className?: string
}

export const ScrollAreaScrollbar = ({ children, className, ...props }: IScrollAreaScrollbarProps) => (
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

export interface IScrollAreaRadix extends ScrollAreaPrimitive.ScrollAreaProps {
	viewPortClassName?: string
	disabled?: boolean
	fixHeight?: boolean
	showTopScrollShadow?: boolean
	showBottomScrollShadow?: boolean
	showScrollUpButton?: boolean
	roundedScrollArea?: boolean
	overrideScrollParent?: HTMLElement | null
	scrollTopBehavior?: 'smooth' | 'auto' | 'instant'
}

export const ScrollAreaRadix: React.FC<PropsWithChildren<IScrollAreaRadix>> = props => {
	const {
		children,
		overrideScrollParent,
		className,
		viewPortClassName,
		fixHeight,
		disabled,
		showTopScrollShadow = true,
		showBottomScrollShadow = true,
		showScrollUpButton = true,
		roundedScrollArea = false,
		scrollTopBehavior = 'instant',
		...rest
	} = props

	const intl = useIntl()
	const [scrollParent, setScrollParent] = useState<HTMLElement | null>(null)
	const [scrollHeight, setScrollHeight] = useState<number | undefined>(0)
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
			setScrollHeight(entries[0].contentRect.height)
			handleDetermineScrollPosition()
		})

		if (scrollParent?.firstChild instanceof HTMLElement) {
			resizeObserver.observe(scrollParent?.firstChild)
		}

		return () => {
			if (scrollParent?.firstChild instanceof HTMLElement) {
				resizeObserver.disconnect()
			}
		}
	}, [fixHeight, scrollParent, disabled, scrollHeight])

	const handleDebouncedResizeHandler = useDebouncedCallback(() => {
		handleDetermineScrollPosition()
	}, THROTTLE_MS)

	const handleUpButtonClick = useCallback(() => {
		scrollParent.scrollTo({
			top: 0,
			behavior: scrollTopBehavior as any,
		})
	}, [scrollParent])

	useEventListener('resize', handleDebouncedResizeHandler)

	const handleThrottleScrollHandler = useThrottledCallback(() => {
		handleDetermineScrollPosition()
	}, THROTTLE_MS)

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

	useTimeout(handleDetermineScrollPosition, 200)

	return (
		<ScrollAreaRoot
			className={clsx(
				!disabled && styles.scrollAreaEnabledStyles,
				!disabled && showTopScrollShadow && !isScrolledTop && styles.scrollAreaShowTopShadowsWrapper,
				!disabled && showBottomScrollShadow && !isScrolledBottom && styles.scrollAreaShowBottomShadowsWrapper,
				disabled && styles.scrollAreaRootDisabledWrapper,
				className,
			)}
			style={{ ...(!disabled && fixHeight && scrollHeight ? { height: `${scrollHeight}px` } : {}) }}
			{...rest}
		>
			<ScrollAreaViewport ref={setScrollParent} className={viewPortClassName}>
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
					<ToolTip message={intl.formatMessage(messages.up)} side="top">
						<Button styleVariant="ghost" sizeVariant="small" iconOnly onClick={handleUpButtonClick}>
							<ArrowUpIcon />
						</Button>
					</ToolTip>
				</Box>
			) : null}
		</ScrollAreaRoot>
	)
}
