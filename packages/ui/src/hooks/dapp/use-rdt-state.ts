import { type RdtState, rdtStateDefault } from '@radixdlt/radix-dapp-toolkit'
import { useEffect, useState } from 'react'

import { useRdt } from './use-rdt'

export const useRdtState = () => {
	const rdt = useRdt()!
	const [state, setState] = useState<RdtState>(rdtStateDefault)

	useEffect(() => {
		const subscription = rdt.state$.subscribe(s => {
			setState(s)
		})

		return () => {
			subscription.unsubscribe()
		}
	}, [rdt])

	return state
}
