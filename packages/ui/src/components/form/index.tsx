import get from 'lodash/get'
import set from 'lodash/set'
import unset from 'lodash/unset'
import type { FormEvent, PropsWithChildren } from 'react'
import React, { useEffect, useMemo } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useImmer } from 'use-immer'

import { Box } from 'ui/src/components/box'

import { ValidationErrorMessage } from '../validation-error-message'
import { FormContext } from './context'
import { FieldContext } from './field-wrapper/context'
import { type FormData, type FormErrors } from './types'

type Props<P = {}> = {
	initialValues: P
	errors?: FormErrors<P>
	className?: string
	onSubmit: (values: P) => Promise<void> | void
	onChange?: (values: P) => Promise<void> | void
}

type State<P = {}> = {
	error: string
	isLoading: boolean
	values: FormData<P>
}

const messages = defineMessages({
	error: {
		id: 'GtxE3T',
		defaultMessage: `Internal error{hasMessage, select,
			true {: {message}}
			other {, please try again}
		}`,
	},
})

const rootFieldCtx = {
	name: '',
	value: undefined,
	onChange: () => {},
}

export const Form: React.FC<PropsWithChildren<Props>> = ({
	children,
	initialValues,
	errors = {},
	onSubmit,
	onChange,
	...rest
}) => {
	const intl = useIntl()
	const [state, setState] = useImmer<State<Props['initialValues']>>({
		error: '',
		isLoading: false,
		values: initialValues,
	})

	useEffect(() => {
		setState(draft => {
			draft.values = initialValues
		})
	}, [initialValues])

	useEffect(() => {
		const { values } = state
		if (onChange) onChange(values)
	}, [state.values])

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setState(draft => {
			draft.isLoading = true
		})

		try {
			const { values } = state
			await onSubmit(values)
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error)
			setState(draft => {
				draft.error = intl.formatMessage(messages.error, { hasMessage: !!error?.message, message: error?.message })
			})
		} finally {
			setState(draft => {
				draft.isLoading = false
			})
		}
	}

	const handleGetFieldValue = (name: string) => {
		const { values } = state
		const value = get(values, name)
		return value
	}

	const handleFieldChange = (name: string, value?: any) => {
		setState(draft => {
			const { values } = draft
			if (value === null) {
				unset(values, name)
				draft.values = values
			} else {
				draft.values = set({ ...values }, name, value)
			}
		})
	}

	const formCtx = useMemo(
		() => ({
			...state,
			errors,
			getFieldValue: handleGetFieldValue,
			onFieldChange: handleFieldChange,
		}),
		[state.values, errors],
	)

	return (
		<Box {...rest} component="form" onSubmit={handleSubmit}>
			<ValidationErrorMessage message={state.error} />
			<FormContext.Provider value={formCtx}>
				<FieldContext.Provider value={rootFieldCtx}>{children}</FieldContext.Provider>
			</FormContext.Provider>
		</Box>
	)
}
