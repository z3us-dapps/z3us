import SelectField from 'packages/ui/src/components/form/fields/select-field'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useNavigate } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { Form } from 'ui/src/components/form'
import PasswordField from 'ui/src/components/form/fields/password-field'
import { SubmitButton } from 'ui/src/components/form/fields/submit-button'
import { SelectSimple } from 'ui/src/components/select'
import { Text } from 'ui/src/components/typography'
import { ValidationErrorMessage } from 'ui/src/components/validation-error-message'
import { Z3usLogoLarge, Z3usLogoText } from 'ui/src/components/z3us-logo-babylon'
import { useSharedStore } from 'ui/src/hooks/use-store'

import { useMessageClient } from '@src/hooks/use-message-client'
import { login, register } from '@src/webauthn/credentials'

import * as styles from './styles.css'

const isWebAuthAvailable = window.PublicKeyCredential && 'credentials' in navigator

const messages = defineMessages({
	wallet_label: {
		defaultMessage: 'Wallet',
		id: '3yk8fB',
	},
	password_placeholder: {
		defaultMessage: 'Password',
		id: '5sg7KC',
	},
	enable_webauthn: {
		defaultMessage: 'Enable WebAuthn',
		id: 'GPtDoS',
	},
	enable_webauthn_platform: {
		defaultMessage: 'Platform auth (TouchID, fingerprint or other)',
		id: 'hDSQVD',
	},
	enable_webauthn_cross_platform: {
		defaultMessage: 'Cross platform auth (YubiKey or other)',
		id: 'KZxNj6',
	},
	unlock_error: {
		defaultMessage: 'Incorrect password!',
		id: 'uyz8/R',
	},
	form_button_title: {
		defaultMessage: 'Unlock',
		id: 'qXCbgZ',
	},
	wallet_add: {
		defaultMessage: 'Add wallet...',
		id: 'VLEYHl',
	},
})

const initialValues = {
	password: '',
	authenticator: '',
}

interface IProps {
	onUnlock: () => void
}

export const Unlock: React.FC<IProps> = ({ onUnlock }) => {
	const intl = useIntl()
	const navigate = useNavigate()
	const inputRef = useRef(null)
	const client = useMessageClient()

	const { keystore, keystores, selectKeystore, enableWebAuthn } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
		keystores: state.keystores,
		selectKeystore: state.selectKeystoreAction,
		enableWebAuthn: state.setKeystoreWebAuthnAction,
	}))

	const [canUsePlatformAuth, setCanUsePlatformAuth] = useState<boolean>(false)
	const [error, setError] = useState<string>('')

	useEffect(() => {
		if (!isWebAuthAvailable) return
		PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable().then(setCanUsePlatformAuth)
	}, [])

	useEffect(() => {
		inputRef?.current?.focus()
	}, [inputRef?.current])

	const handleUnlock = async (password: string) => {
		try {
			await client.unlockVault(keystore, password)
			onUnlock()
			setError('')
		} catch (err) {
			// eslint-disable-next-line no-console
			console.error(err)
			setError(intl.formatMessage(messages.unlock_error))
		}
	}

	useEffect(() => {
		if (!keystore.webAuthn) return
		login(keystore).then(handleUnlock).catch(console.error)
	}, [keystore?.id])

	const authenticators = useMemo(() => {
		const options = [{ id: 'cross-platform', title: intl.formatMessage(messages.enable_webauthn_cross_platform) }]
		if (canUsePlatformAuth) {
			options.push({ id: 'platform', title: intl.formatMessage(messages.enable_webauthn_platform) })
		}
		return options
	}, [canUsePlatformAuth])

	const selectItems = useMemo(() => {
		const items = keystores.map(({ id, name }) => ({ id, title: name }))
		items.push({ id: '', title: intl.formatMessage(messages.wallet_add) })

		return items
	}, [keystores])

	const handleSelect = (id: string) => {
		if (id === '') {
			navigate('/keystore/new')
		} else {
			selectKeystore(id)
		}
	}

	const handleSubmit = async (values: typeof initialValues) => {
		if (values.authenticator) {
			await register(keystore, values.password, values.authenticator as AuthenticatorAttachment)
				.then(credentials => {
					enableWebAuthn(keystore.id, credentials)
					return { ...keystore, webAuthn: credentials }
				})
				.then(login)
				.then(handleUnlock)
		} else {
			await handleUnlock(values.password)
		}
	}

	return (
		<Box className={styles.unlockOuterWrapper}>
			<Box className={styles.unlockZ3usLogoWrapper}>
				<Z3usLogoText />
			</Box>
			<Box className={styles.unlockInnerWrapper}>
				<Box className={styles.unlockPaddingWrapper}>
					<Box display="flex" width="full" justifyContent="center">
						<Z3usLogoLarge />
					</Box>
					<Box className={styles.unlockFormWalletWrapper}>
						<Text color="strong" weight="medium">
							{intl.formatMessage(messages.wallet_label)}
						</Text>
						<SelectSimple
							fullWidth
							value={keystore?.id}
							onValueChange={handleSelect}
							data={selectItems}
							sizeVariant="xlarge"
						/>
					</Box>
					<Form onSubmit={handleSubmit} initialValues={initialValues} className={styles.unlockFormWrapper}>
						<Box className={styles.unlockFormTextWrapper}>
							<Text color="strong" weight="medium">
								{intl.formatMessage(messages.password_placeholder)}
							</Text>
							<PasswordField ref={inputRef} name="password" sizeVariant="large" styleVariant="secondary" />
						</Box>
						{isWebAuthAvailable && !keystore.webAuthn && (
							<SelectField
								name="authenticator"
								placeholder={intl.formatMessage(messages.enable_webauthn)}
								sizeVariant="large"
								data={authenticators}
								fullWidth
								disabled={!isWebAuthAvailable}
							/>
						)}
						<Box className={styles.unlockValidationWrapper}>
							<ValidationErrorMessage message={error} />
						</Box>
						<SubmitButton>
							<Button sizeVariant="xlarge" fullWidth>
								{intl.formatMessage(messages.form_button_title)}
							</Button>
						</SubmitButton>
					</Form>
				</Box>
			</Box>
		</Box>
	)
}

export default Unlock
