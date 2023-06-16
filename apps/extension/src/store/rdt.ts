import type { RDTState } from './types'

export const factory = (set): RDTState => ({
	selectedAccount: '',

	selectAccountAction: (address: string) => {
		set(state => {
			state.selectedAccount = address
		})
	},
})
