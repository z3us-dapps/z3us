import get from 'lodash/get'
import set from 'lodash/set'
import unset from 'lodash/unset'
import type { FormEvent, PropsWithChildren } from 'react'
import React, { useEffect, useMemo } from 'react'
import { useImmer } from 'use-immer'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { LoadingBarsIcon } from 'ui/src/components/icons'

import { FormContext } from './context'
import { FieldContext } from './field-wrapper/context'
import { type FormData, type FormErrors } from './types'

type Props<P = {}> = {
	initialValues: P
	errors?: FormErrors<P>
	className?: string
	submitButtonTitle?: string | React.ReactNode

	onSubmit: (values: P) => Promise<void> | void
	onChange?: (values: P) => Promise<void> | void
}

type State<P = {}> = {
	isLoading: boolean
	values: FormData<P>
}

const rootFieldCtx = {
	name: '',
	value: undefined,
	onChange: () => {},
}

export const Form: React.FC<PropsWithChildren<Props>> = ({
	children,
	submitButtonTitle,
	initialValues,
	errors = {},
	onSubmit,
	onChange,
	...rest
}) => {
	const [state, setState] = useImmer<State<Props['initialValues']>>({
		isLoading: false,
		values: initialValues,
	})

	useEffect(() => {
		if (onChange) onChange(state.values)
	}, [state.values])

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setState(draft => {
			draft.isLoading = true
		})
		await onSubmit(state.values)
		setState(draft => {
			draft.isLoading = false
		})
	}

	const handleGetFieldValue = (name: string): any => get(state.values, name)

	const handleFieldChange = (name: string, value?: any) => {
		setState(draft => {
			if (value === null) {
				unset(draft.values, name)
			} else {
				set(draft.values, name, value)
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
		<form {...rest} onSubmit={handleSubmit}>
			<FormContext.Provider value={formCtx}>
				<FieldContext.Provider value={rootFieldCtx}>{children}</FieldContext.Provider>
			</FormContext.Provider>
			<Button
				fullWidth
				styleVariant="primary"
				sizeVariant="xlarge"
				type="submit"
				disabled={state.isLoading}
				rightIcon={
					state.isLoading ? (
						<Box marginLeft="small">
							<LoadingBarsIcon />
						</Box>
					) : null
				}
			>
				{submitButtonTitle}
			</Button>
		</form>
	)
}
