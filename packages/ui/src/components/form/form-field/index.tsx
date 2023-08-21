import React, { type ReactNode, forwardRef, useContext, useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

import { Box } from 'ui/src/components/box'
import { type IInputProps, Input } from 'ui/src/components/input'
import { ValidationErrorMessage } from 'ui/src/components/validation-error-message'

import { FormContext } from '../context'

interface IProps extends Omit<IInputProps, 'onChange' | 'value' | 'type'> {
	name: string
	type: HTMLInputElement['type']
	parentName?: string
	label?: ReactNode
	validate?: (value: string | number) => any
}

export const FormField = forwardRef<HTMLInputElement, IProps>(
	({ validate, name, parentName, label, type, ...rest }, ref) => {
		const { form, errors, onFormChange } = useContext(FormContext)

		const fieldName = `${parentName ? `${parentName}.` : ``}${name}`

		const [value, setValue] = useState<string>(`${form[name] || ''}`)
		const [debouncedValue] = useDebounce<string>(value, 200)

		useEffect(() => {
			if (!onFormChange) return
			const normalizedValue = type === 'number' ? +debouncedValue : debouncedValue
			const error = validate ? validate(normalizedValue) : null
			onFormChange(fieldName, normalizedValue, error)
		}, [debouncedValue])

		const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			const evt = event.nativeEvent as InputEvent
			if (evt.isComposing) {
				return
			}

			setValue(event.target.value)
		}

		return (
			<Box>
				<Box display="flex" paddingBottom="small" paddingTop="large">
					{label}
				</Box>
				<Box width="full" position="relative">
					<Input {...rest} type={type} ref={ref} name={fieldName} value={value} onChange={handleChange} />
				</Box>
				<Box display="flex" justifyContent="space-between">
					{errors[name] && <ValidationErrorMessage error={errors[name]} />}
				</Box>
			</Box>
		)
	},
)
