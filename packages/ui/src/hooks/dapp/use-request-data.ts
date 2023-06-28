import { useCallback } from 'react'

import type { Rdt } from 'ui/src/context/rdt'

import { useRdt } from './use-rdt'

export const useRequestData: () => Rdt['requestData'] = () => {
	const rdt = useRdt()!

	return useCallback(rdt.requestData, [rdt])
}
