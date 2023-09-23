import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useMemo, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'

// import { AccountTotalValue } from './components/total-value'
import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { CardButtons } from 'ui/src/components/card-buttons'
import { HeightAnimatePanel } from 'ui/src/components/height-animate-panel'
import { Text } from 'ui/src/components/typography'
import { Z3usLoading } from 'ui/src/components/z3us-loading'
import { animatePageVariants } from 'ui/src/constants/page'
import { useAccountValues, useBalances } from 'ui/src/hooks/dapp/use-balances'
import { useSelectedAccounts, useWalletAccounts } from 'ui/src/hooks/use-accounts'
import { useIsAllAccounts } from 'ui/src/hooks/use-is-all-accounts'
import { useIsMobileWidth } from 'ui/src/hooks/use-is-mobile'
import { useResourceType } from 'ui/src/pages/accounts/hooks/use-resource-type'
import type { ResourceBalance, ResourceBalanceKind, ResourceBalanceType } from 'ui/src/types/types'

import { AccountTotalValue } from '../../../layout/components/total-value'
import { Chart } from './components/chart'
import { ListRow } from './components/list-row'
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

const defaultRowsShown = 3

export const BalanceChart: React.FC = () => {
	const intl = useIntl()
	const isMobile = useIsMobileWidth()
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

	const handleToggleFullAccountList = () => {
		setShowFullAccountList(!showFullAccountList)
	}

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
							<Box className={clsx(styles.mobileHomeBalanceWrapper, !isAllAccounts && styles.mobileHiddenWrapper)}>
								<Text color="strong" size="xlarge">
									{intl.formatMessage(messages.all_assets_total_balance)}
								</Text>
								<AccountTotalValue className={styles.mobileAccountValueTotal} />
							</Box>
							<Box className={clsx(styles.mobileCardWrapper, isAllAccounts && styles.mobileHiddenWrapper)}>
								<Box className={styles.mobileCardTransparentWrapper}>
									<Box flexGrow={1}>
										<Text color="strong" truncate>
											Account name (TODO)
										</Text>
									</Box>
									<Box>
										<Text weight="stronger" size="xxlarge" color="strong" truncate>
											$54546,009
										</Text>
										<Box display="flex">
											<Text weight="strong" color="strong" className={styles.mobileCardTextSpaced} truncate>
												34234...234235
											</Text>
										</Box>
									</Box>
								</Box>
								<CardButtons />
							</Box>
							<Box className={styles.accountsListWrapper}>
								<Box display="flex" flexDirection="column" gap="xsmall" width="full">
									<HeightAnimatePanel>
										<Box>
											{(showFullAccountList ? data : data.slice(0, defaultRowsShown)).map(row => (
												<ListRow key={row.address} {...row} />
											))}
										</Box>
									</HeightAnimatePanel>
								</Box>
								{selectedBalances?.length > defaultRowsShown && (
									<Box display="flex" flexDirection="column" gap="xsmall" width="full" paddingTop="medium">
										<Button styleVariant={isMobile ? 'tertiary' : 'secondary'} onClick={handleToggleFullAccountList}>
											{showFullAccountList
												? intl.formatMessage(messages.show_less)
												: intl.formatMessage(messages.show_more)}
										</Button>
									</Box>
								)}
							</Box>
						</motion.div>
					)}
				</AnimatePresence>
			</Box>
		</Box>
	)
}
