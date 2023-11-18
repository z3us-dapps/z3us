import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useMemo } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { Z3usLoading } from 'ui/src/components/z3us-loading'
import { animatePageVariants } from 'ui/src/constants/page'
import { useAccountValues, useBalances } from 'ui/src/hooks/dapp/use-balances'
import { useSelectedAccounts, useWalletAccounts } from 'ui/src/hooks/use-accounts'
import { useIsAllAccounts } from 'ui/src/hooks/use-is-all-accounts'
import { useResourceType } from 'ui/src/pages/accounts/hooks/use-resource-type'
import type { ResourceBalance, ResourceBalanceType } from 'ui/src/types'
import { getShortAddress } from 'ui/src/utils/string-utils'

import { Chart } from './components/chart'
import * as styles from './styles.css'

const messages = defineMessages({
	loading: {
		id: 'gjBiyj',
		defaultMessage: 'Loading...',
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

	const selectedAccounts = useSelectedAccounts()
	const { data: accountValues = {} } = useAccountValues(...selectedAccounts)
	const { data: balanceData, isLoading } = useBalances(...selectedAccounts)
	const {
		balances = [],
		tokensBalances = [],
		liquidityPoolTokensBalances = [],
		poolUnitsBalances = [],
		nonFungibleBalances = [],
	} = balanceData || {}

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
				? Object.keys(accounts).map((address, index) => ({
						address,
						index,
						name: accounts[address].name || getShortAddress(address),
						value: accountValues[address],
				  }))
				: balances.map((resource, index) => ({
						address: resource.address,
						index,
						name:
							(resource as ResourceBalance[ResourceBalanceType.FUNGIBLE]).symbol ||
							resource.name ||
							intl.formatMessage(messages.unknown),
						value: resource.value,
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
