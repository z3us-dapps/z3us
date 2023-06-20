import { useCallback } from 'react'

import { useRdt } from './use-rdt'

export const useSendTransaction = (): any => {
	const rdt = useRdt()!

	return useCallback((transactionManifest: string) => rdt.sendTransaction({ transactionManifest, version: 1 }), [rdt])
}
