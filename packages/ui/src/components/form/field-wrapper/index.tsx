import get from 'lodash/get'
import React, { type PropsWithChildren, type ReactNode, useContext, useEffect } from 'react'
import { useImmer } from 'use-immer'

import { Box } from 'ui/src/components/box'
import { ValidationErrorMessage } from 'ui/src/components/validation-error-message'

import { FormContext } from '../context'
import { FieldContext } from './context'

export interface IProps {
	name: string
	label?: ReactNode
	validate?: (value: any) => string
}

type State = {
	isLoading: boolean
	value: any
	error: string
}

export const FieldWrapper: React.FC<PropsWithChildren<IProps>> = ({ validate, children, name, label }) => {
	const { errors, getFieldValue, onFieldChange } = useContext(FormContext)
	const { name: parentName } = useContext(FieldContext)
	const fieldName = `${parentName ? `${parentName}.` : ''}${name}`

	const [state, setState] = useImmer<State>({
		isLoading: false,
		value: getFieldValue(fieldName),
		error: '',
	})

	useEffect(
		() => () => {
			onFieldChange(fieldName, null)
		},
		[],
	)

	useEffect(() => {
		setState(draft => {
			// eslint-disable-next-line no-underscore-dangle
			const fieldErrors = get(errors, fieldName)?._errors || []
			draft.error = fieldErrors.length > 0 ? fieldErrors[0] : ''
		})
	}, [errors])

	useEffect(() => {
		onFieldChange(fieldName, state.value)
		const error = validate ? validate(state.value) : ''
		setState(draft => {
			draft.error = error
		})
	}, [state.value])

	const onChange = (value: any) => {
		setState(draft => {
			draft.value = value
		})
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
						? React.cloneElement(child, { value: state.value, name: fieldName, onChange } as Partial<any>)
						: child,
				)}
			</Box>
			<Box display="flex" justifyContent="space-between">
				<ValidationErrorMessage message={state.error} />
			</Box>
		</Box>
	)
}
