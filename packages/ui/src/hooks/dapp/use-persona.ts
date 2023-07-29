import { useMemo } from 'react'

import { useRdtState } from './use-rdt-state'

export const usePersona = () => {
	const { persona, personaData } = useRdtState()

	return useMemo(
		() =>
			persona?.identityAddress
				? {
						...persona,
						...personaData.reduce((merged, { entry, ...rest }) => ({ ...merged, [entry]: rest }), {}),
				  }
				: null,
		[persona?.identityAddress],
	)
}
