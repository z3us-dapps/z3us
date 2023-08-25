import React, { forwardRef } from 'react'

import { type IInputProps, Input } from 'ui/src/components/input'

import { FieldWrapper, type IProps as WrapperProps } from '../../field-wrapper'

interface IProps extends Omit<IInputProps, 'onChange' | 'value' | 'name' | 'label' | 'type'>, WrapperProps {
	onChange?: (value: string | number) => void
}

export const TextField = forwardRef<HTMLInputElement, IProps>(
	({ onChange, validate, name, parentName, label, ...rest }, ref) => {
		const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			const evt = event.nativeEvent as InputEvent
			if (evt.isComposing) {
				return
			}

			onChange(event.target.value)
		}

		return (
			<FieldWrapper name={name} parentName={parentName} label={label} validate={validate}>
				<Input {...rest} type="text" ref={ref} onChange={handleChange} />
			</FieldWrapper>
		)
	},
)
