import type { WalletApi } from '@radixdlt/radix-dapp-toolkit'
import { useCallback } from 'react'

import { useRdt } from './use-rdt'

export const useRequestData: () => WalletApi['sendRequest'] = () => {
	const rdt = useRdt()!

	return useCallback(rdt.walletApi.sendRequest, [rdt])
}
