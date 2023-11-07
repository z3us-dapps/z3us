import React, { forwardRef } from 'react'

import { type ISelectSimpleProps, SelectSimple } from 'ui/src/components/select'

import { FieldWrapper, type IProps as WrapperProps } from '../../field-wrapper'

interface IAdapterProps extends Omit<ISelectSimpleProps, 'onValueChange'> {
	onChange?: (value: any) => void
	hasError?: boolean
}

export const SelectAdapter = forwardRef<HTMLButtonElement, IAdapterProps>((props, ref) => {
	const { onChange, value, hasError, ...rest } = props

	return (
		<SelectSimple
			{...rest}
			ref={ref}
			onValueChange={onChange}
			value={value !== undefined && value !== '' ? value : undefined}
		/>
	)
})

interface IProps extends Omit<ISelectSimpleProps, 'onValueChange' | 'value' | 'name'>, WrapperProps {}

export const SelectField = forwardRef<HTMLButtonElement, IProps>(({ validate, name, label, ...rest }, ref) => (
	<FieldWrapper name={name} label={label} validate={validate}>
		<SelectAdapter {...rest} ref={ref} />
	</FieldWrapper>
))

export default SelectField
