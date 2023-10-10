import type { Account, ExtensionState, IExtensionStateSetter, Persona } from './types'

const defaultState = {
	radixConnectorEnabled: true,
	personaIndexes: {},
	accountIndexes: {},
	approvedDapps: {},
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

	approveDappAction: (networkId: number, dappAddress: string, persona: string, accounts: string[]) => {
		set(state => {
			const dapps = state.approvedDapps[networkId] || {}
			state.approvedDapps[networkId] = {
				...dapps,
				[dappAddress]: { persona, accounts },
			}
		})
	},

	forgetDappAction: (networkId: number, dappAddress: string) => {
		set(state => {
			const dapps = state.approvedDapps[networkId] || {}
			delete dapps[dappAddress]
			state.approvedDapps[networkId] = dapps
		})
	},
})
