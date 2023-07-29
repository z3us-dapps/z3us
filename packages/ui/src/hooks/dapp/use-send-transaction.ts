import type { WalletApi } from '@radixdlt/radix-dapp-toolkit'
import { useCallback } from 'react'

import { useRdt } from './use-rdt'

export const useSendTransaction: () => WalletApi['sendTransaction'] = () => {
	const rdt = useRdt()!

	return useCallback(rdt.walletApi.sendTransaction, [rdt])
}
