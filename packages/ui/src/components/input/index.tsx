import clsx, { type ClassValue } from 'clsx'
import type { HTMLProps, KeyboardEvent } from 'react'
import React, { forwardRef } from 'react'

import { Box } from '../box'
import { element } from '../system/reset.css'
import * as styles from './input.css'

export type TSizeVariant = 'small' | 'medium' | 'large'
export type TStyleVariant = 'primary' | 'secondary' | 'primary-error' | 'secondary-error'

export type FormElement = HTMLInputElement | HTMLTextAreaElement

export interface IInputProps
	extends Omit<HTMLProps<HTMLInputElement>, 'onChange' | 'onFocus' | 'onBlur' | 'onKeyDown'> {
	value?: string | number | undefined
	onClick?: () => void
	disabled?: boolean
	rounded?: boolean
	sizeVariant?: TSizeVariant
	styleVariant?: TStyleVariant
	name?: string
	type?: HTMLInputElement['type'] | HTMLTextAreaElement['type']
	elementType?: 'input' | 'textarea'
	placeholder?: string
	leftIcon?: React.ReactNode
	leftIconClassName?: ClassValue
	rightIcon?: React.ReactNode
	rightIconClassName?: ClassValue
	onChange?: (e: React.ChangeEvent<FormElement>) => void
	onKeyDown?: (e: KeyboardEvent<FormElement>) => void
	onFocus?: (e: React.FocusEvent<FormElement>) => void
	onBlur?: (e: React.FocusEvent<FormElement>) => void
}

export const Input = forwardRef<FormElement, IInputProps>((props, ref: React.Ref<FormElement | null>) => {
	const {
		disabled = false,
		rounded = false,
		onClick,
		className,
		sizeVariant = 'medium',
		styleVariant = 'primary',
		elementType = 'input',
		type = 'text',
		value = '',
		name,
		placeholder,
		leftIcon,
		leftIconClassName,
		rightIcon,
		rightIconClassName,
		onChange,
		onKeyDown,
		onFocus,
		onBlur,
		...rest
	} = props

	const isElementTextArea = elementType === 'textarea'
	const baseStyles = clsx(
		className,
		element.textarea,
		styles.baseSprinkles,
		styles.input({
			sizeVariant,
			styleVariant,
			rounded,
			leftIcon: !!leftIcon,
			rightIcon: !!rightIcon,
			disabled,
		}),
		isElementTextArea && styles.textAreaDefault,
	)

	const handleOnChange = (event: React.ChangeEvent<FormElement>) => {
		if (disabled) return
		onChange(event)
	}

	const handleOnKeyDown = (event: KeyboardEvent<FormElement>) => {
		if (disabled) return
		if (onKeyDown) onKeyDown(event)
	}

	return (
		<Box className={styles.inputWrapper}>
			{isElementTextArea ? (
				<textarea
					ref={ref as React.Ref<HTMLTextAreaElement>}
					className={baseStyles}
					name={name}
					value={value}
					disabled={disabled}
					onClick={onClick}
					placeholder={placeholder}
					onChange={handleOnChange}
					onKeyDown={handleOnKeyDown}
					onFocus={onFocus}
					onBlur={onBlur}
					rows={20}
				/>
			) : (
				<input
					ref={ref as React.Ref<HTMLInputElement>}
					type={type}
					className={baseStyles}
					name={name}
					value={value}
					disabled={disabled}
					onClick={onClick}
					placeholder={placeholder}
					onChange={handleOnChange}
					onKeyDown={handleOnKeyDown}
					onFocus={onFocus}
					onBlur={onBlur}
					{...rest}
				/>
			)}
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
