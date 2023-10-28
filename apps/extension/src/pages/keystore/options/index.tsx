import React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useNavigate } from 'react-router-dom'

import { Avatar } from 'ui/src/components/avatar'
import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { ArrowLeftIcon, HardwareWalletIcon, HomeIcon, Z3usIcon } from 'ui/src/components/icons'
import { List, ListItem } from 'ui/src/components/layout/list'
import { Text } from 'ui/src/components/typography'
import { useSharedStore } from 'ui/src/hooks/use-store'
import { KeystoreType } from 'ui/src/store/types'
import { generateId } from 'ui/src/utils/generate-id'

import * as styles from './styles.css'

const messages = defineMessages({
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
			<Text color="strong" size="xxlarge" weight="strong">
				I already have wallet
			</Text>
			<Text>A friendly crypto wallet build for DeFi & NTFs. </Text>
			<Box className={styles.keystoreOptionsButtonsWrapper}>
				<List>
					<ListItem onClick={handleConnectRadix} iconLeft={<HomeIcon />}>
						<Text color="strong" weight="medium">
							{intl.formatMessage(messages.radix)}
						</Text>
					</ListItem>
					<ListItem onClick={handleConnectHardwareWallet} iconLeft={<HardwareWalletIcon />}>
						<Text color="strong" weight="medium">
							{intl.formatMessage(messages.hw)}
						</Text>
					</ListItem>
					<ListItem onClick={handleRestoreSeed} iconLeft={<Z3usIcon />}>
						<Text color="strong" weight="medium">
							{intl.formatMessage(messages.seed_restore)}
						</Text>
					</ListItem>
					<ListItem
						onClick={handleRestoreExtendedPrivateKey}
						iconLeft={
							<Avatar
								styleVariant="circle"
								sizeVariant="small"
								src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
								alt="img"
								fallback="df"
							/>
						}
					>
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
