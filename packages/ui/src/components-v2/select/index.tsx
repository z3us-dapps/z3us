import * as SelectPrimitive from '@radix-ui/react-select'
import clsx from 'clsx'
import React, { forwardRef } from 'react'

import { Check2Icon } from '../../components/icons'
import { radixWithClassName } from '../system/radix-with-class-name'
import { Text } from '../typography'
import * as styles from './select.css'

export const Select = SelectPrimitive.Root
export const SelectValue = SelectPrimitive.Value
export const SelectIcon = SelectPrimitive.Icon
export const SelectPortal = SelectPrimitive.Portal
export const SelectViewport = SelectPrimitive.Viewport
export const SelectGroup = SelectPrimitive.Group
export const SelectItemText = SelectPrimitive.ItemText
export const SelectItemIndicator = radixWithClassName(SelectPrimitive.ItemIndicator, styles.selectItemIndicator)
export const SelectLabel = SelectPrimitive.Label
export const SelectSeparator = SelectPrimitive.Separator
export const SelectScrollUpButton = SelectPrimitive.ScrollUpButton
export const SelectScrollDownButton = SelectPrimitive.ScrollDownButton

// Trigger
interface ISelectTriggerProps {
	children: React.ReactNode
	className?: string
	asChild?: boolean
	iconOnly?: boolean
}

const SelectTriggerDefaultProps = {
	className: undefined,
	asChild: false,
	iconOnly: false,
}

export const SelectTrigger = ({ children, className, asChild, iconOnly, ...props }: ISelectTriggerProps) => (
	<SelectPrimitive.SelectTrigger
		asChild={asChild}
		className={clsx(styles.selectTrigger, iconOnly && styles.selectTriggerIconOnly, className)}
		{...props}
	>
		{children}
	</SelectPrimitive.SelectTrigger>
)

SelectTrigger.defaultProps = SelectTriggerDefaultProps

// Content
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
			<SelectPrimitive.Content className={clsx(styles.selectContent, className)} {...rest} ref={forwardedRef}>
				{children}
			</SelectPrimitive.Content>
		)
	},
)

SelectContent.defaultProps = SelectContentDefaultProps

// Item
interface ISelectItemProps {
	children: React.ReactNode
	className?: string
	value: string
}

const SelectItemDefaultProps = {
	className: undefined,
}

export const SelectItem = forwardRef<HTMLDivElement, ISelectItemProps>(
	(props, forwardedRef: React.Ref<HTMLDivElement | null>) => {
		const { children, className, value, ...rest } = props

		return (
			<SelectPrimitive.Item
				value={value}
				className={clsx(styles.selectMenuItem, className)}
				{...rest}
				ref={forwardedRef}
			>
				<SelectPrimitive.ItemText>
					<Text size="small" color="strong">
						{children}
					</Text>
				</SelectPrimitive.ItemText>
				<SelectItemIndicator>
					<Check2Icon />
				</SelectItemIndicator>
			</SelectPrimitive.Item>
		)
	},
)

SelectItem.defaultProps = SelectItemDefaultProps
