import clsx, { type ClassValue } from 'clsx'
import React, { useMemo, useState } from 'react'
import { useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { TextScramble } from 'ui/src/components/text-scramble'
import { Text } from 'ui/src/components/typography'
import { useBalances } from 'ui/src/hooks/dapp/use-balances'
import { useSelectedAccounts } from 'ui/src/hooks/use-accounts'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import { useResourceType } from 'ui/src/pages/accounts/hooks/use-resource-type'

import * as styles from './styles.css'

interface IProps {
	className?: ClassValue
}

export const AccountTotalValue: React.FC<IProps> = props => {
	const { className } = props
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

	return (
		<Box className={clsx(styles.assetsHeaderWrapper, className)}>
			<Box flexGrow={1} display="flex" flexDirection="column" gap="xxsmall">
				<Box display="flex" alignItems="center" gap="medium">
					<Text weight="medium" size="xxxlarge" color="strong" truncate>
						{/* TODO: handle loading state */}
						{isLoading ? 'Loading...' : intl.formatNumber(value.toNumber(), { style: 'currency', currency })}
					</Text>
				</Box>
				<Text size="xxsmall" weight="medium" color={change && change.gt(0) ? 'green' : 'red'} truncate>
					{intl.formatNumber(change.toNumber(), { style: 'percent', maximumFractionDigits: 2 })}
				</Text>
			</Box>
		</Box>
	)
}
