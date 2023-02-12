import React, { forwardRef } from 'react'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import * as SelectPrimitive from '@radix-ui/react-select'
import clsx from 'clsx'

import * as styles from './select.css'

export const Select = SelectPrimitive.Root

export const SelectTrigger = ({ children, ...props }) => (
	<SelectPrimitive.SelectTrigger className={styles.selectTrigger} {...props}>
		{children}
	</SelectPrimitive.SelectTrigger>
)

export const SelectValue = SelectPrimitive.Value
export const SelectIcon = SelectPrimitive.Icon

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

export const SelectPortal = SelectPrimitive.Portal
export const SelectViewport = SelectPrimitive.Viewport
export const SelectGroup = SelectPrimitive.Group

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
			<SelectPrimitive.Item value={value} className={clsx('SelectItem', className)} {...rest} ref={forwardedRef}>
				<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
				<SelectPrimitive.ItemIndicator className="SelectItemIndicator">
					<CheckIcon />
				</SelectPrimitive.ItemIndicator>
			</SelectPrimitive.Item>
		)
	},
)

SelectItem.defaultProps = SelectItemDefaultProps

export const SelectItemText = SelectPrimitive.ItemText
export const SelectItemIndicator = SelectPrimitive.ItemIndicator
export const SelectLabel = SelectPrimitive.Label
export const SelectSeparator = SelectPrimitive.Separator
export const SelectScrollUpButton = SelectPrimitive.ScrollUpButton
export const SelectScrollDownButton = SelectPrimitive.ScrollDownButton
