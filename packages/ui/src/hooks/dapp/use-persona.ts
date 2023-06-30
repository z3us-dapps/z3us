import { useMemo } from 'react'

import { useRdtState } from './use-rdt-state'

export const usePersona = () => {
	const { walletData } = useRdtState()

	return useMemo(
		() =>
			walletData.persona?.identityAddress
				? {
						...walletData.persona,
						...walletData.personaData.reduce((merged, { field, value }) => ({ ...merged, [field]: value }), {}),
				  }
				: null,
		[walletData.persona?.identityAddress],
	)
}
