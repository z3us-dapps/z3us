import { useMemo } from 'react'

import { CARD_COLORS } from '../constants/account'
import type { AccountSkin, AddressBookEntry } from '../store/types'
import { useWalletAccounts } from './use-accounts'

export type CardSettings = { skin?: AccountSkin; cardColor: string; colorClassName: string }

export const useAccountCardSettings = (address: string): AddressBookEntry & CardSettings => {
	const accounts = useWalletAccounts()

	return useMemo(() => {
		const account = accounts[address]
		const accountsArray = Object.values(accounts)
		const idx = Math.max(
			0,
			accountsArray.findIndex(a => a.address === address),
		)

		const colorClassName =
			(CARD_COLORS[account?.cardColor] ? account?.cardColor : undefined) ||
			Object.keys(CARD_COLORS)[idx % Object.keys(CARD_COLORS).length]
		const cardColor = CARD_COLORS[colorClassName]

		return { ...account, cardColor, colorClassName }
	}, [address, accounts])
}
