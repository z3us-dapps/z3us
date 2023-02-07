import React, { forwardRef } from 'react'
import clsx from 'clsx'
import { Box } from '../box'

import { element } from '../system/reset.css'

import * as styles from './input.css'

export type FormElement = HTMLInputElement | HTMLTextAreaElement

interface IInputRequiredProps {}

interface IInputOptionalProps {
	className?: number
	onClick?: () => void
	disabled?: boolean
	iconOnly?: boolean
	sizeVariant?: 'small' | 'medium' | 'large'
	styleVariant?: 'primary' | 'secondary'
	type?: 'text' | 'email'
	elementType?: 'input' | 'textarea'
	placeholder?: string

	// onChange?: (e: React.ChangeEvent<FormElement>) => void
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
}

export const Input = forwardRef<FormElement, IInputProps>((props, ref: React.Ref<FormElement | null>) => {
	const { disabled, iconOnly, onClick, className, sizeVariant, styleVariant, elementType, type, placeholder, ...rest } =
		props

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
			disabled={disabled}
			onClick={onClick}
			placeholder={placeholder}
			{...rest}
		/>
	)
})

Input.defaultProps = defaultProps
