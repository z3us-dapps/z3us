import React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useNavigate } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/router-button'
import { Text } from 'ui/src/components/typography'
import { Z3usLogoLarge } from 'ui/src/components/z3us-logo-babylon'

import * as styles from './styles.css'

const messages = defineMessages({
	wallet_home_title: {
		defaultMessage: 'Welcome to Z3US',
		id: 'B7hMHb',
	},
	wallet_home_sub_title: {
		defaultMessage: 'A friendly crypto wallet build for DeFi & NTFs. ',
		id: 'bSxogo',
	},
	have_wallet_button: {
		defaultMessage: 'I already have a wallet',
		id: '56z6f6',
	},
	create_wallet_button: {
		defaultMessage: 'Create a new wallet',
		id: 'wx278L',
	},
})

export const Home: React.FC = () => {
	const intl = useIntl()
	const navigate = useNavigate()

	const handleNew = () => {
		navigate('/keystore/new/seed')
	}

	const handleSelectWalletOptions = () => {
		navigate('/keystore/new/options')
	}

	return (
		<Box className={styles.keystoreHomeStyleWrapper}>
			<Box display="flex" width="full" justifyContent="center" paddingY="large">
				<Z3usLogoLarge />
			</Box>
			<Box className={styles.keystoreHomeTextWrapper}>
				<Text color="strong" size="xxlarge" weight="strong">
					{intl.formatMessage(messages.wallet_home_title)}
				</Text>
				<Text>{intl.formatMessage(messages.wallet_home_sub_title)}</Text>
			</Box>
			<Box className={styles.keystoreHomeButtonWrapper}>
				<Button onClick={handleNew} sizeVariant="xlarge">
					{intl.formatMessage(messages.create_wallet_button)}
				</Button>
				<Button onClick={handleSelectWalletOptions} sizeVariant="xlarge" styleVariant="secondary">
					{intl.formatMessage(messages.have_wallet_button)}
				</Button>
			</Box>
		</Box>
	)
}

export default Home
