import React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useNavigate } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { ArrowLeftIcon, KeyIcon, RadixIcon, SmartPhoneIcon, UsbIcon, WriteNoteIcon } from 'ui/src/components/icons'
import { List, ListItem } from 'ui/src/components/layout/list'
import { Text } from 'ui/src/components/typography'
import { useSharedStore } from 'ui/src/hooks/use-store'
import { KeystoreType } from 'ui/src/store/types'
import { generateId } from 'ui/src/utils/generate-id'

import * as styles from './styles.css'

const messages = defineMessages({
	wallet_options_title: {
		defaultMessage: 'I already have wallet',
		id: 's8CwGQ',
	},
	wallet_options_sub_title: {
		defaultMessage: 'Select from the options below to connect your existing wallet.',
		id: 'LJnWVj',
	},
	seed_restore: {
		id: '6I8Iyd',
		defaultMessage: 'Restore from seed phrase',
	},
	key: {
		id: '4Q4DB2',
		defaultMessage: 'Restore from extended private key',
	},
	radix: {
		id: 'YFt45g',
		defaultMessage: 'Connect Radix Mobile',
	},
	hw: {
		id: 'qRpTg5',
		defaultMessage: 'Connect Hardware Wallet',
	},
})

export const Home: React.FC = () => {
	const intl = useIntl()
	const navigate = useNavigate()
	const { addKeystore } = useSharedStore(state => ({
		addKeystore: state.addKeystoreAction,
	}))

	const handleRestoreSeed = () => {
		const id = generateId()
		addKeystore(id, id, KeystoreType.LOCAL)
		navigate('/keystore/restore/seed')
	}

	const handleRestoreExtendedPrivateKey = () => {
		const id = generateId()
		addKeystore(id, id, KeystoreType.LOCAL)
		navigate('/keystore/restore/extended-key')
	}

	const handleConnectRadix = () => {
		const id = generateId()
		addKeystore(id, id, KeystoreType.RADIX_WALLET)
		navigate('/keystore/new/radix')
	}

	const handleConnectHardwareWallet = () => {
		const id = generateId()
		addKeystore(id, id, KeystoreType.HARDWARE)
		navigate('/keystore/new/hardware-wallet')
	}

	return (
		<Box className={styles.keystoreOptionsWrapper}>
			<Button onClick={() => navigate(-1)} styleVariant="ghost" sizeVariant="small" iconOnly>
				<ArrowLeftIcon />
			</Button>
			<Box className={styles.keystoreOptionsTextWrapper}>
				<Text color="strong" size="xxlarge" weight="strong">
					{intl.formatMessage(messages.wallet_options_title)}
				</Text>
				<Text>{intl.formatMessage(messages.wallet_options_sub_title)}</Text>
			</Box>
			<Box className={styles.keystoreOptionsButtonsWrapper}>
				<List>
					<ListItem onClick={handleConnectRadix} iconLeft={<SmartPhoneIcon />}>
						<Text color="strong" weight="medium">
							{intl.formatMessage(messages.radix)}
						</Text>
					</ListItem>
					<ListItem onClick={handleConnectHardwareWallet} iconLeft={<UsbIcon />}>
						<Text color="strong" weight="medium">
							{intl.formatMessage(messages.hw)}
						</Text>
					</ListItem>
					<ListItem onClick={handleRestoreSeed} iconLeft={<WriteNoteIcon />}>
						<Text color="strong" weight="medium">
							{intl.formatMessage(messages.seed_restore)}
						</Text>
					</ListItem>
					<ListItem onClick={handleRestoreExtendedPrivateKey} iconLeft={<KeyIcon />}>
						<Text color="strong" weight="medium">
							{intl.formatMessage(messages.key)}
						</Text>
					</ListItem>
				</List>
			</Box>
		</Box>
	)
}

export default Home
