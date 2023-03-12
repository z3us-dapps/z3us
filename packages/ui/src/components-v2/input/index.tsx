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
	iconOnly?: boolean
	sizeVariant?: 'small' | 'medium' | 'large'
	styleVariant?: 'primary' | 'secondary'
	type?: 'text' | 'email'
	elementType?: 'input' | 'textarea'
	placeholder?: string

	onChange?: (e: React.ChangeEvent<FormElement>) => void
	// onFocus?: (e: React.ChangeEvent<FormElement>) => void
	// onBlur?: (e: React.ChangeEvent<FormElement>) => void
}

export interface IInputProps extends IInputRequiredProps, IInputOptionalProps {}

const defaultProps: IInputOptionalProps = {
	className: undefined,
	onClick: undefined,
	iconOnly: false,
	disabled: false,
	sizeVariant: 'medium',
	styleVariant: 'primary',
	elementType: 'input',
	type: 'text',
	placeholder: undefined,
	onChange: undefined,
}

export const Input = forwardRef<FormElement, IInputProps>((props, ref: React.Ref<FormElement | null>) => {
	const {
		disabled,
		iconOnly,
		onClick,
		className,
		sizeVariant,
		styleVariant,
		elementType,
		type,
		value,
		placeholder,
		onChange,
		...rest
	} = props

	const handleOnChange = (event: React.ChangeEvent<FormElement>) => {
		if (disabled) return
		onChange(event)
	}

	return (
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
					iconOnly,
				}),
			)}
			value={value}
			disabled={disabled}
			onClick={onClick}
			placeholder={placeholder}
			onChange={handleOnChange}
			{...rest}
		/>
	)
})

Input.defaultProps = defaultProps
