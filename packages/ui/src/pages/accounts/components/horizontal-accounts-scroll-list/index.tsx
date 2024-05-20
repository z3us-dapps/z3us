import clsx from 'clsx'
import React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { AppsIcon } from 'ui/src/components/icons'
import { ScrollAreaNative } from 'ui/src/components/scroll-area-native'
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
	const accountsLength = Object.keys(accounts).length

	return (
		<Box className={styles.accountList} display={isAllAccounts ? 'flex' : 'none'}>
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
			{accountsLength > 0 && (
				<ScrollAreaNative className={styles.accountListGridScrollWrapper}>
					<Box
						className={clsx(styles.accountListGridWrapper, accountsLength > 4 && styles.accountListGridTwoRowWrapper)}
					>
						{Object.values(accounts).map(({ address }) => (
							<Box key={address} className={styles.accountListGridCard}>
								<AccountHomeCard
									address={address}
									className={clsx(!isAllAccounts && address !== accountId && styles.accountCardOpacity)}
								/>
							</Box>
						))}
					</Box>
				</ScrollAreaNative>
			)}
		</Box>
	)
}

export default HorizontalAccountsScrollList
