import type { DataRequestInput } from '@radixdlt/radix-dapp-toolkit'
import { useCallback } from 'react'

import { useRdt } from './use-rdt'

export const useRequestData = (): any => {
	const rdt = useRdt()!

	return useCallback((value: DataRequestInput) => rdt.requestData(value), [rdt])
}
