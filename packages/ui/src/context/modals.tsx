import type { Context } from 'react'
import React, { createContext } from 'react'

export type ModalsMap = { [id: string]: React.JSX.Element }

export type State = {
	modals: ModalsMap
	addModal: (id: string, modal: React.JSX.Element) => void
	removeModal: (id: string) => void
}

export const defaultState: State = {
	modals: {},
	addModal: async () => {},
	removeModal: async () => {},
}

export const ModalsContext: Context<State> = createContext<State>(defaultState)
