import type { Account, Persona, SendTransactionInput } from '@radixdlt/radix-dapp-toolkit'
import { TransactionStatus } from '@radixdlt/radix-dapp-toolkit'
import React, { type PropsWithChildren, useMemo } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import type { State } from 'ui/src/context/zdt'
import { ZdtContext } from 'ui/src/context/zdt'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'

import { useIsUnlocked } from '@src/hooks/use-is-unlocked'
import { useMessageClient } from '@src/hooks/use-message-client'
import { useSendTransaction } from '@src/hooks/use-send-transaction'

const messages = defineMessages({
	unknown_account: {
		id: 'zdt_provider.unknown_account',
		defaultMessage: 'Account: {appearanceId}',
	},
	unknown_persona: {
		id: 'zdt_provider.unknown_persona',
		defaultMessage: 'Persona: {appearanceId}',
	},
})

export const ZdtProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const intl = useIntl()
	const client = useMessageClient()
	const { isUnlocked } = useIsUnlocked()
	const networkId = useNetworkId()
	const sendTransaction = useSendTransaction()
	const { accountIndexes, personaIndexes, addressBook } = useNoneSharedStore(state => ({
		accountIndexes: state.accountIndexes[networkId] || {},
		personaIndexes: state.personaIndexes[networkId] || {},
		addressBook: state.addressBook[networkId] || {},
	}))

	const accounts = useMemo<Account[]>(
		() =>
			Object.keys(accountIndexes).map((idx, appearanceId) => ({
				address: accountIndexes[idx].address,
				label:
					addressBook[accountIndexes[idx].address]?.name ||
					intl.formatMessage(messages.unknown_account, { appearanceId }),
				appearanceId,
			})),
		[accountIndexes, addressBook],
	)

	const personas = useMemo<Persona[]>(
		() =>
			Object.keys(personaIndexes).map((idx, appearanceId) => ({
				identityAddress: personaIndexes[idx].identityAddress,
				label: personaIndexes[idx].label || intl.formatMessage(messages.unknown_persona, { appearanceId }),
				appearanceId,
			})),
		[personaIndexes],
	)

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
		[isUnlocked, personas, accounts, sendTransaction],
	)

	return <ZdtContext.Provider value={ctx}>{children}</ZdtContext.Provider>
}
