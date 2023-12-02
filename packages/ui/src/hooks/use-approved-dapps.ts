import { useMemo } from 'react'

import type { ApprovedDapps } from '../store/types'
import { useNetworkId } from './dapp/use-network-id'
import { useNoneSharedStore } from './use-store'

export const useApprovedDapps = (): ApprovedDapps => {
	const networkId = useNetworkId()
	const { approvedDapps } = useNoneSharedStore(state => ({
		approvedDapps: state.approvedDapps[networkId],
	}))

	return useMemo(() => approvedDapps || {}, [approvedDapps])
}
