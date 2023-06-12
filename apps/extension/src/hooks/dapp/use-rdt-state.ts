import { State } from '@radixdlt/radix-dapp-toolkit'
import { useEffect, useState } from 'react'

// https://github.com/radixdlt/radix-dapp-toolkit/blob/develop/examples/rdt/hooks/useRdtState.ts
// import { RdtState } from '@radixdlt/radix-dapp-toolkit/io/schemas'

import { useRdt } from './use-rdt'

export const useRdtState = () => {
	const rdt = useRdt()
	const [state, setState] = useState<State>()

	useEffect(() => {
		const subscription = rdt?.state$.subscribe(s => {
			setState(s)
		})

		return () => {
			subscription?.unsubscribe()
		}
	})

	return state
}
