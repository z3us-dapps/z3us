import { SendTransactionInput, TransactionStatus } from '@radixdlt/radix-dapp-toolkit'
import React, { type PropsWithChildren, useMemo } from 'react'

import type { State } from 'ui/src/context/zdt'
import { ZdtContext } from 'ui/src/context/zdt'

import { useAccounts } from '@src/hooks/use-accounts'
import { useIsUnlocked } from '@src/hooks/use-is-unlocked'
import { useMessageClient } from '@src/hooks/use-message-client'
import { usePersonas } from '@src/hooks/use-personas'
import { useSendTransaction } from '@src/hooks/use-send-transaction'

export const ZdtProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const client = useMessageClient()
	const { isUnlocked } = useIsUnlocked()
	const personas = usePersonas()
	const accounts = useAccounts()
	const sendTransaction = useSendTransaction()

	const ctx = useMemo(
		() =>
			({
				isWallet: true,
				isUnlocked,
				accounts,
				personas,
				sendTransaction: async (input: SendTransactionInput) => {
					const transactionIntentHash = await sendTransaction(input)
					return {
						transactionIntentHash,
						status: TransactionStatus.Unknown,
					}
				},
				unlock: client.unlockVault,
				lock: client.lockVault,
			} as State),
		[personas, accounts],
	)

	return <ZdtContext.Provider value={ctx}>{children}</ZdtContext.Provider>
}
