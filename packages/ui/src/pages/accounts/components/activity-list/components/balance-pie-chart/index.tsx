import clsx from 'clsx'
import React, { useMemo } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { useAccountValues, useSelectedAccountsBalances } from 'ui/src/hooks/dapp/use-balances'
import { useWalletAccounts } from 'ui/src/hooks/use-accounts'
import { useIsAllAccounts } from 'ui/src/hooks/use-is-all-accounts'
import { useResourceType } from 'ui/src/pages/accounts/hooks/use-resource-type'
import type { ResourceBalance, ResourceBalanceType } from 'ui/src/types'
import { getShortAddress } from 'ui/src/utils/string-utils'

import { Chart } from './components/chart'
import * as styles from './styles.css'

const messages = defineMessages({
	loading: {
		id: 'iFsDVR',
		defaultMessage: 'Loading',
	},
	unknown: {
		id: '5jeq8P',
		defaultMessage: 'Unknown',
	},
})

export const BalancePieChart: React.FC = () => {
	const intl = useIntl()
	const resourceType = useResourceType()
	const isAllAccounts = useIsAllAccounts()
	const accounts = useWalletAccounts()
	const accountValues = useAccountValues()
	const {
		data: {
			balances = [],
			tokensBalances = [],
			liquidityPoolTokensBalances = [],
			poolUnitsBalances = [],
			nonFungibleBalances = [],
		},
	} = useSelectedAccountsBalances()

	const selectedBalances = useMemo(() => {
		if (resourceType === 'nfts') return nonFungibleBalances
		if (resourceType === 'tokens') return tokensBalances
		if (['lsus', 'lp-tokens'].includes(resourceType)) return liquidityPoolTokensBalances
		if (['lpus', 'pool-units'].includes(resourceType)) return poolUnitsBalances
		return balances
	}, [resourceType, nonFungibleBalances, tokensBalances, liquidityPoolTokensBalances, poolUnitsBalances])

	const accountsData = useMemo(
		() =>
			Object.keys(accounts).map((address, index) => ({
				address,
				index,
				name: accounts[address].name || getShortAddress(address),
				value: accountValues[address],
			})),
		[accounts, accountValues],
	)

	const balancesData = useMemo(
		() =>
			selectedBalances.map((resource, index) => ({
				address: resource.address,
				index,
				name:
					(resource as ResourceBalance[ResourceBalanceType.FUNGIBLE]).validatorName ||
					(resource as ResourceBalance[ResourceBalanceType.FUNGIBLE]).poolName ||
					(resource as ResourceBalance[ResourceBalanceType.FUNGIBLE]).symbol ||
					resource.name ||
					intl.formatMessage(messages.unknown),
				value: resource.value,
			})),
		[selectedBalances],
	)

	return (
		<Box display={isAllAccounts ? 'flex' : 'none'} className={clsx(styles.allChartWrapper)}>
			<Box className={styles.allChartInnerWrapper}>
				<Box className={styles.motionWrapper}>
					<Box className={styles.pieChartWrapper}>
						<Chart data={isAllAccounts && !resourceType ? accountsData : balancesData} />
					</Box>
				</Box>
			</Box>
		</Box>
	)
}
