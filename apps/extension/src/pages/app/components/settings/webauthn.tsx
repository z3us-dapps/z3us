import React, { useEffect, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { Checkbox } from 'ui/src/components/checkbox'
import { Text } from 'ui/src/components/typography'
import { useSharedStore } from 'ui/src/hooks/use-store'
import { SettingsBlock } from 'ui/src/pages/settings/components/settings-block'

import { usePasswordModal } from '@src/hooks/modal/use-password-modal'
import { useMessageClient } from '@src/hooks/use-message-client'
import { register } from '@src/webauthn/credentials'

const isWebAuthAvailable = window.PublicKeyCredential && 'credentials' in navigator

const messages = defineMessages({
	webatuh_title: {
		id: 'P+S8lh',
		defaultMessage: 'WebAuthn',
	},
	webatuh_subtitle: {
		id: 'wN8IlW',
		defaultMessage: `Toggle WebAuthn authentication (TouchID, YubiKey) for your wallet`,
	},
	webatuh_enable: {
		id: 'TqSTI0',
		defaultMessage: 'Enable',
	},
	webatuh_disable: {
		id: 'Rw7iI7',
		defaultMessage: 'Disable',
	},
	webatuh_cross_platform: {
		id: 'YxKul5',
		defaultMessage: 'Prefer cross platform WebAuthn (YubiKey)',
	},
	password_title: {
		id: 'GPtDoS',
		defaultMessage: 'Enable WebAuthn',
	},
	password: {
		id: 'Tspj7Y',
		defaultMessage: 'To enable WebAuthn for {label} wallet, type in your password',
	},
})

const Settings: React.FC = () => {
	const intl = useIntl()
	const confirm = usePasswordModal()
	const client = useMessageClient()
	const { keystore, enableWebAuthn } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
		enableWebAuthn: state.setKeystoreWebAuthnAction,
	}))

	const [canUsePlatformAuth, setCanUsePlatformAuth] = useState<boolean>(false)
	const [crossPlatform, setCrossPlatform] = useState<boolean>(false)

	useEffect(() => {
		if (!isWebAuthAvailable) return
		PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable().then(setCanUsePlatformAuth)
	}, [])

	const handleToggleWebAuthn = async () => {
		if (!keystore?.id) return
		if (!keystore.webAuthn) {
			const password = await confirm({
				title: intl.formatMessage(messages.password_title),
				content: intl.formatMessage(messages.password, { label: keystore.name }),
			})
			const credentials = await register(
				keystore,
				password,
				canUsePlatformAuth && !crossPlatform ? 'platform' : 'cross-platform',
			)
			enableWebAuthn(keystore.id, credentials)
			await client.lockVault()
		} else {
			await enableWebAuthn(keystore.id)
		}
	}

	if (!isWebAuthAvailable) return null

	return (
		<SettingsBlock
			leftCol={
				<>
					<Text size="large" weight="strong" color="strong">
						{intl.formatMessage(messages.webatuh_title)}
					</Text>
					<Box>
						<Text size="xsmall">{intl.formatMessage(messages.webatuh_subtitle)}</Text>
					</Box>
				</>
			}
			rightCol={
				<>
					{canUsePlatformAuth && (
						<Box display="flex" alignItems="center" gap="small" paddingTop="xsmall" justifyContent="flex-end">
							<Text size="xsmall">{intl.formatMessage(messages.webatuh_cross_platform)}</Text>
							<Checkbox styleVariant="primary" sizeVariant="small" onCheckedChange={setCrossPlatform} />
						</Box>
					)}
					<Button
						onClick={handleToggleWebAuthn}
						styleVariant={keystore?.webAuthn ? 'secondary-error' : 'primary'}
						sizeVariant="xlarge"
						fullWidth
					>
						{intl.formatMessage(keystore?.webAuthn ? messages.webatuh_disable : messages.webatuh_enable)}
					</Button>
				</>
			}
		/>
	)
}

export default Settings
