import React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useNavigate } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { ArrowLeftIcon, KeyIcon, SmartPhoneIcon, UsbIcon, WriteNoteIcon } from 'ui/src/components/icons'
import { List, ListItem } from 'ui/src/components/layout/list'
import { Text } from 'ui/src/components/typography'

import { Title } from '../components/title'
import * as styles from './styles.css'

const isHIDSupported = !!window?.navigator?.hid
const isOffscreenSupported = !!globalThis.chrome?.offscreen

const canConnectLedger = isHIDSupported
const canConnectRadixMobile = isHIDSupported && isOffscreenSupported

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
	not_supported: {
		id: 'OdLyT+',
		defaultMessage: 'Your browser does not support this option',
	},
})

export const Home: React.FC = () => {
	const intl = useIntl()
	const navigate = useNavigate()

	const handleRestoreSeed = () => {
		navigate('/keystore/new/restore/seed')
	}

	const handleRestoreExtendedPrivateKey = () => {
		navigate('/keystore/new/restore/extended-key')
	}

	const handleConnectRadix = () => {
		if (!canConnectRadixMobile) return
		navigate('/keystore/new/radix')
	}

	const handleConnectHardwareWallet = () => {
		if (!canConnectLedger) return
		navigate('/keystore/new/hardware-wallet')
	}

	return (
		<Box className={styles.keystoreOptionsWrapper}>
			<Button onClick={() => navigate(-1)} styleVariant="ghost" sizeVariant="small" iconOnly>
				<ArrowLeftIcon />
			</Button>
			<Title
				title={intl.formatMessage(messages.wallet_options_title)}
				subTitle={intl.formatMessage(messages.wallet_options_sub_title)}
			/>
			<Box className={styles.keystoreOptionsButtonsWrapper}>
				<List>
					<ListItem
						disabled={!canConnectRadixMobile}
						onClick={handleConnectRadix}
						iconLeft={<SmartPhoneIcon />}
						tooltipContent={!canConnectRadixMobile ? intl.formatMessage(messages.not_supported) : undefined}
					>
						<Text color="strong" weight="medium">
							{intl.formatMessage(messages.radix)}
						</Text>
					</ListItem>
					<ListItem
						disabled={!canConnectLedger}
						onClick={handleConnectHardwareWallet}
						iconLeft={<UsbIcon />}
						tooltipContent={!canConnectLedger ? intl.formatMessage(messages.not_supported) : undefined}
					>
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
