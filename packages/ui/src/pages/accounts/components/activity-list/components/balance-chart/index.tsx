import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useMemo } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { CardButtons } from 'ui/src/components/card-buttons'
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
	all_assets_total_balance: {
		id: 'accounts.activity_list.all_assets_total_balance',
		defaultMessage: 'Total Balance',
	},
	loading: {
		id: 'accounts.activity_list.balance_chart.loading',
		defaultMessage: 'Loading...',
	},
	show_less: {
		id: 'accounts.activity_list.balance_chart.show_less',
		defaultMessage: 'Show less',
	},
	show_more: {
		id: 'accounts.activity_list.balance_chart.show_more',
		defaultMessage: 'Show more',
	},
	unknown: {
		id: 'accounts.activity_list.balance_chart.data.unknown',
		defaultMessage: 'Unknown',
	},
})

export const BalanceChart: React.FC = () => {
	const intl = useIntl()
	const resourceType = useResourceType()
	const isAllAccounts = useIsAllAccounts()
	const accounts = useWalletAccounts()

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
		<Box className={styles.allChartWrapper}>
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
							<Box className={clsx(styles.pieChartWrapper, !isAllAccounts && styles.mobileHiddenWrapper)}>
								<Chart data={data} />
							</Box>
							<Box className={clsx(styles.cardButtonsWrapper, !isAllAccounts && styles.cardButtonsWrapperVisible)}>
								<CardButtons />
							</Box>
						</motion.div>
					)}
				</AnimatePresence>
			</Box>
		</Box>
	)
}
