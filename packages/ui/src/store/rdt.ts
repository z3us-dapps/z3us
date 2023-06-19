import { type IRDTStateSetter, type RDTState } from './types'

export const factory = (set: IRDTStateSetter): RDTState => ({
	selectedAccount: '',

	selectAccountAction: (address: string) => {
		set(state => {
			state.selectedAccount = address
		})
	},
})
