import type { AddressBookEntry } from '../store/types'
import { useNetworkId } from './dapp/use-network-id'
import { useWalletAccounts } from './use-accounts'
import { useNoneSharedStore } from './use-store'

export const useAddressBook = (): { [key: string]: AddressBookEntry } => {
	const networkId = useNetworkId()
	const accounts = useWalletAccounts()
	const { addressBook } = useNoneSharedStore(state => ({
		addressBook: state.addressBook[networkId] || {},
	}))

	return { ...addressBook, ...accounts }
}
