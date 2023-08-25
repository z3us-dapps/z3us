import React, { forwardRef } from 'react'

import { type IInputProps, Input } from 'ui/src/components/input'

import { FieldWrapper, type IProps as WrapperProps } from '../../field-wrapper'

interface IProps extends Omit<IInputProps, 'onChange' | 'value' | 'name' | 'label'>, WrapperProps {
	onValueChange?: (value: string | number) => void
}

export const FormField = forwardRef<HTMLInputElement, IProps>(
	({ onValueChange, validate, name, parentName, label, type, ...rest }, ref) => {
		const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			const evt = event.nativeEvent as InputEvent
			if (evt.isComposing) {
				return
			}

			onValueChange(event.target.value)
		}

		return (
			<FieldWrapper name={name} parentName={parentName} label={label} validate={validate}>
				<Input {...rest} type="text" ref={ref} onChange={handleChange} />
			</FieldWrapper>
		)
	},
)
