import type { Account } from '@radixdlt/radix-dapp-toolkit'
import { useNetworkId } from 'packages/ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore } from 'packages/ui/src/hooks/use-store'
import { useEffect, useState } from 'react'

import { useIsUnlocked } from './use-is-unlocked'
import { useMessageClient } from './use-message-client'

export const useAccounts = (): Account[] => {
	const isUnlocked = useIsUnlocked()
	const networkId = useNetworkId()
	const client = useMessageClient()
	const { indexes, addressBook } = useNoneSharedStore(state => ({
		indexes: state.accountIndexes,
		addressBook: state.addressBook,
	}))

	const [state, setState] = useState<Account[]>([])

	useEffect(() => {
		const load = async () => {
			try {
				const accounts = await client.getAccounts(networkId, indexes, addressBook)
				setState(accounts)
			} catch (err) {
				console.error(err)
				setState([])
			}
		}
		if (isUnlocked) load()
		else setState([])
	}, [isUnlocked, networkId, indexes, addressBook])

	return state
}
