import React, { useEffect, useMemo, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { AccountCard } from 'ui/src/components/account-cards'
import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { Dialog } from 'ui/src/components/dialog'
import { PlusIcon } from 'ui/src/components/icons'
import { SelectSimple } from 'ui/src/components/select'
import { Switch } from 'ui/src/components/switch'
import { Text } from 'ui/src/components/typography'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network'
import { useAccountIndexes } from 'ui/src/hooks/use-account-indexes'
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
		defaultMessage: 'View and add accounts',
		id: 'F9uaGi',
	},
	olympia: {
		defaultMessage: 'Add legacy account (Olympia users)',
		id: 'LFbkcm',
	},
	keySource: {
		defaultMessage: 'Key source:',
		id: 'l+CFN7',
	},
})

interface IProps {
	dialogTrigger?: React.ReactElement
	open?: boolean
	onClose?: () => void
}

export const AddAccountDialog: React.FC<IProps> = props => {
	const { dialogTrigger, open, onClose } = props
	const intl = useIntl()
	const networkId = useNetworkId()
	const { isWallet, buildNewAccountKeyParts } = useZdtState()
	const accountIndexes = useAccountIndexes()
	const { keystore } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
	}))
	const { addAccount } = useNoneSharedStore(state => ({
		addAccount: state.addAccountAction,
	}))

	const [isLegacy, setIsLegacy] = useState<boolean>(false)
	const [keySourceId, setKeySourceId] = useState<string>('')

	useEffect(() => {
		if (!keystore || keySourceId) return
		setKeySourceId(keystore.id)
	}, [keystore])

	const selectItems = useMemo(
		() =>
			keystore?.type === KeystoreType.COMBINED
				? Object.keys(keystore.keySources).map(id => ({ id, title: keystore.keySources[id].name }))
				: [],
		[keystore],
	)

	const accounts = useMemo(
		() => Object.values(accountIndexes).filter(account => isLegacy === (account.scheme === SCHEME.BIP440OLYMPIA)),
		[accountIndexes, isLegacy],
	)

	const handleToggle = () => {
		setIsLegacy(!isLegacy)
	}

	const handleAdd = () => {
		buildNewAccountKeyParts(keySourceId, isLegacy).then(keyParts =>
			addAccount(networkId, keyParts.address, keyParts as Account),
		)
	}

	if (!isWallet || keystore?.type === KeystoreType.RADIX_WALLET) return null

	return (
		<Dialog width="large" className={styles.addAccountDialog} trigger={dialogTrigger} open={open} onClose={onClose}>
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
					</Box>
				</Box>
				<Box className={styles.keySourceWrapper}>
					{selectItems.length > 0 && (
						<Box className={styles.keySourceSelectWrapper}>
							<Box flexShrink={0}>
								<Text size="xsmall">{intl.formatMessage(messages.keySource)}</Text>
							</Box>
							<SelectSimple
								fullWidth
								value={keySourceId}
								onValueChange={setKeySourceId}
								data={selectItems}
								sizeVariant="small"
								placeholder={intl.formatMessage(messages.keySource)}
							/>
						</Box>
					)}
					<Box className={styles.addAccountSwitchWrapper}>
						<Text size="xxsmall">{intl.formatMessage(messages.olympia)}</Text>
						<Switch sizeVariant="medium" defaultChecked={isLegacy} onCheckedChange={handleToggle} />
					</Box>
				</Box>
				<Box className={styles.addAccountGridWrapper} component="ul">
					{Object.values(accounts).map(({ address }) => (
						<AccountCard key={address} address={address} className={styles.addAccountCardWrapper} />
					))}
				</Box>
			</Box>
		</Dialog>
	)
}
