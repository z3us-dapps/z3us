import { type IRdtStateSetter, type RdtState } from './types'

export const factory = (set: IRdtStateSetter): RdtState => ({
	selectedAccount: '',

	selectAccountAction: (address: string) => {
		set(state => {
			state.selectedAccount = address
		})
	},
})
