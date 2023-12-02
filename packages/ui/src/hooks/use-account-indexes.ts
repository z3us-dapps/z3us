import { useMemo } from 'react'

import type { Accounts } from '../store/types'
import { useNetworkId } from './dapp/use-network-id'
import { useNoneSharedStore } from './use-store'

export const useAccountIndexes = (): Accounts => {
	const networkId = useNetworkId()
	const { accountIndexes } = useNoneSharedStore(state => ({
		accountIndexes: state.accountIndexes[networkId],
	}))

	return useMemo(() => accountIndexes || {}, [accountIndexes])
}
