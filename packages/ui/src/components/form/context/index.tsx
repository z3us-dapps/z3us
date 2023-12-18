import React from 'react'

import { type FormData, type FormErrors } from '../types'

export type FormContextValues<P extends object = {}> = {
	isLoading: boolean
	values: FormData<P>
	errors: FormErrors<P>
	onFieldChange: (name: string, value?: any) => void
}

export const FormContext = React.createContext<FormContextValues>({
	isLoading: false,
	values: {},
	errors: {},
	onFieldChange: () => {},
})
