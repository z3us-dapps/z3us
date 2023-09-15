import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { CARD_COLORS, CARD_IMAGES } from '../constants/account'
import type { AddressBookEntry } from '../store/types'
import { useNetworkId } from './dapp/use-network-id'
import { useRdtState } from './rdt/use-rdt-state'
import { useNoneSharedStore } from './use-store'
import { useZdtState } from './zdt/use-zdt'

export const useSelectedAccounts = (): string[] => {
	const { accountId = '-' } = useParams()
	const { accounts: rdtAccounts = [] } = useRdtState()
	const { accounts: zdtAccounts = [] } = useZdtState()

	const accounts = useMemo(() => [...(rdtAccounts || []), ...(zdtAccounts || [])], [rdtAccounts, zdtAccounts])

	return useMemo(
		() => accounts?.map(({ address }) => address).filter(address => accountId === '-' || accountId === address),
		[accountId, accounts],
	)
}

export const useWalletAccounts = (): { [key: string]: AddressBookEntry } => {
	const networkId = useNetworkId()
	const { accounts: rdtAccounts = [] } = useRdtState()
	const { accounts: zdtAccounts = [] } = useZdtState()

	const accounts = useMemo(() => [...(rdtAccounts || []), ...(zdtAccounts || [])], [rdtAccounts, zdtAccounts])

	const { addressBook } = useNoneSharedStore(state => ({
		addressBook: state.addressBook[networkId] || {},
	}))

	return accounts.reduce(
		(ac, account, idx) => ({
			...ac,
			[account.address]: {
				cardImage: CARD_IMAGES[CARD_IMAGES.length % idx],
				cardColor: CARD_COLORS[CARD_COLORS.length % idx],
				dateAdded: Date.now(),
				dateUpdated: Date.now(),
				...addressBook[account.address],
				name: account.label,
				address: account.address,
			} as AddressBookEntry,
		}),
		{},
	)
}
