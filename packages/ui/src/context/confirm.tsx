import type { Context, ReactNode } from 'react'
import { createContext } from 'react'

export type Confirm = (input: {
	title?: ReactNode
	content: ReactNode
	buttonTitle?: string
	buttonStyleVariant?: string
	ignorePassword?: boolean
}) => Promise<string>

export const defaultState: Confirm = async () => {
	throw Error('Can not confirm without wallet!')
}

export const ConfirmContext: Context<Confirm> = createContext<Confirm>(defaultState)
