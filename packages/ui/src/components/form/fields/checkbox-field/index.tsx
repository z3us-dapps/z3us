import React, { forwardRef } from 'react'

import { Checkbox, type ICheckboxProps } from 'ui/src/components/checkbox'

import { FieldWrapper, type IProps as WrapperProps } from '../../field-wrapper'

interface IAdapterProps extends Omit<ICheckboxProps, 'onChange'> {
	onChange?: (value: boolean) => void
}

export const CheckboxAdapter = forwardRef<HTMLInputElement, IAdapterProps>(({ onChange, ...rest }, ref) => {
	const handleChange = (_checked: boolean) => {
		onChange(_checked)
	}

	return <Checkbox ref={ref} {...rest} checked={false} onCheckedChange={handleChange} />
})

interface IProps extends Omit<ICheckboxProps, 'onChange' | 'value' | 'type' | 'label' | 'name'>, WrapperProps {}

export const CheckboxField = forwardRef<HTMLInputElement, IProps>(({ validate, name, label, ...rest }, ref) => (
	<FieldWrapper name={name} label={label} validate={validate}>
		<CheckboxAdapter {...rest} ref={ref} />
	</FieldWrapper>
))

export default CheckboxField
