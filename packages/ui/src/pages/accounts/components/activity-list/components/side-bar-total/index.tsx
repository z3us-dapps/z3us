import clsx from 'clsx'
import React from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { Text } from 'ui/src/components/typography'
import { useIsAllAccounts } from 'ui/src/hooks/use-is-all-accounts'

import { AccountTotalValue } from '../../../layout/components/total-value'
import * as styles from './styles.css'

const messages = defineMessages({
	all_assets_total_balance: {
		id: 'accounts.activity_list.all_assets_total_balance',
		defaultMessage: 'Total Balance',
	},
})

export const SideBarTotal: React.FC = () => {
	const intl = useIntl()
	const isAllAccounts = useIsAllAccounts()

	return (
		<Box className={clsx(styles.mobileHomeBalanceWrapper, !isAllAccounts && styles.mobileHiddenWrapper)}>
			<Text color="strong" size="xlarge">
				{intl.formatMessage(messages.all_assets_total_balance)}
			</Text>
			<AccountTotalValue className={styles.mobileAccountValueTotal} />
		</Box>
	)
}
