import { useCallback } from 'react'

import type { Rdt } from 'ui/src/context/rdt'

import { useRdt } from './use-rdt'

export const useSendTransaction: () => Rdt['sendTransaction'] = () => {
	const rdt = useRdt()!

	return useCallback(rdt.sendTransaction, [rdt])
}
