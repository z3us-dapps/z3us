import { useMemo } from 'react'
import { useIntl } from 'react-intl'

import { useBalances } from 'ui/src/hooks/dapp/use-balances'
import { useSelectedAccounts } from 'ui/src/hooks/use-accounts'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import { useResourceType } from 'ui/src/pages/accounts/hooks/use-resource-type'

export const useTotalBalance = () => {
	const intl = useIntl()
	const resourceType = useResourceType()

	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))

	const selectedAccounts = useSelectedAccounts()

	const { data: balanceData, isLoading } = useBalances(...selectedAccounts)
	const {
		totalValue = 0,
		totalChange = 0,
		fungibleValue = 0,
		fungibleChange = 0,
		nonFungibleValue = 0,
		nonFungibleChange = 0,
		liquidityPoolTokensValue = 0,
		liquidityPoolTokensChange = 0,
		poolUnitsValue = 0,
		poolUnitsChange = 0,
	} = balanceData || {}

	const value = useMemo(() => {
		if (resourceType === 'nfts') return nonFungibleValue
		if (resourceType === 'tokens') return fungibleValue
		if (resourceType === 'lp-tokens') return liquidityPoolTokensValue
		if (resourceType === 'pool-units') return poolUnitsValue
		return totalValue
	}, [resourceType, totalValue, fungibleValue, nonFungibleValue])

	const change = useMemo(() => {
		if (resourceType === 'nfts') return nonFungibleChange
		if (resourceType === 'tokens') return fungibleChange
		if (resourceType === 'lp-tokens') return liquidityPoolTokensChange
		if (resourceType === 'pool-units') return poolUnitsChange
		return totalChange
	}, [resourceType, totalValue, fungibleValue, nonFungibleValue])

	return {
		isLoading,
		value,
		change,
		formattedValue: intl.formatNumber(value, { style: 'currency', currency }),
		formattedChange: intl.formatNumber(change, { style: 'percent', maximumFractionDigits: 2 }),
	}
}
