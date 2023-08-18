import React, { type ReactNode, forwardRef } from 'react'

import { Box } from 'ui/src/components/box'
import { type IInputProps, Input } from 'ui/src/components/input'
import { ValidationErrorMessage } from 'ui/src/components/validation-error-message'

interface IProps extends Omit<IInputProps, 'onChange'> {
	name: string
	parentName?: string
	value?: string
	onChange?: (value: string) => void
	label?: ReactNode
}

export const TextField = forwardRef<HTMLInputElement, IProps>(
	({ name, parentName, label, value, onChange, ...rest }, ref) => {
		const fieldName = `${parentName ? `${parentName}.` : ``}${name}`
		const error = { message: 'This needs to be implemented', error: true } //useFormError(fieldName)

		const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			const evt = event.nativeEvent as InputEvent
			if (evt.isComposing) {
				return
			}

			if (onChange) onChange(event.target.value)
		}

		return (
			<Box>
				<Box display="flex" paddingBottom="small" paddingTop="large">
					{label}
				</Box>
				<Box width="full" position="relative">
					<Input {...rest} ref={ref} type="text" name={fieldName} value={value} onChange={handleChange} />
				</Box>
				<Box display="flex" justifyContent="space-between">
					{error && <ValidationErrorMessage error={error} />}
				</Box>
			</Box>
		)
	},
)
