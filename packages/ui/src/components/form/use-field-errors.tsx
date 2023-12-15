import { get } from 'lodash'
import { useContext, useMemo } from 'react'

import { FormContext } from './context'

export const useFieldErrors = (name: string) => {
	const { errors } = useContext(FormContext)
	// eslint-disable-next-line no-underscore-dangle
	return useMemo(() => get(errors, name)?._errors || [], [name, JSON.stringify(errors)])
}
