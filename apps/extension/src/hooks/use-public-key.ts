import type { PublicKey } from '@radixdlt/radix-engine-toolkit'
import { useEffect, useState } from 'react'

import { useSharedStore } from 'ui/src/hooks/use-store'

import { useMessageClient } from './use-message-client'

export const usePublicKey = (index: number): [PublicKey | null, Error | null] => {
	const client = useMessageClient()
	const { keystoreId } = useSharedStore(state => ({
		keystoreId: state.selectedKeystoreId,
	}))

	const [error, setError] = useState<Error | null>(null)
	const [state, setState] = useState<PublicKey | null>(null)

	useEffect(() => {
		const load = async () => {
			try {
				setState(await client.getPublicKey(index))
				setError(null)
			} catch (err) {
				setState(null)
				setError(err)
			}
		}
		load()
	}, [index, keystoreId])

	return [state, error]
}
