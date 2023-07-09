import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import clsx from 'clsx'
import React, { forwardRef, useEffect, useState } from 'react'

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
	renderScrollArea: (scrollParent: HTMLElement | null) => any
}

export const ScrollAreaRadix = ({ children, ...props }: IScrollAreaRadix) => {
	const { className, fixHeight, renderScrollArea, disabled, ...rest } = props

	const [scrollParent, setScrollParent] = useState<HTMLElement | null>(null)
	const [scrollHeight, setScrollHeight] = useState<number | undefined>(1)

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
	}, [fixHeight, scrollParent])

	return (
		<ScrollAreaRoot
			className={clsx(className, disabled && styles.scrollAreaRootDisabledWrapper)}
			style={{ ...(fixHeight && scrollHeight ? { height: `${scrollHeight}px` } : {}) }}
			{...rest}
		>
			<ScrollAreaViewport ref={setScrollParent}>{renderScrollArea(scrollParent)}</ScrollAreaViewport>
			<ScrollAreaScrollbar orientation="vertical">
				<ScrollAreaThumb />
			</ScrollAreaScrollbar>
		</ScrollAreaRoot>
	)
}
