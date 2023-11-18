import { type WalletData } from '@radixdlt/radix-dapp-toolkit'
import { useEffect, useState } from 'react'

import { useRdt } from './use-rdt'

export const useRdtState = (): WalletData => {
	const rdt = useRdt()!
	const [state, setState] = useState<WalletData>()

	useEffect(() => {
		if (!rdt) return () => {}

		const subscription = rdt.walletApi.walletData$.subscribe(s => {
			setState(s)
		})

		return () => {
			subscription.unsubscribe()
		}
	}, [rdt])

	return (state || {}) as WalletData
}
