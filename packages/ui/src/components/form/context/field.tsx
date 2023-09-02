import React from 'react'

export type FieldContextValues = {
	name: string
	value: string
	onChange: (v: any) => void
}

export const FieldContext = React.createContext<FieldContextValues>({
	name: '',
	value: undefined,
	onChange: () => {},
})
