import type { PropsWithChildren } from 'react'
import React, { Suspense, useMemo, useReducer } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { FallbackLoading, FallbackRenderer } from 'ui/src/components/fallback-renderer'

import { ModalsContext } from './modals'

export type ModalsMap = { [id: string]: React.JSX.Element }

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
	const root = document.getElementById('modals')
	if (!root) throw new Error('Modals root node not found. Cannot render modal.')

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
			addModal,
			removeModal,
		}),
		[dispatch],
	)

	return (
		<ModalsContext.Provider value={ctx}>
			<>
				{children}
				{Object.keys(modals).map(id => (
					<Suspense key={id} fallback={<FallbackLoading />}>
						<ErrorBoundary fallbackRender={FallbackRenderer}>{modals[id]}</ErrorBoundary>
					</Suspense>
				))}
			</>
		</ModalsContext.Provider>
	)
}
