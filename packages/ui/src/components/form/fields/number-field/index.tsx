import React, { forwardRef } from 'react'

import { type IInputProps, Input } from 'ui/src/components/input'

import { FieldWrapper, type IProps as WrapperProps } from '../../field-wrapper'

interface IAdapterProps extends Omit<IInputProps, 'onChange'> {
	onChange?: (value: number) => void
	hasError?: boolean
}

export const NumberInputAdapter = forwardRef<HTMLInputElement, IAdapterProps>((props, ref) => {
	const { onChange, hasError, ...rest } = props
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const evt = event.nativeEvent as InputEvent
		if (evt.isComposing) {
			return
		}

		onChange(event.target.value === '' ? undefined : +event.target.value)
	}

	return (
		<Input
			{...rest}
			type="number"
			ref={ref}
			onChange={handleChange}
			styleVariant={hasError ? 'primary-error' : 'primary'}
		/>
	)
})

interface IProps extends Omit<IInputProps, 'onChange' | 'value' | 'type' | 'label' | 'name'>, WrapperProps {}

export const NumberField = forwardRef<HTMLInputElement, IProps>(({ validate, name, label, ...rest }, ref) => (
	<FieldWrapper name={name} label={label} validate={validate}>
		<NumberInputAdapter {...rest} ref={ref} />
	</FieldWrapper>
))

export default NumberField
