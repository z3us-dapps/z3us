import React, { forwardRef } from 'react'

import { type IInputProps, Input } from 'ui/src/components/input'

import { FieldWrapper, type IProps as WrapperProps } from '../../field-wrapper'

interface IAdapterProps extends Omit<IInputProps, 'onChange'> {
	isPassword?: boolean
	onChange?: (value: string) => void
	hasError?: boolean
}

export const TextInputAdapter = forwardRef<HTMLInputElement, IAdapterProps>(
	({ isPassword, onChange, hasError, styleVariant, ...rest }, ref) => {
		const errorVariant = styleVariant === 'primary' ? 'primary-error' : 'secondary-error'

		const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			const evt = event.nativeEvent as InputEvent
			if (evt.isComposing) {
				return
			}

			onChange(event.target.value)
		}

		return (
			<Input
				{...rest}
				styleVariant={hasError ? errorVariant : styleVariant}
				type={isPassword ? 'password' : 'text'}
				ref={ref}
				onChange={handleChange}
			/>
		)
	},
)

interface IProps extends Omit<IInputProps, 'onChange' | 'value' | 'type' | 'label' | 'name'>, WrapperProps {
	isPassword?: boolean
}

export const TextField = forwardRef<HTMLInputElement, IProps>(({ validate, name, label, isPassword, ...rest }, ref) => (
	<FieldWrapper name={name} label={label} validate={validate}>
		<TextInputAdapter {...rest} isPassword={isPassword} ref={ref} />
	</FieldWrapper>
))

export default TextField
