import React from 'react'

import { type FormData, type FormErrors } from '../types'

export type FormContextValues<P extends object = {}> = {
	values: FormData<P>
	errors: FormErrors<P>
	getFieldValue: (name: string) => any
	onFieldChange: (name: string, value?: any) => void
}

export const FormContext = React.createContext<FormContextValues>({
	values: {},
	errors: {},
	getFieldValue: () => null,
	onFieldChange: () => {},
})
