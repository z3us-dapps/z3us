import WalletSecretForm from 'packages/ui/src/components/form/wallet-secret-form'
import { KeystoreType } from 'packages/ui/src/store/types'
import React, { useState } from 'react'
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
	name_title: {
		id: 'settings.wallet.name.title',
		defaultMessage: 'Name',
	},
	name_subtitle: {
		id: 'settings.wallet.name.subtitle',
		defaultMessage: `Change your wallet name`,
	},
	secret_title: {
		id: 'settings.wallet.secret.title',
		defaultMessage: 'Reveal',
	},
	secret_subtitle: {
		id: 'settings.wallet.secret.subtitle',
		defaultMessage: `Show seed phrase or extended private key`,
	},
	remove_title: {
		id: 'settings.wallet.remove.title',
		defaultMessage: 'Remove wallet',
	},
	remove_subtitle: {
		id: 'settings.wallet.remove.subtitle',
		defaultMessage: `Remove your wallet and delete all cache data`,
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

	const [secret, setSecret] = useState<string | undefined>()

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
							{intl.formatMessage(messages.name_title)}
						</Text>
						<Box>
							<Text size="xsmall">{intl.formatMessage(messages.name_subtitle)}</Text>
						</Box>
					</>
				}
				rightCol={<Input value={keystore.name} elementType="input" type="url" onChange={handleWalletNameChange} />}
			/>
			{isWallet && keystore?.type === KeystoreType.LOCAL && (
				<SettingsBlock
					leftCol={
						<>
							<Text size="large" weight="strong" color="strong">
								{intl.formatMessage(messages.secret_title)}
							</Text>
							<Box>
								<Text size="xsmall">{intl.formatMessage(messages.secret_subtitle)}</Text>
							</Box>
						</>
					}
					rightCol={secret ? <Box>{secret}</Box> : <WalletSecretForm onUnlock={setSecret} />}
				/>
			)}
			{isWallet && (
				<SettingsBlock
					leftCol={
						<>
							<Text size="large" weight="strong" color="strong">
								{intl.formatMessage(messages.remove_title)}
							</Text>
							<Box>
								<Text size="xsmall">{intl.formatMessage(messages.remove_subtitle)}</Text>
							</Box>
						</>
					}
					rightCol={
						<Button onClick={handleRemoveWallet} styleVariant="destructive" sizeVariant="xlarge" fullWidth>
							{intl.formatMessage(messages.remove)}
						</Button>
					}
				/>
			)}
		</SettingsWrapper>
	)
}

export default General
