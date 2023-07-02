import type { AddressBookEntry } from '../store/types'
import { useNetworkId } from './dapp/use-network-id'
import { useRdtState } from './dapp/use-rdt-state'
import { useNoneSharedStore } from './use-store'

export const useWalletAccounts = (): { [key: string]: AddressBookEntry } => {
	const networkId = useNetworkId()
	const { walletData } = useRdtState()

	const { addressBook } = useNoneSharedStore(state => ({
		addressBook: state.addressBook[networkId] || {},
	}))

	return walletData.accounts.reduce(
		(ac, account) => ({
			...ac,
			[account.address]: {
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