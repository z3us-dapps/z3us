import React, { useMemo, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { AccountCard } from 'ui/src/components/account-cards'
import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { Dialog } from 'ui/src/components/dialog'
import { AppsIcon, PlusIcon } from 'ui/src/components/icons'
import { Switch } from 'ui/src/components/switch'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Text } from 'ui/src/components/typography'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore, useSharedStore } from 'ui/src/hooks/use-store'
import { useZdtState } from 'ui/src/hooks/zdt/use-zdt'
import type { Account } from 'ui/src/store/types'
import { KeystoreType, SCHEME } from 'ui/src/store/types'

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
	olympia: {
		defaultMessage: 'Toggle ON to recover legacy account (Olympia users)',
		id: 'mCV56n',
	},
})

export const AddAccountDialog: React.FC = () => {
	const intl = useIntl()
	const networkId = useNetworkId()
	const { isWallet, buildNewAccountKeyParts } = useZdtState()
	const { keystore } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
	}))
	const { accountIndexes, addAccount } = useNoneSharedStore(state => ({
		accountIndexes: state.accountIndexes[networkId] || {},
		addAccount: state.addAccountAction,
	}))

	const [isLegacy, setIsLegacy] = useState<boolean>(false)

	const accounts = useMemo(
		() => Object.values(accountIndexes).filter(account => isLegacy === (account.scheme === SCHEME.BIP440OLYMPIA)),
		[accountIndexes, isLegacy],
	)

	const handleToggle = () => {
		setIsLegacy(!isLegacy)
	}

	const handleAdd = async () => {
		const keyParts = await buildNewAccountKeyParts(isLegacy)
		addAccount(networkId, keyParts.address, keyParts as Account)
	}

	if (!isWallet || keystore?.type === KeystoreType.RADIX_WALLET) return null

	return (
		<Box className={styles.addAccountDialogWrapper}>
			<Dialog
				width="large"
				className={styles.addAccountDialog}
				trigger={
					<Box>
						<ToolTip message={intl.formatMessage(messages.addAccount)}>
							<Button styleVariant="ghost" sizeVariant="small" iconOnly>
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
								<Button styleVariant="primary" sizeVariant="medium" rightIcon={<PlusIcon />} onClick={handleAdd}>
									{intl.formatMessage(messages.addAccount)}
								</Button>
							</Box>
							<Box display="flex" alignItems="center" gap="small" paddingTop="small">
								<Text size="xxsmall">{intl.formatMessage(messages.olympia)}</Text>
								<Switch sizeVariant="medium" defaultChecked={isLegacy} onCheckedChange={handleToggle} />
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
