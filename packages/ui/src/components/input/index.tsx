/* eslint-disable */
import React, { PropsWithoutRef, RefAttributes, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { CSS } from '../../theme'
import withDefaults from '../../utils/with-defaults'
import { __DEV__ } from '../../utils/assertion'
import { StyledInput, StyledInputWrapper, StyledInputPlaceholder, InputVariantsProps } from './input.styles'

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
	onChange?: (e: React.ChangeEvent<FormElement>) => void
	css?: CSS
	as?: keyof JSX.IntrinsicElements
}

const defaultProps = {
	type: 'text',
	placeholder: '',
	focusOnMount: false,
	selectOnMount: false,
}

type NativeAttrs = Omit<React.InputHTMLAttributes<any>, keyof IProps>
export type InputProps = IProps & typeof defaultProps & NativeAttrs & InputVariantsProps & { css?: CSS }

const Input = React.forwardRef<FormElement, InputProps>(
	(
		{ type, onChange, placeholder, disabled, error, value, size, focusOnMount, selectOnMount, as, css, ...rest },
		ref: React.Ref<FormElement | null>,
	) => {
		const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null)

		useImperativeHandle(ref, () => inputRef.current)

		// TODO: implement properties below
		const readOnly = false
		const required = false
		const isTextarea = as === 'textarea'

		const handleOnChange = (event: React.ChangeEvent<FormElement>) => {
			if (disabled || readOnly) return
			onChange && onChange(event)
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
			<StyledInputWrapper css={{ ...(css as any) }}>
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
					aria-label="input"
					aria-placeholder={placeholder}
					aria-readonly={readOnly}
					aria-required={required}
					aria-multiline={isTextarea}
					{...rest}
				/>
				<StyledInputPlaceholder as="span">{placeholder}</StyledInputPlaceholder>
			</StyledInputWrapper>
		)
	},
)

type InputComponent<T, P = unknown> = React.ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>

if (__DEV__) {
	Input.displayName = 'z3us ui - Button'
}

Input.toString = () => '.z3us-ui-button'

export default withDefaults(Input, defaultProps) as InputComponent<FormElement, IProps>
