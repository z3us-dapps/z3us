import { useRdtState } from './use-rdt-state'

export const useConnected = () => {
	const { connected } = useRdtState()
	return connected
}
