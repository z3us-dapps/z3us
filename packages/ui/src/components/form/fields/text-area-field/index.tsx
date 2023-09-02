import React, { forwardRef } from 'react'

import { type IInputProps, Input } from 'ui/src/components/input'

import { FieldWrapper, type IProps as WrapperProps } from '../../field-wrapper'

interface IAdapterProps extends Omit<IInputProps, 'onChange'> {
	onChange?: (value: string) => void
}

export const TextAreaAdapter = forwardRef<HTMLInputElement, IAdapterProps>(({ onChange, ...rest }, ref) => {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const evt = event.nativeEvent as InputEvent
		if (evt.isComposing) {
			return
		}

		onChange(event.target.value)
	}

	return <Input {...rest} elementType="textarea" type="text" ref={ref} onChange={handleChange} />
})

interface IProps extends Omit<IInputProps, 'onChange' | 'value' | 'type' | 'label' | 'name'>, WrapperProps {}

export const TextAreaField = forwardRef<HTMLInputElement, IProps>(({ validate, name, label, ...rest }, ref) => (
	<FieldWrapper name={name} label={label} validate={validate}>
		<TextAreaAdapter {...rest} ref={ref} />
	</FieldWrapper>
))

export default TextAreaField
