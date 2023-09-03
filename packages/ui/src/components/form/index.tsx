import set from 'lodash/set'
import type { FormEvent, PropsWithChildren } from 'react'
import React, { useMemo, useState } from 'react'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { LoadingBarsIcon } from 'ui/src/components/icons'

import { FieldContext } from './field-wrapper/context'
import { FormContext } from './context'
import { type FormData, type FormErrors } from './types'

type IProps<P = {}> = {
	initialValues: P
	onSubmit: (form: P) => Promise<void> | void
	validate?: (form: P) => any
	className?: string
	submitButtonTitle?: string | React.ReactNode
}

const rootFieldCtx = {
	name: '',
	value: undefined,
	onChange: () => {},
}

export const Form: React.FC<PropsWithChildren<IProps>> = ({
	children,
	submitButtonTitle,
	initialValues,
	validate,
	onSubmit,
	...rest
}) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [form, setForm] = useState<FormData<IProps['initialValues']>>(initialValues)
	const [errors, setErrors] = useState<FormErrors>({})

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		setIsLoading(true)
		if (validate) validate(form)
		await onSubmit(form)
		setIsLoading(false)
	}

	const handleFormChange = (name: string, value: any, error: any) => {
		setForm(set(form, name, value))
		if (error)
			setErrors({
				...errors,
				[name]: error,
			})
	}

	const formCtx = useMemo(
		() => ({
			form,
			errors,
			onFormChange: handleFormChange,
		}),
		[form],
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
				disabled={isLoading}
				rightIcon={
					isLoading ? (
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
