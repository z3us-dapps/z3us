import React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useNavigate } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { HardwareWalletIcon, HomeIcon, Z3usIcon } from 'ui/src/components/icons'
import { useSharedStore } from 'ui/src/hooks/use-store'
import { KeystoreType } from 'ui/src/store/types'
import { generateId } from 'ui/src/utils/generate-id'

const messages = defineMessages({
	seed_new: {
		id: 'keystore.home.seed_new',
		defaultMessage: 'I am new user',
	},
	seed_restore: {
		id: 'keystore.home.seed_restore',
		defaultMessage: 'Restore from seed phrase',
	},
	key: {
		id: 'keystore.home.key',
		defaultMessage: 'Restore from extended private key',
	},
	radix: {
		id: 'keystore.home.radix',
		defaultMessage: 'Connect Radix Mobile',
	},
	hw: {
		id: 'keystore.home.hw',
		defaultMessage: 'Connect Hardware Wallet',
	},
})

export const Home: React.FC = () => {
	const intl = useIntl()
	const navigate = useNavigate()
	const { addKeystore } = useSharedStore(state => ({
		addKeystore: state.addKeystoreAction,
	}))

	const handleNew = () => {
		const id = generateId()
		addKeystore(id, id, KeystoreType.LOCAL)
		navigate('/keystore/new/seed')
	}

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
		<Box>
			<Button
				onClick={handleNew}
				styleVariant="tertiary"
				sizeVariant="xlarge"
				fullWidth
				leftIcon={
					<Box marginLeft="small">
						<Z3usIcon />
					</Box>
				}
			>
				{intl.formatMessage(messages.seed_new)}
			</Button>
			<Button
				onClick={handleConnectRadix}
				styleVariant="tertiary"
				sizeVariant="xlarge"
				fullWidth
				leftIcon={
					<Box marginLeft="small">
						<HomeIcon />
					</Box>
				}
			>
				{intl.formatMessage(messages.radix)}
			</Button>
			<Button
				onClick={handleConnectHardwareWallet}
				styleVariant="tertiary"
				sizeVariant="xlarge"
				fullWidth
				leftIcon={
					<Box marginLeft="small">
						<HardwareWalletIcon />
					</Box>
				}
			>
				{intl.formatMessage(messages.hw)}
			</Button>
			<Button
				onClick={handleRestoreSeed}
				styleVariant="tertiary"
				sizeVariant="xlarge"
				fullWidth
				leftIcon={
					<Box marginLeft="small">
						<Z3usIcon />
					</Box>
				}
			>
				{intl.formatMessage(messages.seed_restore)}
			</Button>
			<Button
				onClick={handleRestoreExtendedPrivateKey}
				styleVariant="tertiary"
				sizeVariant="xlarge"
				fullWidth
				leftIcon={
					<Box marginLeft="small">
						<Z3usIcon />
					</Box>
				}
			>
				{intl.formatMessage(messages.key)}
			</Button>
		</Box>
	)
}

export default Home
