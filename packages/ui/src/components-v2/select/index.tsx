import * as SelectPrimitive from '@radix-ui/react-select'
import clsx, { type ClassValue } from 'clsx'
import React, { forwardRef } from 'react'

import { ArrowDownIcon, ArrowUpIcon, Check2Icon } from '../../components/icons'
import * as styles from './select.css'

export const SelectRoot = SelectPrimitive.Root
export const SelectTrigger = SelectPrimitive.Trigger
export const SelectValue = SelectPrimitive.Value
export const SelectPortal = SelectPrimitive.Portal
export const SelectViewport = SelectPrimitive.Viewport
export const SelectGroup = SelectPrimitive.Group
export const SelectItemText = SelectPrimitive.ItemText
export const SelectItemIndicator = SelectPrimitive.ItemIndicator

export const SelectScrollDownButton = ({ children, ...props }) => (
	<SelectPrimitive.ScrollDownButton className={styles.selectMenuScrollButton} {...props}>
		{children}
	</SelectPrimitive.ScrollDownButton>
)

export const SelectScrollUpButton = ({ children, ...props }) => (
	<SelectPrimitive.ScrollUpButton className={styles.selectMenuScrollButton} {...props}>
		{children}
	</SelectPrimitive.ScrollUpButton>
)

interface ISelectContentProps {
	children: React.ReactNode
	className?: string
}

const SelectContentDefaultProps = {
	className: undefined,
}

export const SelectContent = forwardRef<HTMLDivElement, ISelectContentProps>(
	(props, forwardedRef: React.Ref<HTMLDivElement | null>) => {
		const { children, className, ...rest } = props

		return (
			<SelectPortal>
				<SelectPrimitive.Content className={clsx(styles.selectContent, className)} {...rest} ref={forwardedRef}>
					<SelectScrollUpButton>
						<ArrowUpIcon />
					</SelectScrollUpButton>
					<SelectViewport>{children}</SelectViewport>
					<SelectScrollDownButton>
						<ArrowDownIcon />
					</SelectScrollDownButton>
				</SelectPrimitive.Content>
			</SelectPortal>
		)
	},
)

SelectContent.defaultProps = SelectContentDefaultProps

interface ISelectItemProps {
	children: React.ReactNode
	className?: ClassValue
	value: string
}

const SelectItemDefaultProps = {
	className: undefined,
}

export const SelectItem = forwardRef<HTMLDivElement, ISelectItemProps>(
	(props, forwardedRef: React.Ref<HTMLDivElement | null>) => {
		const { children, className, ...rest } = props

		return (
			<SelectPrimitive.Item className={clsx(styles.selectMenuItem, className)} {...rest} ref={forwardedRef}>
				<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
				<SelectPrimitive.ItemIndicator>
					<Check2Icon className={styles.selectMenuItemCheckIcon} />
				</SelectPrimitive.ItemIndicator>
			</SelectPrimitive.Item>
		)
	},
)

SelectItem.defaultProps = SelectItemDefaultProps

export const SelectLabel = ({ children, ...props }) => (
	<SelectPrimitive.Label className={styles.selectLabelWrapper} {...props}>
		{children}
	</SelectPrimitive.Label>
)

export const SelectSeparator = () => <SelectPrimitive.Separator className={styles.selectMenuSeparator} />

export const SelectIcon = ({ children, ...props }) => (
	<SelectPrimitive.Icon className={styles.selectIconWrapper} {...props}>
		{children}
	</SelectPrimitive.Icon>
)
