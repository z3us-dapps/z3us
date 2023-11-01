import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import {
	AlertDialog,
	AlertDialogClose,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogOverlay,
	AlertDialogPortal,
	AlertDialogTitle,
} from 'ui/src/components/dialog-alert'
import * as alertStyles from 'ui/src/components/dialog-alert/dialog-alert.css'
import { Form } from 'ui/src/components/form'
import { SubmitButton } from 'ui/src/components/form/fields/submit-button'
import TextField from 'ui/src/components/form/fields/text-field'
import { Button } from 'ui/src/components/router-button'
import { Text } from 'ui/src/components/typography'
import { ValidationErrorMessage } from 'ui/src/components/validation-error-message'

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
	content: ReactNode
	buttonTitle?: string
	ignorePassword?: boolean
	onConfirm: (password: string) => void
	onCancel: () => void
}

const SignModal: React.FC<IProps> = ({ content, buttonTitle, ignorePassword, onConfirm, onCancel }) => {
	const intl = useIntl()
	const inputRef = useRef(null)

	const [isOpen, setIsOpen] = useState<boolean>(true)
	const [error, setError] = useState<string>('')

	useEffect(() => {
		inputRef?.current?.focus()
	}, [])

	const handleSubmit = async (values: typeof initialValues) => {
		try {
			onConfirm(values.password)
			setError('')
			setIsOpen(false)
		} catch (err) {
			// eslint-disable-next-line no-console
			console.error(err)
			setError(intl.formatMessage(messages.unlock_error))
		}
	}

	const handleCancel = () => {
		onCancel()
		setError('')
		setIsOpen(false)
	}

	const handleEscapeKeyDown = () => {
		handleCancel()
	}

	// TODO: need title and content ??
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const title = null

	return (
		<AlertDialog open={isOpen}>
			<AlertDialogPortal>
				<AlertDialogOverlay className={alertStyles.alertDialogOverlay} />
				<AlertDialogContent className={alertStyles.alertDialogContent} onEscapeKeyDown={handleEscapeKeyDown}>
					<Box className={styles.signAlertDialogContentWrapper}>
						{content && (
							<AlertDialogTitle>
								<Text size="xlarge" weight="strong" color="strong">
									{content}
								</Text>
							</AlertDialogTitle>
						)}
						{content && (
							<AlertDialogDescription>
								<Text>{content}</Text>
							</AlertDialogDescription>
						)}
					</Box>
					<Form onSubmit={handleSubmit} initialValues={initialValues} className={styles.signAlertDialogFormWrapper}>
						<ValidationErrorMessage message={error} />
						{!ignorePassword && (
							<Box>
								<TextField
									ref={inputRef}
									isPassword
									name="password"
									placeholder={intl.formatMessage(messages.password_placeholder)}
									sizeVariant="medium"
								/>
							</Box>
						)}
						<Box className={styles.signAlertDialogFormFooterWrapper}>
							<AlertDialogClose asChild>
								<Button sizeVariant="small" styleVariant="secondary" onClick={handleCancel}>
									{intl.formatMessage(messages.close)}
								</Button>
							</AlertDialogClose>
							<SubmitButton>
								<Button sizeVariant="small" styleVariant="destructive">
									{buttonTitle || intl.formatMessage(messages.form_button_title)}
								</Button>
							</SubmitButton>
						</Box>
					</Form>
				</AlertDialogContent>
			</AlertDialogPortal>
		</AlertDialog>
	)
}

export default SignModal
