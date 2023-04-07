import React, { PropsWithoutRef, RefAttributes, useEffect, useImperativeHandle, useRef } from 'react'

import { CSS } from '../../theme'
import { PropsWithCSS } from '../../types'
import { __DEV__ } from '../../utils/assertion'
import withDefaults from '../../utils/with-defaults'
import { InputVariantsProps, StyledInput, StyledInputPlaceholder, StyledInputWrapper } from './input.styles'

export type FormElement = HTMLInputElement | HTMLTextAreaElement

export interface IProps {
	type?: string
	size?: string
	placeholder?: string
	value?: string
	disabled?: boolean
	error?: boolean
	focusOnMount?: boolean
	selectOnMount?: boolean
	min?: string
	theme?: string
	onChange?: (e: React.ChangeEvent<FormElement>) => void
	onFocus?: (e: React.ChangeEvent<FormElement>) => void
	onBlur?: (e: React.ChangeEvent<FormElement>) => void
	css?: CSS
	autoComplete?: 'off' | 'on'
	as?: keyof JSX.IntrinsicElements
}

const defaultProps = {
	type: 'text',
	placeholder: '',
	focusOnMount: false,
	selectOnMount: false,
	onChange: () => {},
	min: undefined,
}

type NativeAttrs = Omit<React.InputHTMLAttributes<any>, keyof IProps>
export type InputProps = IProps & typeof defaultProps & NativeAttrs & InputVariantsProps

const Input = React.forwardRef<FormElement, PropsWithCSS<InputProps>>((props, ref: React.Ref<FormElement | null>) => {
	const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null)

	const {
		type,
		onChange,
		onFocus,
		onBlur,
		placeholder,
		disabled,
		error,
		value,
		size,
		focusOnMount,
		selectOnMount,
		as,
		min,
		css,
		...rest
	} = props

	useImperativeHandle(ref, () => inputRef.current)

	// @TODO: implement properties below
	const readOnly = false
	const required = false
	const isTextarea = as === 'textarea'

	const handleOnChange = (event: React.ChangeEvent<FormElement>) => {
		if (disabled || readOnly) return
		onChange(event)
	}

	useEffect(() => {
		if (selectOnMount) {
			inputRef.current.select()
		}
		if (focusOnMount) {
			inputRef.current.focus()
		}
	}, [])

	return (
		<StyledInputWrapper css={{ ...(css as any), textarea: { height: '100%' } }}>
			<StyledInput
				ref={inputRef}
				value={value}
				type={type}
				size={size}
				isTextarea={isTextarea}
				as={as}
				placeholder={placeholder}
				disabled={disabled}
				error={error}
				onChange={handleOnChange}
				onBlur={onBlur}
				onFocus={onFocus}
				aria-label="input"
				min={min}
				aria-placeholder={placeholder}
				aria-readonly={readOnly}
				aria-required={required}
				aria-multiline={isTextarea}
				onWheelCapture={() => {
					// Note: Removes behaviour for the mouse wheel incrementing the number input
					inputRef.current.blur()
				}}
				{...rest}
			/>
			<StyledInputPlaceholder as="span">{placeholder}</StyledInputPlaceholder>
		</StyledInputWrapper>
	)
})

type InputComponent<T, P = unknown> = React.ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>

if (__DEV__) {
	Input.displayName = 'z3us ui - Input'
}

Input.toString = () => '.z3us-ui-input'

export default withDefaults(Input, defaultProps) as InputComponent<FormElement, IProps>
