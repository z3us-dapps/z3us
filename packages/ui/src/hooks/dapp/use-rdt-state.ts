import { type WalletData } from '@radixdlt/radix-dapp-toolkit'
import { useEffect, useState } from 'react'

import { useRdt } from './use-rdt'

export const useRdtState = () => {
	const rdt = useRdt()!
	const [state, setState] = useState<WalletData>()

	useEffect(() => {
		const subscription = rdt.walletApi.walletData$.subscribe(s => {
			setState(s)
		})

		return () => {
			subscription.unsubscribe()
		}
	}, [rdt])

	return state
}
