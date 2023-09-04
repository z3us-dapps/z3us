import { useContext, useMemo } from 'react'

import { FormContext } from './context'

export const useFieldValue = (name: string) => {
	const { getFieldValue } = useContext<any>(FormContext)
	return useMemo(() => getFieldValue(name), [name])
}
