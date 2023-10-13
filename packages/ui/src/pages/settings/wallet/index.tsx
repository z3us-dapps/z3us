import React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useNavigate } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { Input } from 'ui/src/components/input'
import { Text } from 'ui/src/components/typography'
import { useSharedStore } from 'ui/src/hooks/use-store'
import { useZdtState } from 'ui/src/hooks/zdt/use-zdt'

import { SettingsBlock } from '../components/settings-block'
import { SettingsTitle } from '../components/settings-title'
import { SettingsWrapper } from '../components/settings-wrapper'

const messages = defineMessages({
	title: {
		id: 'settings.wallet.title',
		defaultMessage: 'Wallet',
	},
	subtitle: {
		id: 'settings.wallet.subtitle',
		defaultMessage: `Manage your wallet`,
	},
	wallet_title: {
		id: 'settings.wallet.name.title',
		defaultMessage: 'Name',
	},
	wallet_subtitle: {
		id: 'settings.wallet.name.subtitle',
		defaultMessage: `Change your wallet name`,
	},
	remove: {
		id: 'settings.wallet.remove',
		defaultMessage: 'Delete wallet',
	},
})

const General: React.FC = () => {
	const intl = useIntl()
	const navigate = useNavigate()
	const { isWallet } = useZdtState()

	const { keystore, changeKeystoreName } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
		changeKeystoreName: state.changeKeystoreNameAction,
	}))

	const handleWalletNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const evt = event.nativeEvent as InputEvent
		if (evt.isComposing) {
			return
		}

		changeKeystoreName(keystore.id, event.target.value)
	}

	const handleRemoveWallet = () => {
		navigate('/keystore/remove')
	}

	return (
		<SettingsWrapper>
			<SettingsTitle
				backLink="/settings"
				title={intl.formatMessage(messages.title)}
				subTitle={intl.formatMessage(messages.subtitle)}
			/>
			<SettingsBlock
				leftCol={
					<>
						<Text size="large" weight="strong" color="strong">
							{intl.formatMessage(messages.wallet_title)}
						</Text>
						<Box>
							<Text size="xsmall">{intl.formatMessage(messages.wallet_subtitle)}</Text>
						</Box>
					</>
				}
				rightCol={<Input value={keystore.name} elementType="input" type="url" onChange={handleWalletNameChange} />}
			/>
			{isWallet && (
				<Box display="flex" flexDirection="column" gap="small">
					<Button onClick={handleRemoveWallet} styleVariant="destructive" sizeVariant="xlarge" fullWidth>
						{intl.formatMessage(messages.remove)}
					</Button>
				</Box>
			)}
		</SettingsWrapper>
	)
}

export default General
