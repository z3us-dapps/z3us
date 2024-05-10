import type { Account, Persona } from '@radixdlt/radix-dapp-toolkit'
import React, { type PropsWithChildren, useCallback, useMemo } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import browser from 'webextension-polyfill'

import type { State } from 'ui/src/context/zdt'
import { ZdtContext } from 'ui/src/context/zdt'
import { useAccountIndexes } from 'ui/src/hooks/use-account-indexes'
import { useAddressBook } from 'ui/src/hooks/use-address-book'
import { usePersonaIndexes } from 'ui/src/hooks/use-persona-indexes'
import { useSharedStore } from 'ui/src/hooks/use-store'

import { usePasswordModal } from '@src/hooks/modal/use-password-modal'
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

const openSidePanel = async () => {
	if (chrome?.sidePanel) {
		const [tab] = await browser.tabs.query({ active: true, currentWindow: true })
		await (chrome.sidePanel as any).open({ windowId: tab?.windowId })
	} else {
		await browser.sidebarAction.open()
	}
}

export const ZdtProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const intl = useIntl()
	const client = useMessageClient()
	const confirm = usePasswordModal()
	const sendTransaction = useSendTransaction()
	const buildNewPersonKeyParts = useBuildNewPersonKeyParts()
	const buildNewAccountKeyParts = useBuildNewAccountKeyParts()
	const { isUnlocked } = useIsUnlocked()
	const { keystore, removeKeystore } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
		removeKeystore: state.removeKeystoreAction,
	}))
	const personaIndexes = usePersonaIndexes()
	const accountIndexes = useAccountIndexes()
	const addressBook = useAddressBook()

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

	const removeSecret = useCallback(
		async (password: string) => {
			await client.removeFromVault(keystore, password)
			removeKeystore(keystore.id)
			await client.lockVault()
		},
		[client, keystore, removeKeystore],
	)

	const unlock = useCallback(async (password: string) => client.unlockVault(keystore, password), [client, keystore])

	const lock = useCallback(async () => client.lockVault(), [client])

	const getSecret = useCallback(
		async (combinedKeystoreId: string, password: string) => client.getSecret(keystore, combinedKeystoreId, password),
		[client, keystore],
	)

	const ctx = useMemo(
		() =>
			({
				isWallet: true,
				isUnlocked,
				accounts,
				personas,
				confirm,
				sendTransaction,
				unlock,
				lock: client.lockVault,
				openSidePanel,
				getSecret,
				removeSecret,
				buildNewPersonKeyParts,
				buildNewAccountKeyParts,
			} as State),
		[
			isUnlocked,
			personas,
			accounts,
			confirm,
			sendTransaction,
			unlock,
			lock,
			getSecret,
			buildNewPersonKeyParts,
			buildNewAccountKeyParts,
		],
	)

	return <ZdtContext.Provider value={ctx}>{children}</ZdtContext.Provider>
}
