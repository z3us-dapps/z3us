import type { PropsWithChildren } from 'react'
import React, { useContext, useMemo } from 'react'

import { FieldContext } from '../field-wrapper/context'

interface IProps {
	idx: number
	name: string
}

export const GroupField: React.FC<PropsWithChildren<IProps>> = props => {
	const { idx, name, children } = props
	const { name: parentName, ...parentCtx } = useContext(FieldContext)

	const ctx = useMemo(
		() => ({
			...parentCtx,
			name: `${parentName ? `${parentName}.` : ``}${name}[${idx}]`,
		}),
		[parentName, name, idx],
	)

	return <FieldContext.Provider value={ctx}>{children}</FieldContext.Provider>
}
