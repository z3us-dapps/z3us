import { get } from 'lodash'
import { useContext, useMemo } from 'react'

import { FormContext } from './context'

export const useFieldValue = (name: string) => {
	const { values } = useContext(FormContext)
	return useMemo(() => get(values, name), [name, values])
}
