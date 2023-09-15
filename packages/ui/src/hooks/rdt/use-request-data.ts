import type { WalletApi } from '@radixdlt/radix-dapp-toolkit'
import { useCallback } from 'react'

import { useRdt } from './use-rdt'

export const useRequestData: () => WalletApi['sendRequest'] = () => {
	const rdt = useRdt()!

	return useCallback<typeof rdt.walletApi.sendRequest>(rdt.walletApi.sendRequest, [rdt])
}
