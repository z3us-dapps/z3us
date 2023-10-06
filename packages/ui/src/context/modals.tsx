import type { Context } from 'react'
import type React from 'react'
import { createContext } from 'react'

export type State = {
	addModal: (id: string, modal: React.JSX.Element) => void
	removeModal: (id: string) => void
}

export const defaultState: State = {
	addModal: async () => {},
	removeModal: async () => {},
}

export const ModalsContext: Context<State> = createContext<State>(defaultState)
