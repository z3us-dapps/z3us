import React, { type PropsWithChildren, type ReactNode, useContext, useEffect } from 'react'
import { useImmer } from 'use-immer'

import { Box } from 'ui/src/components/box'
import { ValidationErrorMessage } from 'ui/src/components/validation-error-message'

import { FormContext } from '../context'
import { useFieldErrors } from '../use-field-errors'
import { useFieldValue } from '../use-field-value'
import { FieldContext } from './context'

export interface IProps {
	name: string
	label?: ReactNode
	hidden?: boolean
	validate?: (value: any) => string
}

type State = {
	error: string
}

export const FieldWrapper: React.FC<PropsWithChildren<IProps>> = ({ validate, children, name, label, hidden }) => {
	const { onFieldChange } = useContext(FormContext)
	const { name: parentName } = useContext(FieldContext)
	const fieldName = `${parentName ? `${parentName}.` : ''}${name}`
	const fieldValue = useFieldValue(fieldName)
	const fieldErrors = useFieldErrors(fieldName)

	const [state, setState] = useImmer<State>({
		error: '',
	})

	useEffect(() => {
		if (!fieldValue) onFieldChange(fieldName, '')
	}, [])

	useEffect(() => {
		const error = validate ? validate(fieldValue) : ''
		setState(draft => {
			draft.error = error
		})
	}, [fieldValue])

	useEffect(() => {
		setState(draft => {
			draft.error = fieldErrors.length > 0 ? fieldErrors[0] : ''
		})
	}, [fieldErrors.length])

	const onChange = (value: any) => {
		onFieldChange(fieldName, value)
	}

	return (
		<Box display={hidden ? 'none' : 'block'}>
			{label && (
				<Box display="flex" paddingBottom="small" paddingTop="large">
					{label}
				</Box>
			)}
			<Box width="full">
				{React.Children.map(children, child =>
					React.isValidElement(child)
						? React.cloneElement(child, {
								value: fieldValue,
								name: fieldName,
								onChange,
								hasError: !!state.error,
						  } as Partial<any>)
						: child,
				)}
			</Box>
			<Box display="flex" justifyContent="space-between">
				<ValidationErrorMessage message={state.error} />
			</Box>
		</Box>
	)
}
