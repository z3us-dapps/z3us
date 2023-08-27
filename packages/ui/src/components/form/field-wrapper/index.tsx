import React, { type PropsWithChildren, type ReactNode, useContext, useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

import { Box } from 'ui/src/components/box'
import { type IInputProps } from 'ui/src/components/input'
import { ValidationErrorMessage } from 'ui/src/components/validation-error-message'

import { FormContext } from '../context'

export interface IProps {
	name: string
	parentName?: string
	label?: ReactNode
	validate?: (value: string | number) => any
}

export const FieldWrapper: React.FC<PropsWithChildren<IProps>> = ({ validate, children, name, parentName, label }) => {
	const { form, errors, onFormChange } = useContext(FormContext)

	const fieldName = `${parentName ? `${parentName}.` : ``}${name}`

	const [value, setValue] = useState<string>(`${form[name] || ''}`)
	const [debouncedValue] = useDebounce<string>(value, 200)

	useEffect(() => {
		if (!onFormChange) return
		const error = validate ? validate(debouncedValue) : null
		onFormChange(fieldName, debouncedValue, error)
	}, [debouncedValue])

	const onChange = (v: any) => {
		setValue(v)
	}

	return (
		<Box>
			{label && (
				<Box display="flex" paddingBottom="small" paddingTop="large">
					{label}
				</Box>
			)}
			<Box width="full" position="relative">
				{React.Children.map(children, child =>
					React.isValidElement(child)
						? React.cloneElement(child, { value, name: fieldName, onChange } as Partial<IInputProps>)
						: child,
				)}
			</Box>
			<Box display="flex" justifyContent="space-between">
				{errors[name] && <ValidationErrorMessage error={errors[name]} />}
			</Box>
		</Box>
	)
}
