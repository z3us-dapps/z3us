import { useMemo } from 'react'

import { CARD_COLORS } from '../constants/account'
import type { AccountSkin } from '../store/types'
import { useBalances } from './dapp/use-balances'
import { useNonFungibleLocation } from './dapp/use-entity-nft'
import { useWalletAccounts } from './use-accounts'

export type CardSettings = { skin: AccountSkin; cardColor: string; colorClassName: string }

export const useAccountCardSettings = (address: string): CardSettings => {
	const accounts = useWalletAccounts()
	const { nonFungibleBalances = [] } = useBalances([address])
	const { data: location } = useNonFungibleLocation(
		accounts[address]?.skin?.collection,
		accounts[address]?.skin?.non_fungible_id,
	)

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

		const collection = nonFungibleBalances.find(nft => nft.address === location?.resource_address)
		const vault = collection?.vaults.find(v => v === location?.non_fungible_ids?.[0]?.owning_vault_address)
		const holdsNFT = Boolean(vault)
		const skin = holdsNFT ? accounts[address]?.skin : null

		return { cardColor, colorClassName, skin }
	}, [address, accounts, location, nonFungibleBalances])
}
