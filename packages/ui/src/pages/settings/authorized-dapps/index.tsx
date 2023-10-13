import React, { useEffect } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useNavigate } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { ResourceSnippet } from 'ui/src/components/resource-snippet'
import { Text } from 'ui/src/components/typography'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore, useSharedStore } from 'ui/src/hooks/use-store'
import { KeystoreType } from 'ui/src/store/types'

import { SettingsTitle } from '../components/settings-title'
import { SettingsWrapper } from '../components/settings-wrapper'

const messages = defineMessages({
	title: {
		id: 'settings.authorized_dapps.title',
		defaultMessage: 'Authorized dApps',
	},
	subtitle: {
		id: 'settings.authorized_dapps.subtitle',
		defaultMessage: `This are the dApps that you have logged into.`,
	},
})

const AuthorizedDapps: React.FC = () => {
	const intl = useIntl()
	const navigate = useNavigate()
	const networkId = useNetworkId()

	const { keystore } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
	}))
	const { approvedDapps } = useNoneSharedStore(state => ({
		approvedDapps: state.approvedDapps[networkId] || {},
	}))

	useEffect(() => {
		if (keystore?.type !== KeystoreType.LOCAL && keystore?.type !== KeystoreType.HARDWARE) {
			navigate('/')
		}
	}, [keystore])

	return (
		<SettingsWrapper>
			<SettingsTitle
				backLink="/settings"
				title={intl.formatMessage(messages.title)}
				subTitle={intl.formatMessage(messages.subtitle)}
			/>
			<Box display="flex" flexDirection="column" gap="small">
				{Object.keys(approvedDapps).map(dapp => (
					<Box key={dapp} display="flex" flexDirection="column" gap="small">
						<Text size="small" weight="medium" color="strong">
							dApp:
							<ResourceSnippet address={dapp} />
							Logged in with:
							<ResourceSnippet address={approvedDapps[dapp].persona} />
							Shared accounts:
							{approvedDapps[dapp].accounts.map(account => (
								<ResourceSnippet address={account} />
							))}
						</Text>
					</Box>
				))}
			</Box>
		</SettingsWrapper>
	)
}

export default AuthorizedDapps
