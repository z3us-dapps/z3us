import { useMemo } from 'react'
import { useIntl } from 'react-intl'

import { useBalances } from 'ui/src/hooks/dapp/use-balances'
import { useSelectedAccounts } from 'ui/src/hooks/use-accounts'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import { useResourceType } from 'ui/src/pages/accounts/hooks/use-resource-type'

export enum ChangeStatus {
	Positive = 'positive',
	Negative = 'negative',
	Neutral = 'neutral',
}

export const useTotalBalance = () => {
	const intl = useIntl()
	const resourceType = useResourceType()

	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))

	const selectedAccounts = useSelectedAccounts()

	const { data: balanceData, isLoading } = useBalances(...selectedAccounts)
	const {
		totalValue,
		totalChange,
		fungibleValue,
		fungibleChange,
		nonFungibleValue,
		nonFungibleChange,
		liquidityPoolTokensValue,
		liquidityPoolTokensChange,
		poolUnitsValue,
		poolUnitsChange,
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

	const getChangeStatus = (): ChangeStatus => {
		if (change > 0) {
			return ChangeStatus.Positive
		}
		if (change < 0) {
			return ChangeStatus.Negative
		}
		return ChangeStatus.Neutral
	}

	return {
		isLoading,
		value,
		formattedValue: intl.formatNumber(value, { style: 'currency', currency }),
		change,
		formattedChange: intl.formatNumber(change, { style: 'percent', maximumFractionDigits: 2 }),
		changeStatus: getChangeStatus(),
	}
}
