import React, { forwardRef } from 'react'

import { type ISelectSimpleProps, SelectSimple } from 'ui/src/components/select'

import { FieldWrapper, type IProps as WrapperProps } from '../../field-wrapper'

interface IAdapterProps extends Omit<ISelectSimpleProps, 'onValueChange'> {
	onChange?: (value: string) => void
	onSelect?: (value: string) => void
	hasError?: boolean
}

export const SelectAdapter = forwardRef<HTMLButtonElement, IAdapterProps>((props, ref) => {
	const { onChange, onSelect, value, hasError, ...rest } = props

	const handleChange = (selected: string) => {
		if (onChange) onChange(selected)
		if (onSelect) onSelect(selected)
	}

	return (
		<SelectSimple
			{...rest}
			ref={ref}
			onValueChange={handleChange}
			value={value !== undefined && value !== '' ? value : undefined}
		/>
	)
})

interface IProps extends Omit<ISelectSimpleProps, 'onValueChange' | 'value' | 'name'>, WrapperProps {
	onSelect?: (value: string) => void
}

export const SelectField = forwardRef<HTMLButtonElement, IProps>(({ validate, name, label, ...rest }, ref) => (
	<FieldWrapper name={name} label={label} validate={validate}>
		<SelectAdapter {...rest} ref={ref} />
	</FieldWrapper>
))

export default SelectField
