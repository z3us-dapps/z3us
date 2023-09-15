import type { Persona } from '@radixdlt/radix-dapp-toolkit'
import { useNetworkId } from 'packages/ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore } from 'packages/ui/src/hooks/use-store'
import { useEffect, useState } from 'react'

import { useIsUnlocked } from './use-is-unlocked'
import { useMessageClient } from './use-message-client'

export const usePersonas = (): Persona[] => {
	const isUnlocked = useIsUnlocked()
	const networkId = useNetworkId()
	const client = useMessageClient()
	const { indexes } = useNoneSharedStore(state => ({
		indexes: state.personaIndexes,
	}))

	const [state, setState] = useState<Persona[]>([])

	useEffect(() => {
		const load = async () => {
			try {
				setState(await client.getPersonas(networkId, indexes))
			} catch (err) {
				console.error(err)
				setState([])
			}
		}
		if (isUnlocked) load()
		else setState([])
	}, [isUnlocked, networkId, indexes])

	return state
}
