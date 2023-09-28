import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useMemo, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { Z3usLoading } from 'ui/src/components/z3us-loading'
import { animatePageVariants } from 'ui/src/constants/page'
import { useAccountValues, useBalances } from 'ui/src/hooks/dapp/use-balances'
import { useSelectedAccounts, useWalletAccounts } from 'ui/src/hooks/use-accounts'
import { useIsAllAccounts } from 'ui/src/hooks/use-is-all-accounts'
import { useResourceType } from 'ui/src/pages/accounts/hooks/use-resource-type'
import type { ResourceBalance, ResourceBalanceType } from 'ui/src/types/types'

import { Chart } from './components/chart'
import * as styles from './styles.css'

const messages = defineMessages({
	loading: {
		id: 'accounts.activity_list.balance_chart.loading',
		defaultMessage: 'Loading...',
	},
	unknown: {
		id: 'accounts.activity_list.balance_chart.data.unknown',
		defaultMessage: 'Unknown',
	},
})

export const BalancePieChart: React.FC = () => {
	const intl = useIntl()
	const resourceType = useResourceType()
	const isAllAccounts = useIsAllAccounts()
	const accounts = useWalletAccounts()

	const [showFullAccountList, setShowFullAccountList] = useState<boolean>(false)

	const selectedAccounts = useSelectedAccounts()
	const { values: accountValues } = useAccountValues(...selectedAccounts)
	const { balances, tokensBalances, liquidityPoolTokensBalances, poolUnitsBalances, nonFungibleBalances, isLoading } =
		useBalances(...selectedAccounts)

	const selectedBalances = useMemo(() => {
		if (resourceType === 'nfts') return nonFungibleBalances
		if (resourceType === 'tokens') return tokensBalances
		if (resourceType === 'lp-tokens') return liquidityPoolTokensBalances
		if (resourceType === 'pool-units') return poolUnitsBalances
		return balances
	}, [balances, resourceType])

	const data = useMemo(
		() =>
			isAllAccounts
				? Object.keys(accountValues).map(address => ({
						address,
						name: accounts[address]?.name || address,
						value: accountValues[address].toNumber(),
				  }))
				: balances.map(resource => ({
						address: resource.address,
						name:
							(resource as ResourceBalance[ResourceBalanceType.FUNGIBLE]).symbol ||
							resource.name ||
							intl.formatMessage(messages.unknown),
						value: resource.value.toNumber(),
				  })),
		[isAllAccounts, selectedBalances],
	)

	return (
		<Box className={clsx(styles.allChartWrapper, !isAllAccounts && styles.mobileHiddenWrapper)}>
			<Box className={styles.allChartInnerWrapper}>
				<AnimatePresence initial={false}>
					{isLoading && (
						<motion.div
							className={clsx(styles.motionWrapper, styles.chartLoadingWrapper)}
							initial="hidden"
							animate="visible"
							variants={animatePageVariants}
						>
							<Z3usLoading message={intl.formatMessage(messages.loading)} />
						</motion.div>
					)}
				</AnimatePresence>
				<AnimatePresence initial={false}>
					{!isLoading && (
						<motion.div
							className={styles.motionWrapper}
							initial="hidden"
							animate="visible"
							variants={animatePageVariants}
						>
							<Box className={styles.pieChartWrapper}>
								<Chart data={data} />
							</Box>
						</motion.div>
					)}
				</AnimatePresence>
			</Box>
		</Box>
	)
}
