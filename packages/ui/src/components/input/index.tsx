import clsx, { type ClassValue } from 'clsx'
import React, { forwardRef } from 'react'

import { Box } from '../box'
import { element } from '../system/reset.css'
import * as styles from './input.css'

export type TSizeVariant = 'small' | 'medium' | 'large'
export type TStyleVariant = 'primary' | 'secondary' | 'primary-error' | 'secondary-error'

export type FormElement = HTMLInputElement | HTMLTextAreaElement

export interface IInputRequiredProps {
	value: string | number | undefined
}

export interface IInputOptionalProps {
	className?: ClassValue
	onClick?: () => void
	disabled?: boolean
	rounded?: boolean
	sizeVariant?: TSizeVariant
	styleVariant?: TStyleVariant
	type?: 'text' | 'email'
	elementType?: 'input' | 'textarea'
	placeholder?: string
	leftIcon?: React.ReactNode
	leftIconClassName?: ClassValue
	rightIcon?: React.ReactNode
	rightIconClassName?: ClassValue
	onChange?: (e: React.ChangeEvent<FormElement>) => void
	onFocus?: (e: React.FocusEvent<FormElement>) => void
	onBlur?: (e: React.FocusEvent<FormElement>) => void
}

export interface IInputProps extends IInputRequiredProps, IInputOptionalProps {}

export const inputDefaultProps: IInputOptionalProps = {
	className: undefined,
	onClick: undefined,
	rounded: false,
	disabled: false,
	sizeVariant: 'medium',
	styleVariant: 'primary',
	elementType: 'input',
	type: 'text',
	leftIcon: undefined,
	leftIconClassName: undefined,
	rightIcon: undefined,
	rightIconClassName: undefined,
	placeholder: undefined,
	onChange: undefined,
	onFocus: undefined,
	onBlur: undefined,
}

export const Input = forwardRef<FormElement, IInputProps>((props, ref: React.Ref<FormElement | null>) => {
	const {
		disabled,
		rounded,
		onClick,
		className,
		sizeVariant,
		styleVariant,
		elementType,
		type,
		value,
		placeholder,
		leftIcon,
		leftIconClassName,
		rightIcon,
		rightIconClassName,
		onChange,
		onFocus,
		onBlur,
		...rest
	} = props

	const handleOnChange = (event: React.ChangeEvent<FormElement>) => {
		if (disabled) return
		onChange(event)
	}

	return (
		<Box className={styles.inputWrapper}>
			<Box
				ref={ref}
				component={elementType}
				type={type}
				className={clsx(
					className,
					element.textarea,
					styles.baseSprinkles,
					styles.input({
						sizeVariant,
						styleVariant,
						rounded,
						leftIcon: !!leftIcon,
						rightIcon: !!rightIcon,
					}),
				)}
				value={value}
				disabled={disabled}
				onClick={onClick}
				placeholder={placeholder}
				onChange={handleOnChange}
				onFocus={onFocus}
				onBlur={onBlur}
				{...rest}
			/>
			{leftIcon ? (
				<Box
					className={clsx(
						styles.iconLeft({
							sizeVariant,
						}),
						leftIconClassName,
					)}
				>
					{leftIcon}
				</Box>
			) : null}
			{rightIcon ? (
				<Box
					className={clsx(
						styles.iconRight({
							sizeVariant,
						}),
						rightIconClassName,
					)}
				>
					{rightIcon}
				</Box>
			) : null}
		</Box>
	)
})

Input.defaultProps = inputDefaultProps
