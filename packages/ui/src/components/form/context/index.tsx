import React from 'react'

import { type FormData, type FormErrors } from '../types'

export type FormContextValues<P extends object = {}> = {
	form: FormData<P>
	errors: FormErrors
	onFormChange: (name: string, value: any, error?: any) => void
}

export const FormContext = React.createContext<FormContextValues>({
	form: {},
	errors: {},
	onFormChange: () => {},
})
