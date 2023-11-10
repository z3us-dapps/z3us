import React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useNavigate } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { Input } from 'ui/src/components/input'
import SecretDisplay from 'ui/src/components/secret-display'
import { Text } from 'ui/src/components/typography'
import { useSharedStore } from 'ui/src/hooks/use-store'
import { useZdtState } from 'ui/src/hooks/zdt/use-zdt'
import { KeystoreType } from 'ui/src/store/types'

import { SettingsBlock } from '../components/settings-block'
import { SettingsTitle } from '../components/settings-title'
import { SettingsWrapper } from '../components/settings-wrapper'

const messages = defineMessages({
	title: {
		id: '3yk8fB',
		defaultMessage: 'Wallet',
	},
	subtitle: {
		id: 'ypG0Mw',
		defaultMessage: `Manage your wallet and private keys`,
	},
	name_title: {
		id: 'HAlOn1',
		defaultMessage: 'Name',
	},
	name_subtitle: {
		id: 'Ed9r5F',
		defaultMessage: `Change your wallet name`,
	},
	secret_title: {
		id: 'fxvXUy',
		defaultMessage: 'Reveal',
	},
	secret_subtitle: {
		id: 'Ya7CkP',
		defaultMessage: `Show seed phrase or extended private key`,
	},
	remove_title: {
		id: '2P7Gje',
		defaultMessage: 'Remove wallet',
	},
	remove_subtitle: {
		id: 'ar3Mx5',
		defaultMessage: `Remove your wallet and delete all cache data`,
	},
	remove: {
		id: 'k76I/W',
		defaultMessage: 'Delete wallet',
	},
	remove_confirm: {
		id: '1fXPQ6',
		defaultMessage: 'Are you sure you want to delete wallet?',
	},
})

const General: React.FC = () => {
	const intl = useIntl()
	const navigate = useNavigate()
	const { isWallet, confirm, removeSecret } = useZdtState()

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

	const handleRemoveWallet = async () => {
		const password = await confirm({
			content: intl.formatMessage(messages.remove_confirm),
			buttonTitle: intl.formatMessage(messages.remove),
		})
		await removeSecret(password)
		navigate('/')
	}

	return (
		<SettingsWrapper>
			<SettingsTitle title={intl.formatMessage(messages.title)} subTitle={intl.formatMessage(messages.subtitle)} />
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
					rightCol={<SecretDisplay />}
				/>
			)}
			{isWallet && (
				<SettingsBlock
					isBottomBorderVisible={false}
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
