import type { AddressBookEntry } from '../store/types'
import { useNetworkId } from './dapp/use-network-id'
import { useNoneSharedStore } from './use-store'
import { useWalletAccounts } from './use-wallet-account'

export const useAddressBook = (): { [key: string]: AddressBookEntry } => {
	const networkId = useNetworkId()
	const accounts = useWalletAccounts()
	const { addressBook } = useNoneSharedStore(state => ({
		addressBook: state.addressBook[networkId] || {},
	}))

	return { ...addressBook, ...accounts }
}
