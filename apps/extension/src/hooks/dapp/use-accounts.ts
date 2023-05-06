import { useRdtState } from './use-rdt-state'

export const useAccounts = () => {
	const state = useRdtState()

	return state?.accounts ?? []
}
