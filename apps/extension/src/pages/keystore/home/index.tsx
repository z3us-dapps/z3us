import React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useNavigate } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { HardwareWalletIcon, HomeIcon, Z3usIcon } from 'ui/src/components/icons'

const messages = defineMessages({
	radix: {
		id: 'keystore.home.radix',
		defaultMessage: 'Radix Mobile',
	},
	seed: {
		id: 'keystore.home.seed',
		defaultMessage: 'Seed phrase (coming soon)',
	},
	key: {
		id: 'keystore.home.key',
		defaultMessage: 'Extended private key (coming soon)',
	},
	hw: {
		id: 'keystore.home.hw',
		defaultMessage: 'Hardware Wallet (coming soon)',
	},
})

export const Home: React.FC = () => {
	const intl = useIntl()
	const navigate = useNavigate()

	const handleAddRadix = () => {
		navigate('/keystore/new/radix')
	}

	return (
		<Box>
			<Button
				onClick={handleAddRadix}
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
				disabled
				styleVariant="tertiary"
				sizeVariant="xlarge"
				fullWidth
				leftIcon={
					<Box marginLeft="small">
						<Z3usIcon />
					</Box>
				}
			>
				{intl.formatMessage(messages.seed)}
			</Button>
			<Button
				disabled
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
			<Button
				disabled
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
		</Box>
	)
}

export default Home
