import type { State } from 'packages/ui/src/context/zdt'
import { ZdtContext } from 'packages/ui/src/context/zdt'
import React, { type PropsWithChildren, useMemo } from 'react'

import { useAccounts } from '@src/hooks/use-accounts'
import { useIsUnlocked } from '@src/hooks/use-is-unlocked'
import { useMessageClient } from '@src/hooks/use-message-client'
import { usePersonas } from '@src/hooks/use-personas'

export const ZdtProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const client = useMessageClient()
	const isUnlocked = useIsUnlocked()
	const personas = usePersonas()
	const accounts = useAccounts()

	const ctx = useMemo(
		() =>
			({
				isWallet: true,
				isUnlocked,
				accounts,
				personas,
				sendTransaction: () => {
					throw Error('Not implemented!')
				},
				unlock: client.unlockVault,
				lock: client.lockVault,
			} as State),
		[personas, accounts],
	)

	return <ZdtContext.Provider value={ctx}>{children}</ZdtContext.Provider>
}
