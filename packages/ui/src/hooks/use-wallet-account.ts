import { useAccounts } from './dapp/use-accounts'
import { useNetworkId } from './dapp/use-network-id'
import { useNoneSharedStore } from './use-store'

export const useWalletAccounts = () => {
	const networkId = useNetworkId()
	const accounts = useAccounts()

	const { addressBook } = useNoneSharedStore(state => ({
		addressBook: state.addressBook[networkId] || {},
	}))

	return accounts.map(account => ({
		dateAdded: Date.now(),
		dateUpdated: Date.now(),
		...addressBook[account.address],
		name: account.label,
		address: account.address,
	}))
}
