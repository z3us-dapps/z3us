import get from 'lodash/get'
import React, { type PropsWithChildren, type ReactNode, useContext, useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

import { Box } from 'ui/src/components/box'
import { ValidationErrorMessage } from 'ui/src/components/validation-error-message'

import { FieldContext } from '../context/field'
import { FormContext } from '../context/form'

export interface IProps {
	name: string
	label?: ReactNode
	validate?: (value: string | number) => any
}

export const FieldWrapper: React.FC<PropsWithChildren<IProps>> = ({ validate, children, name, label }) => {
	const { form, errors, onFormChange } = useContext(FormContext)
	const { name: parentName } = useContext(FieldContext)
	const fieldName = `${parentName}${name}`

	const [value, setValue] = useState<any>(`${get(form, fieldName) || ''}`)
	const [debouncedValue] = useDebounce<any>(value, 200)

	const onChange = (v: any) => {
		setValue(v)
	}

	useEffect(() => {
		if (!onFormChange) return
		const error = validate ? validate(debouncedValue) : null
		onFormChange(fieldName, debouncedValue, error)
	}, [debouncedValue])

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
						? React.cloneElement(child, { value, name: fieldName, onChange } as Partial<any>)
						: child,
				)}
			</Box>
			<Box display="flex" justifyContent="space-between">
				{errors[name] && <ValidationErrorMessage error={errors[name]} />}
			</Box>
		</Box>
	)
}
