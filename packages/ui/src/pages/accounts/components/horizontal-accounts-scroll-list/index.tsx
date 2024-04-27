import clsx from 'clsx'
import React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { AppsIcon } from 'ui/src/components/icons'
import { ToolTip } from 'ui/src/components/tool-tip'
import { useWalletAccounts } from 'ui/src/hooks/use-accounts'

import { AccountHomeCard } from '../account-home-card'
import { AddAccountDialog } from '../layout/components/add-account-dialog'
import * as styles from './styles.css'

const messages = defineMessages({
	addAccountToolTip: {
		defaultMessage: 'Add account',
		id: 'qJcduu',
	},
})

export const HorizontalAccountsScrollList: React.FC = () => {
	const intl = useIntl()
	const { accountId = '-' } = useParams()
	const isAllAccounts = accountId === '-'

	const accounts = useWalletAccounts()

	return (
		<Box className={styles.accountsHorizontalWrapper} display={isAllAccounts ? 'block' : 'none'}>
			<AddAccountDialog
				dialogTrigger={
					<Box className={styles.accountsAddAccountButton}>
						<ToolTip message={intl.formatMessage(messages.addAccountToolTip)}>
							<Button styleVariant="ghost" sizeVariant="small" iconOnly>
								<AppsIcon />
							</Button>
						</ToolTip>
					</Box>
				}
			/>
			<Box className={styles.accountsHorizontalAbsoluteWrapper}>
				<Box className={styles.accountsHorizontalCardsWrapper}>
					{Object.values(accounts).map(({ address }) => (
						<Box className={styles.card}>
							<AccountHomeCard
								key={address}
								address={address}
								className={clsx(!isAllAccounts && address !== accountId && styles.accountCardOpacity)}
							/>
						</Box>
					))}
				</Box>
			</Box>
		</Box>
	)
}

export default HorizontalAccountsScrollList
