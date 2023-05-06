import { useRdtState } from './use-rdt-state'

export const usePersona = () => {
	const state = useRdtState()

	return state?.persona
}
