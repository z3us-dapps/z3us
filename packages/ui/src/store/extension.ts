import type { Address, ExtensionState, IExtensionStateSetter } from './types'

const defaultState = {
	personaIndexes: {},
	accountIndexes: {},
}

export const factory = (set: IExtensionStateSetter): ExtensionState => ({
	...defaultState,

	addPersonaAction: (idx: number, address: Address) => {
		set(state => {
			state.personaIndexes = {
				...state.personaIndexes,
				[idx]: address,
			}
		})
	},

	removePersonaAction: (idx: number) => {
		set(state => {
			delete state.personaIndexes[idx]
			state.personaIndexes = { ...state.personaIndexes }
		})
	},

	addAccountAction: (idx: number, address: Address) => {
		set(state => {
			state.accountIndexes = {
				...state.accountIndexes,
				[idx]: address,
			}
		})
	},

	removeAccountAction: (idx: number) => {
		set(state => {
			delete state.accountIndexes[idx]
			state.accountIndexes = { ...state.personaIndexes }
		})
	},
})
