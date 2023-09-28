import BigNumber from 'bignumber.js'
import { useMemo } from 'react'
import { useIntl } from 'react-intl'

import { type TextProps } from 'ui/src/components/typography/text'
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

	const {
		isLoading,
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
	} = useBalances(...selectedAccounts)

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
		const zero = new BigNumber(0)
		if (change.gt(zero)) {
			return ChangeStatus.Positive
		} else if (change.lt(zero)) {
			return ChangeStatus.Negative
		} else {
			return ChangeStatus.Neutral
		}
	}

	const getChangeStatusTextColor = (changeStatus: ChangeStatus): TextProps['color'] => {
		switch (changeStatus) {
			case 'positive':
				return 'green'
			case 'negative':
				return 'red'
			default:
				return 'neutral'
		}
	}

	const changeStatus = getChangeStatus()

	return {
		isLoading,
		value,
		formattedValue: intl.formatNumber(value.toNumber(), { style: 'currency', currency }),
		change,
		formattedChange: intl.formatNumber(change.toNumber(), { style: 'percent', maximumFractionDigits: 2 }),
		changeStatus,
		changeStatusTextColor: getChangeStatusTextColor(changeStatus),
	}
}
