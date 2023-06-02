import * as SelectPrimitive from '@radix-ui/react-select'
import clsx, { type ClassValue } from 'clsx'
import React, { forwardRef } from 'react'

import { ArrowDownIcon, ArrowUpIcon, Check2Icon, ChevronDown2Icon } from '../../components/icons'
import { Box } from '../box'
import { Button } from '../button'
import { Text } from '../typography'
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
	style?: React.CSSProperties
}

export const SelectContent: React.FC<ISelectContentProps> = forwardRef<HTMLElement, ISelectContentProps>(
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

interface ISelectSimpleProps {
	value?: string
	placeholder?: string
	onValueChange?: (value: string) => void
	data: { id: string; title: string }[]
	trigger?: React.ReactNode
	selectAriaLabel?: string
	width?: number
}

export const SelectSimple: React.FC<ISelectSimpleProps> = props => {
	const { value, onValueChange, trigger, data = [], placeholder, selectAriaLabel, width = 300 } = props

	return (
		<SelectRoot value={value} onValueChange={onValueChange}>
			{trigger || (
				<SelectTrigger asChild aria-label={selectAriaLabel}>
					<Box style={{maxWidth: `${width}px`}}>
						<Button styleVariant="secondary" rightIcon={<ChevronDown2Icon />}>
							<span style={{overflow: 'hidden'}}>
								<SelectValue aria-label={value} placeholder={placeholder} />
							</span>
						</Button>
					</Box>
				</SelectTrigger>
			)}
			<SelectContent style={{maxWidth: `${width}px`}}>
				<SelectGroup>
					{data.map(({ id, title }) => (
						<SelectItem key={id} value={id}>
							<Text truncate size="small" color="strong">
								{title}
							</Text>
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</SelectRoot>
	)
}
