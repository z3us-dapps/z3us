import * as PopoverPrimitive from '@radix-ui/react-popover'
import clsx from 'clsx'
import React, { forwardRef } from 'react'

import * as styles from './popover.css'

export const PopoverRoot = ({ children, ...props }) => (
	<PopoverPrimitive.Root {...props}>{children}</PopoverPrimitive.Root>
)

export const PopoverAnchor = ({ children, ...props }) => (
	<PopoverPrimitive.Anchor {...props}>{children}</PopoverPrimitive.Anchor>
)

export const PopoverTrigger = ({ children, ...props }) => (
	<PopoverPrimitive.Trigger {...props}>{children}</PopoverPrimitive.Trigger>
)

export const PopoverPortal = ({ children, ...props }) => (
	<PopoverPrimitive.Portal {...props}>{children}</PopoverPrimitive.Portal>
)

export const PopoverContent = forwardRef<HTMLDivElement, PopoverPrimitive.PopoverContentProps>(
	({ children, className, ...props }, ref) => (
		<PopoverPrimitive.Content ref={ref} className={clsx(styles.popoverContentWrapper, className)} {...props}>
			{children}
		</PopoverPrimitive.Content>
	),
)
