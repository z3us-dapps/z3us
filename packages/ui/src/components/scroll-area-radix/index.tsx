import type * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import clsx from 'clsx'
import React, { forwardRef } from 'react'

import * as styles from './scroll-area-radix.css'

export const ScrollAreaRoot = ({ children, ...props }) => (
	<ScrollAreaPrimitive.Root className={styles.scrollAreaRootWrapper} {...props}>
		{children}
	</ScrollAreaPrimitive.Root>
)

export const ScrollAreaViewport = forwardRef<HTMLDivElement, DropdownMenuPrimitive.DropdownMenuContentProps>(
	({ children, className, ...props }, ref) => (
		<ScrollAreaPrimitive.Viewport ref={ref} className={clsx(styles.scrollAreaRootWrapper, className)} {...props}>
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

export const ScrollAreaRadix = ({ children, ...props }) => (
	<ScrollAreaRoot>
		<ScrollAreaViewport {...props}>{children}</ScrollAreaViewport>
		<ScrollAreaScrollbar>
			<ScrollAreaThumb />
		</ScrollAreaScrollbar>
	</ScrollAreaRoot>
)
