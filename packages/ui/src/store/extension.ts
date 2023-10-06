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

	addPersonaAction: (networkId: number, address: string, persona: Persona) => {
		set(state => {
			const indexes = state.personaIndexes[networkId] || {}
			state.personaIndexes[networkId] = {
				...indexes,
				[address]: persona,
			}
		})
	},

	removePersonaAction: (networkId: number, address: string) => {
		set(state => {
			const indexes = state.personaIndexes[networkId] || {}
			delete indexes[address]
			state.personaIndexes[networkId] = indexes
		})
	},

	addAccountAction: (networkId: number, address: string, account: Account) => {
		set(state => {
			const indexes = state.accountIndexes[networkId] || {}
			state.accountIndexes[networkId] = {
				...indexes,
				[address]: account,
			}
		})
	},

	removeAccountAction: (networkId: number, address: string) => {
		set(state => {
			const indexes = state.accountIndexes[networkId] || {}
			delete indexes[address]
			state.accountIndexes[networkId] = indexes
		})
	},
})
