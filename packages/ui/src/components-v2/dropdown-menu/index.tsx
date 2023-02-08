import React from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
// import clsx from 'clsx'

import * as styles from './dropdown-menu.css'

export const DropdownMenu = DropdownMenuPrimitive.Root
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

export const DropdownMenuContent = ({ children, ...props }) => (
	<DropdownMenuPrimitive.Content className={styles.dropdownMenuContent} {...props}>
		{children}
	</DropdownMenuPrimitive.Content>
)

export const DropdownMenuItem = ({ children, ...props }) => (
	<DropdownMenuPrimitive.Item className={styles.dropdownMenuItem} {...props}>
		{children}
	</DropdownMenuPrimitive.Item>
)

export const DropdownMenuSeparator = () => <DropdownMenuPrimitive.Separator className={styles.dropdownMenuSeperator} />

export const DropdownMenuArrow = () => <DropdownMenuPrimitive.Arrow className={styles.dropdownMenuArrow} />

export const DropdownMenuLabel = ({ children, ...props }) => (
	<DropdownMenuPrimitive.Label className={styles.dropdownMenuLabel} {...props}>
		{children}
	</DropdownMenuPrimitive.Label>
)

export const DropdownMenuRadioGroup = ({ children, ...props }) => (
	<DropdownMenuPrimitive.RadioGroup className={styles.dropdownMenuRadioGroup} {...props}>
		{children}
	</DropdownMenuPrimitive.RadioGroup>
)

export const DropdownMenuRadioItem = ({ children, value, ...props }) => (
	<DropdownMenuPrimitive.RadioItem className={styles.dropdownMenuRadioItem} value={value} {...props}>
		{children}
	</DropdownMenuPrimitive.RadioItem>
)

export const DropdownMenuItemIndicator = ({ children, ...props }) => (
	<DropdownMenuPrimitive.ItemIndicator className={styles.dropdownMenuItemIndicator} {...props}>
		{children}
	</DropdownMenuPrimitive.ItemIndicator>
)

export const DropdownMenuRightSlot = ({ children, ...props }) => (
	<DropdownMenuPrimitive.Label className={styles.dropdownMenuItemRightSlot} {...props}>
		{children}
	</DropdownMenuPrimitive.Label>
)
