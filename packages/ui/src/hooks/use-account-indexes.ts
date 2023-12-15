import { useMemo } from 'react'

import { useNetworkId } from 'ui/src/hooks/dapp/use-network'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import type { Accounts } from 'ui/src/store/types'

export const useAccountIndexes = (): Accounts => {
	const networkId = useNetworkId()
	const { accountIndexes } = useNoneSharedStore(state => ({
		accountIndexes: state.accountIndexes[networkId],
	}))

	return useMemo(() => accountIndexes || {}, [accountIndexes])
}
