import { useMemo } from 'react'

import type { Personas } from '../store/types'
import { useNetworkId } from './dapp/use-network'
import { useNoneSharedStore } from './use-store'

export const usePersonaIndexes = (): Personas => {
	const networkId = useNetworkId()
	const { personaIndexes } = useNoneSharedStore(state => ({
		personaIndexes: state.personaIndexes[networkId],
	}))

	return useMemo(() => personaIndexes || {}, [personaIndexes])
}
