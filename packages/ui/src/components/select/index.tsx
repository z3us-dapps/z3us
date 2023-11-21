import * as SelectPrimitive from '@radix-ui/react-select'
import clsx, { type ClassValue } from 'clsx'
import React, { forwardRef } from 'react'
import useMeasure from 'react-use-measure'
import { undefined } from 'zod'

import { type TSizeVariant, type TStyleVariant } from 'ui/src/components/button'

import { Box } from '../box'
import { Button } from '../button'
import { ArrowDownIcon, ArrowUpIcon, Check2Icon, ChevronDown2Icon } from '../icons'
import { Text } from '../typography'
import * as styles from './styles.css'

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

export interface ISelectSimpleProps {
	value?: string
	placeholder?: string
	onValueChange?: (value: string) => void
	data: { id: string; title: string }[]
	trigger?: React.ReactNode
	selectAriaLabel?: string
	width?: number | undefined
	sizeVariant?: TSizeVariant
	styleVariant?: TStyleVariant
	capitalizeFirstLetter?: boolean
	rounded?: boolean
	fullWidth?: boolean
	disabled?: boolean
}

export const SelectSimple = forwardRef<HTMLButtonElement, ISelectSimpleProps>(
	(
		{
			value,
			onValueChange,
			trigger,
			data = [],
			placeholder,
			selectAriaLabel,
			width = undefined,
			sizeVariant = 'medium',
			styleVariant = 'secondary',
			capitalizeFirstLetter = false,
			rounded = false,
			fullWidth = false,
			disabled = false,
		},
		ref,
	) => {
		const [measureRef, { width: triggerWidth }] = useMeasure()

		const generateSelectButtonStyle = () => {
			let style = {
				maxWidth: '100%',
				width: 'fit-content',
			}

			if (fullWidth) {
				style = {
					width: '100%',
					maxWidth: '100%',
				}
			}

			if (width) {
				style = {
					width: `${width}px`,
					maxWidth: '100%',
				}
			}
			return style
		}

		return (
			<SelectRoot value={value} onValueChange={onValueChange}>
				{trigger || (
					<SelectTrigger asChild aria-label={selectAriaLabel}>
						<Box ref={measureRef} display="inline-flex" style={generateSelectButtonStyle()}>
							<Button
								ref={ref}
								sizeVariant={sizeVariant}
								styleVariant={styleVariant}
								rightIcon={<ChevronDown2Icon />}
								rounded={rounded}
								fullWidth={fullWidth}
								disabled={disabled}
								className={clsx(fullWidth && styles.selectFullWidthButton)}
							>
								<span style={{ overflow: 'hidden' }}>
									<SelectValue aria-label={value} placeholder={placeholder} />
								</span>
							</Button>
						</Box>
					</SelectTrigger>
				)}
				<SelectContent style={{ maxWidth: `${triggerWidth}px` }}>
					<SelectGroup>
						{data.map(({ id, title }) => (
							<SelectItem key={id} value={id}>
								<Text truncate size="small" color="strong" capitalizeFirstLetter={capitalizeFirstLetter}>
									{title}
								</Text>
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</SelectRoot>
		)
	},
)
