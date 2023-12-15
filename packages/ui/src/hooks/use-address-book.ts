import { useMemo } from 'react'

import type { AddressBookEntry } from '../store/types'
import { useNetworkId } from './dapp/use-network'
import { useWalletAccounts } from './use-accounts'
import { useNoneSharedStore } from './use-store'

export const useAddressBook = (): { [key: string]: AddressBookEntry } => {
	const networkId = useNetworkId()
	const { addressBook } = useNoneSharedStore(state => ({
		addressBook: state.addressBook[networkId],
	}))

	return useMemo(() => addressBook || {}, [addressBook])
}

export const useAddressBookWithAccounts = (): { [key: string]: AddressBookEntry } => {
	const accounts = useWalletAccounts()
	const addressBook = useAddressBook()

	return { ...addressBook, ...accounts }
}
