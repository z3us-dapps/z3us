import clsx from 'clsx'
import React, { forwardRef } from 'react'

import * as PopoverPrimative from '@radix-ui/react-popover'
import * as styles from './popover.css'

export const PopoverRoot = ({ children, ...props }) => (
	<PopoverPrimative.Root {...props}>{children}</PopoverPrimative.Root>
)

export const PopoverAnchor = ({ children, ...props }) => (
	<PopoverPrimative.Anchor {...props}>{children}</PopoverPrimative.Anchor>
)

export const PopoverPortal = ({ children, ...props }) => (
	<PopoverPrimative.Portal {...props}>{children}</PopoverPrimative.Portal>
)

export const PopoverContent = forwardRef<HTMLDivElement, PopoverPrimative.PopoverContentProps>(
	({ children, className, ...props }, ref) => (
		<PopoverPrimative.Content ref={ref} className={clsx(styles.popoverContentWrapper, className)} {...props}>
			{children}
		</PopoverPrimative.Content>
	),
)
