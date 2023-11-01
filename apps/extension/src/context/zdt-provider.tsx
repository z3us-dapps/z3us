import type { Account, Persona } from '@radixdlt/radix-dapp-toolkit'
import React, { type PropsWithChildren, useMemo } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import type { State } from 'ui/src/context/zdt'
import { ZdtContext } from 'ui/src/context/zdt'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'

import { useSendTransaction } from '@src/hooks/transaction/use-send'
import { useBuildNewAccountKeyParts } from '@src/hooks/use-add-account'
import { useBuildNewPersonKeyParts } from '@src/hooks/use-add-persona'
import { useIsUnlocked } from '@src/hooks/use-is-unlocked'
import { useMessageClient } from '@src/hooks/use-message-client'

const messages = defineMessages({
	unknown_account: {
		id: 'OHbvwh',
		defaultMessage: 'Account: {appearanceId}',
	},
	unknown_persona: {
		id: 'WFhJdj',
		defaultMessage: `{hasLabel, select,
			true {{label}}
			other {Persona: {appearanceId}}
		}`,
	},
})

export const ZdtProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const intl = useIntl()
	const networkId = useNetworkId()
	const client = useMessageClient()
	const sendTransaction = useSendTransaction()
	const buildNewPersonKeyParts = useBuildNewPersonKeyParts()
	const buildNewAccountKeyParts = useBuildNewAccountKeyParts()
	const { isUnlocked } = useIsUnlocked()
	const { accountIndexes, personaIndexes, addressBook } = useNoneSharedStore(state => ({
		accountIndexes: state.accountIndexes[networkId] || {},
		personaIndexes: state.personaIndexes[networkId] || {},
		addressBook: state.addressBook[networkId] || {},
	}))

	const accounts = useMemo<Account[]>(
		() =>
			Object.keys(accountIndexes).map((address, appearanceId) => ({
				address,
				label: addressBook[address]?.name || intl.formatMessage(messages.unknown_account, { appearanceId }),
				appearanceId,
			})),
		[accountIndexes, addressBook],
	)

	const personas = useMemo<Persona[]>(
		() =>
			Object.keys(personaIndexes).map((address, appearanceId) => ({
				identityAddress: address,
				label: intl.formatMessage(messages.unknown_persona, {
					hasLabel: !!personaIndexes[address].label,
					label: personaIndexes[address].label,
					appearanceId,
				}),
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
				sendTransaction,
				unlock: client.unlockVault,
				lock: client.lockVault,
				getSecret: client.getSecret,
				buildNewPersonKeyParts,
				buildNewAccountKeyParts,
			} as State),
		[isUnlocked, personas, accounts, sendTransaction],
	)

	return <ZdtContext.Provider value={ctx}>{children}</ZdtContext.Provider>
}
