import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { CARD_COLORS, CARD_IMAGES } from '../constants/account'
import { type AddressBookEntry, KeystoreType } from '../store/types'
import { useNetworkId } from './dapp/use-network-id'
import { useRdtState } from './rdt/use-rdt-state'
import { useNoneSharedStore, useSharedStore } from './use-store'
import { useZdtState } from './zdt/use-zdt'

export const useSelectedAccounts = (): string[] => {
	const { accountId = '-' } = useParams()
	const { accounts: zdtAccounts = [] } = useZdtState()
	const { accounts: rdtAccounts = [] } = useRdtState()
	const { keystore } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
	}))

	const accounts = useMemo(
		() => (keystore?.type !== KeystoreType.RADIX_WALLET ? zdtAccounts : rdtAccounts),
		[keystore, rdtAccounts, zdtAccounts],
	)

	return useMemo(
		() => (accountId === '-' ? accounts.map(({ address }) => address) : [accountId]),
		[accountId, accounts],
	)
}

export const useWalletAccounts = (): { [key: string]: AddressBookEntry } => {
	const networkId = useNetworkId()
	const { accounts: zdtAccounts = [] } = useZdtState()
	const { accounts: rdtAccounts = [] } = useRdtState()
	const { keystore } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
	}))

	const accounts = useMemo(
		() => (keystore?.type !== KeystoreType.RADIX_WALLET ? zdtAccounts : rdtAccounts),
		[keystore, rdtAccounts, zdtAccounts],
	)

	const { addressBook } = useNoneSharedStore(state => ({
		addressBook: state.addressBook[networkId],
	}))

	return accounts.reduce(
		(ac, account, idx) => ({
			...ac,
			[account.address]: {
				cardImage: Object.keys(CARD_IMAGES)[idx % Object.keys(CARD_IMAGES).length],
				cardColor: Object.keys(CARD_COLORS)[idx % Object.keys(CARD_COLORS).length],
				dateAdded: Date.now(),
				dateUpdated: Date.now(),
				...(addressBook?.[account.address] || {}),
				name: account.label,
				address: account.address,
			} as AddressBookEntry,
		}),
		{},
	)
}
