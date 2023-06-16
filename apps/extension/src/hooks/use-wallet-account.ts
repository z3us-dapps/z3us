import { useEffect, useState } from 'react'

import type { AddressBookEntry } from '@src/store/types'

import { useAccounts } from './dapp/use-accounts'
import { useNoneSharedStore } from './use-store'

export const useWalletAccounts = () => {
	const accounts = useAccounts()
	const [walletAccounts, setAccounts] = useState<Array<AddressBookEntry>>([])

	const { addressBook } = useNoneSharedStore(state => ({
		addressBook: state.addressBook,
	}))

	useEffect(() => {
		const accountsMap = new Map(accounts.map(account => [account.address, account]))
		const accountsFromAddressBook = [...Object.values<AddressBookEntry>(addressBook)].filter(
			v => !!accountsMap[v.address],
		)

		setAccounts(accountsFromAddressBook)
	}, [accounts.length])

	return walletAccounts
}
