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
		totalXrdValue = 0,
		totalValue = 0,
		totalChange = 0,
		fungibleXrdValue = 0,
		fungibleValue = 0,
		fungibleChange = 0,
		nonFungibleXrdValue = 0,
		nonFungibleValue = 0,
		nonFungibleChange = 0,
		liquidityPoolTokensXrdValue = 0,
		liquidityPoolTokensValue = 0,
		liquidityPoolTokensChange = 0,
		poolUnitsXrdValue = 0,
		poolUnitsValue = 0,
		poolUnitsChange = 0,
	} = balanceData || {}

	const value = useMemo(() => {
		if (resourceType === 'nfts') return nonFungibleValue
		if (resourceType === 'tokens') return fungibleValue
		if (resourceType === 'lp-tokens') return liquidityPoolTokensValue
		if (resourceType === 'pool-units') return poolUnitsValue
		return totalValue
	}, [resourceType, totalValue, nonFungibleValue, fungibleValue, liquidityPoolTokensValue, poolUnitsValue])

	const change = useMemo(() => {
		if (resourceType === 'nfts') return nonFungibleChange
		if (resourceType === 'tokens') return fungibleChange
		if (resourceType === 'lp-tokens') return liquidityPoolTokensChange
		if (resourceType === 'pool-units') return poolUnitsChange
		return totalChange
	}, [resourceType, totalChange, nonFungibleChange, fungibleChange, liquidityPoolTokensChange, poolUnitsChange])

	const xrdValue = useMemo(() => {
		if (resourceType === 'nfts') return nonFungibleXrdValue
		if (resourceType === 'tokens') return fungibleXrdValue
		if (resourceType === 'lp-tokens') return liquidityPoolTokensXrdValue
		if (resourceType === 'pool-units') return poolUnitsXrdValue
		return totalXrdValue
	}, [
		resourceType,
		totalXrdValue,
		fungibleXrdValue,
		nonFungibleXrdValue,
		liquidityPoolTokensXrdValue,
		poolUnitsXrdValue,
	])

	return {
		isLoading,
		xrdValue,
		value,
		change,
		formattedXrdValue: intl.formatNumber(xrdValue, { style: 'decimal', maximumFractionDigits: 8 }),
		formattedValue: intl.formatNumber(value, { style: 'currency', currency }),
		formattedChange: intl.formatNumber(change, { style: 'percent', maximumFractionDigits: 2 }),
	}
}
