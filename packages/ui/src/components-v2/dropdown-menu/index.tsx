import React from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'

import './dropdown-menu.css'

export const DropdownMenu = DropdownMenuPrimitive.Root
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

export const DropdownMenuContent = ({ children, ...props }) => (
	<DropdownMenuPrimitive.Content className="z3-c-dropdown-menu__content" {...props}>
		{children}
	</DropdownMenuPrimitive.Content>
)

export const DropdownMenuItem = ({ children, ...props }) => (
	<DropdownMenuPrimitive.Item className="z3-c-dropdown-menu__item" {...props}>
		{children}
	</DropdownMenuPrimitive.Item>
)

export const DropdownMenuSeparator = () => <DropdownMenuPrimitive.Separator className="z3-c-dropdown-menu__seperator" />

export const DropdownMenuArrow = () => <DropdownMenuPrimitive.Arrow className="z3-c-dropdown-menu__arrow" />

export const DropdownMenuLabel = ({ children, ...props }) => (
	<DropdownMenuPrimitive.Label className="z3-c-dropdown-menu__label" {...props}>
		{children}
	</DropdownMenuPrimitive.Label>
)

export const DropdownMenuRadioGroup = ({ children, ...props }) => (
	<DropdownMenuPrimitive.RadioGroup className="z3-c-dropdown-menu__radio-group" {...props}>
		{children}
	</DropdownMenuPrimitive.RadioGroup>
)

export const DropdownMenuRadioItem = ({ children, value, ...props }) => (
	<DropdownMenuPrimitive.RadioItem className="z3-c-dropdown-menu__radio-item" value={value} {...props}>
		{children}
	</DropdownMenuPrimitive.RadioItem>
)

export const DropdownMenuItemIndicator = ({ children, ...props }) => (
	<DropdownMenuPrimitive.ItemIndicator className="z3-c-dropdown-menu__item-indicator" {...props}>
		{children}
	</DropdownMenuPrimitive.ItemIndicator>
)

export const DropdownMenuRightSlot = ({ children, ...props }) => (
	<DropdownMenuPrimitive.Label className="z3-c-dropdown-menu__right-slot" {...props}>
		{children}
	</DropdownMenuPrimitive.Label>
)
