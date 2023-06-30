import { useRdtState } from './use-rdt-state'

export const useConnected = () => {
	const { connected = false } = useRdtState()!

	return connected
}
