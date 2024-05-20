import React, { useEffect, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { toast } from 'sonner'

import { Box } from 'ui/src/components/box'
import { Checkbox } from 'ui/src/components/checkbox'
import { Switch } from 'ui/src/components/switch'
import { Text } from 'ui/src/components/typography'
import { useSharedStore } from 'ui/src/hooks/use-store'
import { useZdtState } from 'ui/src/hooks/zdt/use-zdt'
import { SettingsBlock } from 'ui/src/pages/settings/components/settings-block'

import { usePasswordModal } from '@src/hooks/modal/use-password-modal'
import { useMessageClient } from '@src/hooks/use-message-client'
import { register } from '@src/webauthn/credentials'

const isWebAuthAvailable = window.PublicKeyCredential && 'credentials' in navigator

const messages = defineMessages({
	webatuh_title: {
		id: '3CuiqZ',
		defaultMessage: 'Login and authorisation',
	},
	webatuh_subtitle: {
		id: 'Mxd9Sc',
		defaultMessage: `Log in to the app and authorise operations with passwordless authentication (TouchID, YubiKey or other)`,
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
		id: 'nxazlA',
		defaultMessage: 'Prefer cross-platform authentication (YubiKey)',
	},
	password_title: {
		id: 'WgM07q',
		defaultMessage: 'Enable passwordless authentication',
	},
	password: {
		id: 'Ym76K/',
		defaultMessage: 'Activating these methods means that you accept all the risks connected with them.',
	},
	password_button: {
		id: 'N2IrpM',
		defaultMessage: 'Confirm',
	},
	error_toast: {
		id: 'Ft5lhW',
		defaultMessage: 'Failed to enable passwordless authentication',
	},
})

const Settings: React.FC = () => {
	const intl = useIntl()
	const confirm = usePasswordModal()
	const client = useMessageClient()
	const { getSecret } = useZdtState()
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
			try {
				const password = await confirm({
					title: intl.formatMessage(messages.password_title),
					content: intl.formatMessage(messages.password, { label: keystore.name }),
					buttonTitle: intl.formatMessage(messages.password_button),
				})
				await getSecret(keystore.id, password)
				const credentials = await register(
					keystore,
					password,
					canUsePlatformAuth && !crossPlatform ? 'platform' : 'cross-platform',
				)
				enableWebAuthn(keystore.id, credentials)
				await client.lockVault()
			} catch (error) {
				// eslint-disable-next-line no-console
				console.warn(error)
				toast.error(intl.formatMessage(messages.error_toast), { description: error.message })
			}
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
					<Box display="flex" alignItems="center" gap="medium">
						<Switch checked={!!keystore?.webAuthn} onCheckedChange={handleToggleWebAuthn} />
					</Box>
					{!keystore?.webAuthn && canUsePlatformAuth && (
						<Box display="flex" alignItems="center" gap="small" paddingTop="xsmall" justifyContent="flex-start">
							<Checkbox styleVariant="primary" sizeVariant="small" onCheckedChange={setCrossPlatform} />
							<Text size="xsmall">{intl.formatMessage(messages.webatuh_cross_platform)}</Text>
						</Box>
					)}
				</>
			}
		/>
	)
}

export default Settings
