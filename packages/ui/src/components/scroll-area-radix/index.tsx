import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import clsx from 'clsx'
import React, { forwardRef, useState } from 'react'

import * as styles from './scroll-area-radix.css'

export const ScrollAreaRoot = ({ children, className }) => (
	<ScrollAreaPrimitive.Root className={clsx(styles.scrollAreaRootWrapper, className)}>
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
	renderScrollArea: (scrollParent: HTMLElement | null) => any
}

export const ScrollAreaRadix = ({ children, ...props }: IScrollAreaRadix) => {
	const { className, renderScrollArea } = props

	const [scrollParent, setScrollParent] = useState<HTMLElement | null>(null)

	return (
		<ScrollAreaRoot className={clsx(className)}>
			<ScrollAreaViewport ref={setScrollParent}>{renderScrollArea(scrollParent)}</ScrollAreaViewport>
			<ScrollAreaScrollbar orientation="vertical">
				<ScrollAreaThumb />
			</ScrollAreaScrollbar>
			<ScrollAreaCorner />
		</ScrollAreaRoot>
	)
}
