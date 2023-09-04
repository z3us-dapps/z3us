import type {
	FungibleResourcesCollectionItemVaultAggregated,
	NonFungibleResourcesCollectionItemVaultAggregated,
} from '@radixdlt/radix-dapp-toolkit'
import BigNumber from 'bignumber.js'
import { useMemo } from 'react'

import { useXRDPriceOnDay } from 'ui/src/hooks/queries/market'
import { useTokens } from 'ui/src/hooks/queries/oci'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import { getStringMetadata } from 'ui/src/services/metadata'
import type { Token } from 'ui/src/services/swap/oci'
import { type ResourceBalance, ResourceBalanceType } from 'ui/src/types/types'

import { useEntitiesDetails } from './use-entity-details'

const transformFungibleResourceItemResponse =
	(xrdPrice: number, tokens: { [key: string]: Token }) =>
	(
		container: { [address: string]: ResourceBalance },
		item: FungibleResourcesCollectionItemVaultAggregated,
	): { [address: string]: ResourceBalance } => {
		const name = getStringMetadata('name', item.explicit_metadata?.items)
		const symbol = getStringMetadata('symbol', item.explicit_metadata?.items)
		const description = getStringMetadata('description', item.explicit_metadata?.items)
		const imageUrl = getStringMetadata('icon_url', item.explicit_metadata?.items)
		const url = getStringMetadata('info_url', item.explicit_metadata?.items)
		const validator = getStringMetadata('validator', item.explicit_metadata?.items)

		const amount = item.vaults.items.reduce(
			(acc, curr) => acc.plus(new BigNumber(curr.amount)),
			container[item.resource_address]?.amount || new BigNumber(0),
		)

		let tokenKey = symbol?.toUpperCase()
		if (!tokenKey && validator) tokenKey = 'XRD'
		const token = tokens[tokenKey] || null

		container[item.resource_address] = {
			type: ResourceBalanceType.FUNGIBLE,
			address: item.resource_address,
			validator,
			amount,
			value: amount.multipliedBy(new BigNumber(token?.price.xrd || 0)).multipliedBy(xrdPrice),
			symbol,
			name,
			description,
			url,
			imageUrl,
			change: new BigNumber(token ? +(token.price.usd || 0) / +(token.price.usd_24h || 0) : 0),
		}
		return container
	}

const transformNonFungibleResourceItemResponse =
	(owner: string) =>
	(
		container: { [address: string]: ResourceBalance },
		item: NonFungibleResourcesCollectionItemVaultAggregated,
	): { [address: string]: ResourceBalance } => {
		const name = getStringMetadata('name', item.explicit_metadata?.items)
		const description = getStringMetadata('description', item.explicit_metadata?.items)
		const imageUrl = getStringMetadata('icon_url', item.explicit_metadata?.items)
		const url = getStringMetadata('info_url', item.explicit_metadata?.items)

		const amount = new BigNumber(item.vaults.items[0].total_count).plus(container[item.resource_address]?.amount || 0)

		container[item.resource_address] = {
			type: ResourceBalanceType.NON_FUNGIBLE,
			address: item.resource_address,
			vaultAddress: item.vaults.items[0].vault_address,
			ownerAddress: owner,
			amount,
			name,
			description,
			url,
			imageUrl,
			value: new BigNumber(0),
			change: new BigNumber(0),
		}

		return container
	}

export const useBalances = (...addresses: string[]) => {
	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))
	const { data: xrdPrice, isLoading: isLoadingPrice } = useXRDPriceOnDay(currency, new Date())
	const { data: tokens, isLoading: isLoadingTokens } = useTokens()
	const { data: accounts = [], isLoading: isLoadingAccounts } = useEntitiesDetails(
		addresses.filter(address => !!address),
	)

	const response = useMemo(() => {
		let fungible: { [address: string]: ResourceBalance } = {}
		let nonFungible: { [address: string]: ResourceBalance } = {}
		accounts.forEach(({ address, fungible_resources, non_fungible_resources }) => {
			fungible = fungible_resources.items.reduce(transformFungibleResourceItemResponse(xrdPrice, tokens), fungible)
			nonFungible = non_fungible_resources.items.reduce(transformNonFungibleResourceItemResponse(address), nonFungible)
		})

		const fungibleBalances = Object.values(fungible)
		const fungibleValue = fungibleBalances.reduce((total, balance) => total.plus(balance.amount), new BigNumber(0))
		const fungibleChange = fungibleBalances.reduce(
			(change, balance) => change.plus(balance.change.div(fungibleValue.dividedBy(balance.value))),
			new BigNumber(0),
		)

		const nonFungibleBalances = Object.values(nonFungible)
		const nonFungibleValue = nonFungibleBalances.reduce(
			(total, balance) => total.plus(balance.amount),
			new BigNumber(0),
		)
		const nonFungibleChange = nonFungibleBalances.reduce(
			(change, balance) => change.plus(balance.change.div(nonFungibleValue.dividedBy(balance.value))),
			new BigNumber(0),
		)

		const balances = [...fungibleBalances, ...nonFungibleBalances]
		const totalValue = fungibleValue.plus(nonFungibleValue)
		const totalChange = balances.reduce(
			(change, balance) => change.plus(balance.change.div(totalValue.dividedBy(balance.value))),
			new BigNumber(0),
		)

		return {
			balances,
			fungibleBalances: Object.values(fungible),
			nonFungibleBalances: Object.values(nonFungible),
			totalValue,
			fungibleValue,
			nonFungibleValue,
			totalChange,
			fungibleChange,
			nonFungibleChange,
		}
	}, [accounts, xrdPrice, tokens])

	return {
		...response,
		isLoading: isLoadingAccounts || isLoadingTokens || isLoadingPrice,
	}
}
