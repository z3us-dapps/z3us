import clsx from 'clsx'
import React, { forwardRef } from 'react'

import { Box } from '../box'
import { element } from '../system/reset.css'
import * as styles from './input.css'

export type FormElement = HTMLInputElement | HTMLTextAreaElement

interface IInputRequiredProps {
	value: string
}

interface IInputOptionalProps {
	className?: string
	onClick?: () => void
	disabled?: boolean
	rounded?: boolean
	sizeVariant?: 'small' | 'medium' | 'large'
	styleVariant?: 'primary' | 'secondary'
	type?: 'text' | 'email'
	elementType?: 'input' | 'textarea'
	placeholder?: string
	leftIcon?: React.ReactNode
	rightIcon?: React.ReactNode
	onChange?: (e: React.ChangeEvent<FormElement>) => void
	// onFocus?: (e: React.ChangeEvent<FormElement>) => void
	// onBlur?: (e: React.ChangeEvent<FormElement>) => void
}

export interface IInputProps extends IInputRequiredProps, IInputOptionalProps {}

const defaultProps: IInputOptionalProps = {
	className: undefined,
	onClick: undefined,
	rounded: false,
	disabled: false,
	sizeVariant: 'medium',
	styleVariant: 'primary',
	elementType: 'input',
	type: 'text',
	leftIcon: undefined,
	rightIcon: undefined,
	placeholder: undefined,
	onChange: undefined,
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
		rightIcon,
		onChange,
		...rest
	} = props

	const handleOnChange = (event: React.ChangeEvent<FormElement>) => {
		if (disabled) return
		onChange(event)
	}

	return (
		<Box position="relative" width="full">
			<Box
				ref={ref}
				component={elementType}
				type={type}
				className={clsx(
					className,
					element.textarea,
					styles.baseSprinkles,
					styles.button({
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
				{...rest}
			/>
			{leftIcon ? (
				<Box
					className={clsx(
						styles.iconLeft({
							sizeVariant,
						}),
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
					)}
				>
					{rightIcon}
				</Box>
			) : null}
		</Box>
	)
})

Input.defaultProps = defaultProps
