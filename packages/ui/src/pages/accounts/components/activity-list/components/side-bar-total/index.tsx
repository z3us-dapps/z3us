import clsx from 'clsx'
import React from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { RedGreenText, Text } from 'ui/src/components/typography'
import { useTotalBalance } from 'ui/src/hooks/dapp/use-total-balance'
import { useIsAllAccounts } from 'ui/src/hooks/use-is-all-accounts'

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

	const { isLoading, formattedXrdValue, formattedValue, formattedChange, change } = useTotalBalance()

	if (isLoading) {
		return null
	}

	return (
		<Box className={clsx(styles.mobileHomeBalanceWrapper, !isAllAccounts && styles.mobileHiddenWrapper)}>
			<Text color="strong" size="xlarge">
				{intl.formatMessage(messages.all_assets_total_balance)}
			</Text>
			<Box display="flex" alignItems="center" gap="small">
				<Text weight="medium" size="xxlarge" color="strong" truncate>
					{formattedValue}
				</Text>
				<RedGreenText size="small" weight="strong" truncate change={change}>
					{formattedChange}
				</RedGreenText>
			</Box>
			<Text weight="medium" size="medium">
				{formattedXrdValue} XRD
			</Text>
		</Box>
	)
}
