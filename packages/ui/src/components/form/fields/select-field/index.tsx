import React, { forwardRef } from 'react'

import { type ISelectSimpleProps, SelectSimple } from 'ui/src/components/select'

import { FieldWrapper, type IProps as WrapperProps } from '../../field-wrapper'

interface IProps extends Omit<ISelectSimpleProps, 'onValueChange' | 'value'>, WrapperProps {
	onChange?: (value: string | number) => void
}

export const SelectField = forwardRef<HTMLButtonElement, IProps>(
	({ onChange, validate, name, parentName, label, ...rest }, ref) => (
		<FieldWrapper name={name} parentName={parentName} label={label} validate={validate}>
			<SelectSimple {...rest} ref={ref} onValueChange={onChange} />
		</FieldWrapper>
	),
)
