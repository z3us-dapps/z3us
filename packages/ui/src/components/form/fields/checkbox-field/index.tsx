import React, { forwardRef } from 'react'

import { Checkbox, type ICheckboxProps } from 'ui/src/components/checkbox'

import { FieldWrapper, type IProps as WrapperProps } from '../../field-wrapper'

interface IProps extends Omit<ICheckboxProps, 'onChange' | 'value' | 'name' | 'label' | 'type'>, WrapperProps {
	onChange?: (value: string | number) => void
}

export const CheckboxField = forwardRef<HTMLInputElement, IProps>(
	({ onChange, validate, name, parentName, label, ...rest }, ref) => {
		const handleChange = (_checked: boolean) => {
			onChange(_checked)
		}

		return (
			<FieldWrapper name={name} parentName={parentName} label={label} validate={validate}>
				<Checkbox ref={ref} {...rest} checked={false} onCheckedChange={() => {}} />
			</FieldWrapper>
		)
	},
)
