import { useMemo } from 'react'

import { CARD_COLORS } from '../constants/account'
import type { AccountSkin } from '../store/types'
import { useWalletAccounts } from './use-accounts'

export type CardSettings = { skin?: AccountSkin; cardColor: string; colorClassName: string }

export const useAccountCardSettings = (address: string): CardSettings => {
	const accounts = useWalletAccounts()

	return useMemo(() => {
		const accountsArray = Object.values(accounts)
		const idx = Math.max(
			0,
			accountsArray.findIndex(account => account.address === address),
		)

		const colorClassName =
			(CARD_COLORS[accountsArray[idx]?.cardColor] ? accountsArray[idx]?.cardColor : undefined) ||
			Object.keys(CARD_COLORS)[idx % Object.keys(CARD_COLORS).length]
		const cardColor = CARD_COLORS[colorClassName]

		return { cardColor, colorClassName, skin: accounts[address]?.skin }
	}, [address, accounts])
}
