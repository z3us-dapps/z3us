import type { RdtState } from '@radixdlt/radix-dapp-toolkit/io/schemas'
import { useEffect, useState } from 'react'

import { useRdt } from './use-rdt'

export const useRdtState = () => {
	const rdt = useRdt()!
	const [state, setState] = useState<RdtState>()

	useEffect(() => {
		const subscription = rdt.state$.subscribe(s => {
			setState(s)
		})

		return () => {
			subscription.unsubscribe()
		}
	}, [])

	return state
}
