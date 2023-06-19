// @ts-nocheck
// TODO: fix ts
import { useAccounts } from './dapp/use-accounts'
import { useNoneSharedStore } from './use-store'

export const useWalletAccounts = () => {
	const accounts = useAccounts()

	const { addressBook } = useNoneSharedStore(state => ({
		addressBook: state.addressBook,
	}))

	return accounts.map(account => ({
		dateAdded: Date.now(),
		dateUpdated: Date.now(),
		...addressBook[account.address],
		name: account.label,
		address: account.address,
	}))
}
