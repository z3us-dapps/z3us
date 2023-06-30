import { useRdtState } from './use-rdt-state'

export const usePersona = () => {
	const { walletData } = useRdtState()!

	if (walletData)
		return {
			...walletData.persona,
			...walletData.personaData.reduce((merged, { field, value }) => ({ ...merged, [field]: value }), {}),
		}

	return null
}
