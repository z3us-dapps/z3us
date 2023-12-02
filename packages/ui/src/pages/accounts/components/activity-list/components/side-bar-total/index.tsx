import clsx from 'clsx'
import React, { useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { ToolTip } from 'ui/src/components/tool-tip'
import { RedGreenText, Text } from 'ui/src/components/typography'
import { useTotalBalance } from 'ui/src/hooks/dapp/use-total-balance'
import { useIsAllAccounts } from 'ui/src/hooks/use-is-all-accounts'

import * as styles from './styles.css'

const messages = defineMessages({
	all_assets_total_balance: {
		id: 'zHpvzF',
		defaultMessage: 'Total Balance',
	},
})

export const SideBarTotal: React.FC = () => {
	const intl = useIntl()
	const isAllAccounts = useIsAllAccounts()

	const { isLoading, formattedXrdValue, formattedValue, formattedChange, value, xrdValue, change } = useTotalBalance()

	const [format, setFormat] = useState<'currency' | 'xrd'>('currency')

	const handleToggleValue = () => {
		setFormat(format === 'currency' ? 'xrd' : 'currency')
	}

	if (isLoading) {
		return null
	}

	return (
		<Box className={clsx(styles.mobileHomeBalanceWrapper, !isAllAccounts && styles.mobileHiddenWrapper)}>
			<Text color="strong" size="xlarge">
				{intl.formatMessage(messages.all_assets_total_balance)}
			</Text>
			<ToolTip message={format === 'currency' ? value : xrdValue}>
				<Box display="flex" alignItems="center" gap="small" onClick={handleToggleValue}>
					<Text weight="medium" size="xxlarge" color="strong" truncate className={styles.totalValueWrapper}>
						{format === 'currency' ? formattedValue : `${formattedXrdValue} XRD`}
					</Text>
				</Box>
			</ToolTip>
			<RedGreenText size="small" weight="strong" truncate change={change}>
				{formattedChange}
			</RedGreenText>
		</Box>
	)
}
