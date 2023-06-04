import type * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'
import React, { forwardRef } from 'react'
import * as ScrollAreaPrimative from '@radix-ui/react-scroll-area'
import * as styles from './scroll-area-radix.css'

export const ScrollAreaRoot = ({ children, ...props }) => (
	<ScrollAreaPrimative.Root className={styles.scrollAreaRootWrapper} {...props}>
		{children}
	</ScrollAreaPrimative.Root>
)

export const ScrollAreaViewport = forwardRef<HTMLDivElement, DropdownMenuPrimitive.DropdownMenuContentProps>(
	({ children, className, ...props }, ref) => (
		<ScrollAreaPrimative.Viewport ref={ref} className={clsx(styles.scrollAreaRootWrapper, className)} {...props}>
			{children}
		</ScrollAreaPrimative.Viewport>
	),
)

export const ScrollAreaScrollbar = ({ children, ...props }) => (
	<ScrollAreaPrimative.Scrollbar className={styles.scrollAreaScrollbarWrapper} {...props}>
		{children}
	</ScrollAreaPrimative.Scrollbar>
)

export const ScrollAreaThumb = ({ ...props }) => (
	<ScrollAreaPrimative.Thumb className={styles.scrollAreaThumbWrapper} {...props} />
)

export const ScrollAreaRadix = ({ children, ...props }) => (
	<ScrollAreaRoot>
		<ScrollAreaViewport {...props}>{children}</ScrollAreaViewport>
		<ScrollAreaScrollbar>
			<ScrollAreaThumb />
		</ScrollAreaScrollbar>
	</ScrollAreaRoot>
)
