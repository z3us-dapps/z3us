import clsx from 'clsx'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useNavigate } from 'react-router-dom'

import type { BoxProps } from 'ui/src/components/box'
import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { Form } from 'ui/src/components/form'
import PasswordField from 'ui/src/components/form/fields/password-field'
import { SubmitButton } from 'ui/src/components/form/fields/submit-button'
import { TouchIcon } from 'ui/src/components/icons'
import { SelectSimple } from 'ui/src/components/select'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Text } from 'ui/src/components/typography'
import { ValidationErrorMessage } from 'ui/src/components/validation-error-message'
import { Z3usLogoLarge, Z3usLogoText } from 'ui/src/components/z3us-logo-babylon'
import { useSharedStore } from 'ui/src/hooks/use-store'

import { useMessageClient } from '@src/hooks/use-message-client'
import { login } from '@src/webauthn/credentials'

import * as styles from './styles.css'

const messages = defineMessages({
	wallet_label: {
		defaultMessage: 'Wallet',
		id: '3yk8fB',
	},
	password_placeholder: {
		defaultMessage: 'Password',
		id: '5sg7KC',
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
	webauth_button: {
		defaultMessage: 'Login using passwordless authentication',
		id: 'tLyIg5',
	},
})

const initialValues = {
	password: '',
}

interface IProps {
	isUnlocked: boolean
	isLoading: boolean
	onUnlock: () => void
}

export const Unlock: React.FC<IProps & BoxProps> = ({ isUnlocked, isLoading, onUnlock, className, ...rest }) => {
	const intl = useIntl()
	const navigate = useNavigate()
	const inputRef = useRef(null)
	const client = useMessageClient()

	const { keystore, keystores, selectKeystore } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
		keystores: state.keystores,
		selectKeystore: state.selectKeystoreAction,
	}))

	const [previous, setPrevious] = useState<boolean | null>(null)
	const [error, setError] = useState<string>('')

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

	const handleWebAuthN = () => {
		if (!keystore?.webAuthn) return
		if (isLoading === true) return
		if (isUnlocked === true) return
		if (previous === true) return
		setPrevious(isUnlocked)
		// eslint-disable-next-line no-console
		login(keystore).then(handleUnlock).catch(console.error)
	}

	useEffect(() => {
		handleWebAuthN()
		setPrevious(isUnlocked)
	}, [keystore?.id, isLoading, isUnlocked])

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
		await handleUnlock(values.password)
	}

	return (
		<Box display="flex" {...rest} className={clsx(className, styles.unlockOuterWrapper)}>
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
						<Box className={styles.unlockValidationWrapper}>
							<ValidationErrorMessage message={error} />
						</Box>
						<Box className={styles.unlockButtonsWrapper}>
							<SubmitButton>
								<Button sizeVariant="xlarge">{intl.formatMessage(messages.form_button_title)}</Button>
							</SubmitButton>
							{keystore?.webAuthn && (
								<ToolTip message={intl.formatMessage(messages.webauth_button)}>
									<Box component="span">
										<Button styleVariant="secondary" sizeVariant="xlarge" onClick={handleWebAuthN} iconOnly>
											<TouchIcon />
										</Button>
									</Box>
								</ToolTip>
							)}
						</Box>
					</Form>
				</Box>
			</Box>
		</Box>
	)
}

export default Unlock
