import { useRdtState } from './use-rdt-state'

export const useConnected = () => {
	const { persona } = useRdtState()
	return !!persona
}
