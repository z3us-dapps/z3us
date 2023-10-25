import React from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { AccountCard } from 'ui/src/components/account-cards'
import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { Dialog } from 'ui/src/components/dialog'
import { AppsIcon, PlusIcon } from 'ui/src/components/icons'
import { Switch } from 'ui/src/components/switch'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Text } from 'ui/src/components/typography'
import { useWalletAccounts } from 'ui/src/hooks/use-accounts'

import * as styles from './styles.css'

const messages = defineMessages({
	addAccount: {
		defaultMessage: 'Add account',
		id: 'qJcduu',
	},
	accountsTitle: {
		defaultMessage: 'Accounts',
		id: 'FvanT6',
	},
	accountsSubTitle: {
		defaultMessage: 'View and add account',
		id: 'VD0zNQ',
	},
})

export const AddAccountDialog: React.FC = () => {
	const intl = useIntl()

	const accounts = useWalletAccounts()

	return (
		<Box className={styles.addAccountDialog}>
			<Dialog
				width="large"
				trigger={
					<Box>
						<ToolTip message={intl.formatMessage(messages.addAccount)}>
							<Button styleVariant="ghost" sizeVariant="medium" iconOnly>
								<AppsIcon />
							</Button>
						</ToolTip>
					</Box>
				}
			>
				<Box className={styles.addAccountDialogContentWrapper}>
					<Box className={styles.addAccountDialogHeader}>
						<Box className={styles.addAccountDialogTitleWrapper}>
							<Text color="strong" size="xxlarge" weight="strong">
								{intl.formatMessage(messages.accountsTitle)}
							</Text>
							<Text>{intl.formatMessage(messages.accountsSubTitle)}</Text>
						</Box>
						<Box className={styles.addAccountCheckBoxWrapper}>
							<Box>
								<Button styleVariant="primary" sizeVariant="medium" rightIcon={<PlusIcon />}>
									Add account
								</Button>
							</Box>
							<Box display="flex" alignItems="center" gap="small" paddingTop="small">
								<Text size="xxsmall">Enable to add Olympia account</Text>
								<Switch sizeVariant="medium" defaultChecked={false} onCheckedChange={() => {}} />
							</Box>
						</Box>
					</Box>
					<Box className={styles.addAccountGridWrapper} component="ul">
						{Object.values(accounts).map(({ address }) => (
							<AccountCard key={address} address={address} className={styles.addAccountCardWrapper} />
						))}
					</Box>
				</Box>
			</Dialog>
		</Box>
	)
}
