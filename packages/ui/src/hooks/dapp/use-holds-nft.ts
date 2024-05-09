import { useMemo } from 'react'

import { useBalances } from './use-balances'
import { useNonFungibleLocation } from './use-entity-nft'

export const useHoldsNft = (account: string, nft_resource: string, nft_id: string): boolean => {
	const {
		data: { nonFungibleBalances = [] },
	} = useBalances([account])
	const { data: location } = useNonFungibleLocation(nft_resource, nft_id)

	return useMemo(() => {
		const collection = nonFungibleBalances.find(nft => nft.address === location?.resource_address)
		const vault = collection?.vaults.find(v => v === location?.non_fungible_ids?.[0]?.owning_vault_address)
		return Boolean(vault)
	}, [location, nonFungibleBalances])
}
