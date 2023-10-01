import type { Account, ExtensionState, IExtensionStateSetter, Persona } from './types'

const defaultState = {
	radixConnectorEnabled: true,
	personaIndexes: {},
	accountIndexes: {},
}

export const factory = (set: IExtensionStateSetter): ExtensionState => ({
	...defaultState,

	toggleRadixConnectorEnabledAction: (enabled: boolean) => {
		set(state => {
			state.radixConnectorEnabled = enabled
		})
	},

	addPersonaAction: (networkId: number, idx: number, persona: Persona) => {
		set(state => {
			const indexes = state.personaIndexes[networkId] || {}
			state.personaIndexes[networkId] = {
				...indexes,
				[idx]: persona,
			}
		})
	},

	removePersonaAction: (networkId: number, idx: number) => {
		set(state => {
			const indexes = state.personaIndexes[networkId] || {}
			delete indexes[idx]
			state.personaIndexes[networkId] = indexes
		})
	},

	addAccountAction: (networkId: number, idx: number, account: Account) => {
		set(state => {
			const indexes = state.accountIndexes[networkId] || {}
			state.accountIndexes[networkId] = {
				...indexes,
				[idx]: account,
			}
		})
	},

	removeAccountAction: (networkId: number, idx: number) => {
		set(state => {
			const indexes = state.accountIndexes[networkId] || {}
			delete indexes[idx]
			state.accountIndexes[networkId] = indexes
		})
	},
})
