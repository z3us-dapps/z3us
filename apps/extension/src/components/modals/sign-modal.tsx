import { useSharedStore } from 'packages/ui/src/hooks/use-store'
import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import type { TStyleVariant } from 'ui/src/components/button'
import {
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogOverlay,
	DialogPortal,
	DialogRoot,
	DialogTitle,
} from 'ui/src/components/dialog'
import * as alertStyles from 'ui/src/components/dialog-alert/dialog-alert.css'
import * as dialogStyles from 'ui/src/components/dialog/styles.css'
import { Form } from 'ui/src/components/form'
import PasswordField from 'ui/src/components/form/fields/password-field'
import { SubmitButton } from 'ui/src/components/form/fields/submit-button'
import { Button } from 'ui/src/components/router-button'
import { Text } from 'ui/src/components/typography'
import { ValidationErrorMessage } from 'ui/src/components/validation-error-message'

import { login } from '@src/webauthn/credentials'

import * as styles from './styles.css'

const messages = defineMessages({
	password_placeholder: {
		id: '5sg7KC',
		defaultMessage: 'Password',
	},
	unlock_error: {
		id: 'uyz8/R',
		defaultMessage: 'Incorrect password!',
	},
	form_button_title: {
		id: 'gDXziV',
		defaultMessage: 'Sign',
	},
	close: {
		id: '47FYwb',
		defaultMessage: 'Cancel',
	},
})

const initialValues = {
	password: '',
}

export interface IProps {
	title?: ReactNode
	content: ReactNode
	buttonTitle?: string
	buttonStyleVariant?: TStyleVariant
	ignorePassword?: boolean
	onConfirm: (password: string) => void
	onCancel: () => void
}

const SignModal: React.FC<IProps> = ({
	title,
	content,
	buttonTitle,
	buttonStyleVariant = 'primary',
	ignorePassword,
	onConfirm,
	onCancel,
}) => {
	const intl = useIntl()
	const inputRef = useRef(null)

	const [isOpen, setIsOpen] = useState<boolean>(true)
	const [error, setError] = useState<string>('')

	const { keystore } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
	}))

	useEffect(() => {
		inputRef?.current?.focus()
	}, [inputRef?.current])

	const handleConfirm = async (password: string) => {
		try {
			onConfirm(password)
			setError('')
			setIsOpen(false)
		} catch (err) {
			// eslint-disable-next-line no-console
			console.error(err)
			setError(intl.formatMessage(messages.unlock_error))
		}
	}

	useEffect(() => {
		if (!keystore?.webAuthn) return
		// eslint-disable-next-line no-console
		login(keystore).then(handleConfirm).catch(console.error)
	}, [keystore?.id])

	const handleSubmit = async (values: typeof initialValues) => {
		handleConfirm(values.password)
	}

	const handleCancel = () => {
		onCancel()
		setError('')
		setIsOpen(false)
	}

	const handleEscapeKeyDown = () => {
		handleCancel()
	}

	const handleOnInteractOutside = () => {
		handleCancel()
	}

	return (
		<DialogRoot open={isOpen}>
			<DialogPortal>
				<DialogOverlay className={dialogStyles.dialogOverlay} />
				<DialogContent
					className={alertStyles.alertDialogContent}
					onEscapeKeyDown={handleEscapeKeyDown}
					onInteractOutside={handleOnInteractOutside}
				>
					<Box className={styles.signAlertDialogContentWrapper}>
						{title && (
							<DialogTitle>
								<Text size="xlarge" weight="strong" color="strong">
									{title}
								</Text>
							</DialogTitle>
						)}
						{content && (
							<DialogDescription>
								<Text>{content}</Text>
							</DialogDescription>
						)}
					</Box>
					<Form onSubmit={handleSubmit} initialValues={initialValues} className={styles.signAlertDialogFormWrapper}>
						<ValidationErrorMessage message={error} />
						{!ignorePassword && (
							<PasswordField
								ref={inputRef}
								name="password"
								placeholder={intl.formatMessage(messages.password_placeholder)}
								sizeVariant="medium"
							/>
						)}
						<Box className={styles.signAlertDialogFormFooterWrapper}>
							<DialogClose asChild>
								<Button
									sizeVariant={{ mobile: 'small', tablet: 'medium' }}
									styleVariant="secondary"
									onClick={handleCancel}
								>
									{intl.formatMessage(messages.close)}
								</Button>
							</DialogClose>
							<SubmitButton>
								<Button sizeVariant={{ mobile: 'small', tablet: 'medium' }} styleVariant={buttonStyleVariant}>
									{buttonTitle || intl.formatMessage(messages.form_button_title)}
								</Button>
							</SubmitButton>
						</Box>
					</Form>
				</DialogContent>
			</DialogPortal>
		</DialogRoot>
	)
}

export default SignModal
