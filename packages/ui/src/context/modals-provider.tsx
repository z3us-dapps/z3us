import type { PropsWithChildren } from 'react'
import React, { useMemo, useReducer } from 'react'

import type { ModalsMap } from './modals'
import { ModalsContext } from './modals'

type Action = { type: 'add_modal'; id: string; modal: React.JSX.Element } | { type: 'remove_modal'; id: string }

const reducer = (state: ModalsMap, action: Action) => {
	switch (action.type) {
		case 'add_modal':
			return { ...state, [action.id]: action.modal }
		case 'remove_modal':
			delete state[action.id]
			return state
		default:
			return state
	}
}

export const ModalsProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [modals, dispatch] = useReducer(reducer, {})

	function addModal(id: string, modal: React.JSX.Element) {
		dispatch({
			type: 'add_modal',
			id,
			modal,
		})
	}

	function removeModal(id: string) {
		dispatch({
			type: 'remove_modal',
			id,
		})
	}

	const ctx = useMemo(
		() => ({
			modals,
			addModal,
			removeModal,
		}),
		[dispatch, modals],
	)

	return <ModalsContext.Provider value={ctx}>{children}</ModalsContext.Provider>
}
