import { useMemo } from 'react'

import { CARD_COLORS, CARD_IMAGES } from '../constants/account'
import { useWalletAccounts } from './use-accounts'

export type CardSettings = { cardImage: string; imgClassName: string; cardColor: string; colorClassName: string }

export const useAccountCardSettings = (address: string): CardSettings => {
	const accounts = useWalletAccounts()

	return useMemo(() => {
		const accountsArray = Object.values(accounts)
		const idx = Math.max(
			0,
			accountsArray.findIndex(account => account.address === address),
		)

		const imgClassName = accountsArray[idx].cardImage || Object.keys(CARD_IMAGES)[idx % Object.keys(CARD_IMAGES).length]
		const colorClassName =
			accountsArray[idx]?.cardColor || Object.keys(CARD_COLORS)[idx % Object.keys(CARD_COLORS).length]

		const cardImage = CARD_IMAGES[imgClassName]
		const cardColor = CARD_COLORS[colorClassName]

		return { cardImage, imgClassName, cardColor, colorClassName }
	}, [address, accounts])
}