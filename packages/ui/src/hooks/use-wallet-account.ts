import { CARD_COLORS, CARD_IMAGES } from '../constants/account'
import type { AddressBookEntry } from '../store/types'
import { useNetworkId } from './dapp/use-network-id'
import { useRdtState } from './dapp/use-rdt-state'
import { useNoneSharedStore } from './use-store'

export const useWalletAccounts = (): { [key: string]: AddressBookEntry } => {
	const networkId = useNetworkId()
	const { accounts = [] } = useRdtState()

	const { addressBook } = useNoneSharedStore(state => ({
		addressBook: state.addressBook[networkId] || {},
	}))

	return accounts.reduce(
		(ac, account) => ({
			...ac,
			[account.address]: {
				cardImage: CARD_IMAGES[CARD_IMAGES.length % accounts.length],
				cardColor: CARD_COLORS[CARD_COLORS.length % accounts.length],
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
