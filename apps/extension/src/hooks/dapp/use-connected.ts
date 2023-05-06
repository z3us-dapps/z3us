import { useRdtState } from './use-rdt-state'

export const useConnected = () => {
	const state = useRdtState()

	return state?.connected ?? false
}
